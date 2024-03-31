import express from 'express';
import axios from 'axios';
import { promises as fs } from 'fs';

const leaderboardRoutes = express.Router();
let API_KEY = '989f571f-050d-4c9c-ad48-45fa86251ea8';

let playerIdsCache;

async function initializeCacheFromFile() {
    try {
        const data = await fs.readFile('playerIds.json', 'utf-8');
        playerIdsCache = JSON.parse(data);
        console.log('Cache initialized from file.');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File not found. A new cache will be created.');
        } else {
            console.error('Error reading file:', error);
        }
    }
}

initializeCacheFromFile().then(() => {
}).catch(error => {
    console.log('An error occurred during cache initialization:', error);
});

async function getPlayerDetails(playerId) {
    const url = `https://api.balldontlie.io/v1/players/${playerId}`;
    const options = {
        method: 'GET',
        params: {},
        headers: {
            'Authorization': API_KEY,
        }
    };
    try {
        const response = await axios.request(url, options);
        return response.data;
    } catch (error) {
        //console.error('Error fetching player details:', error);
        throw error;
    }
}


async function getSeasonStats(playerId) {
    const options = {
        method: 'GET',
        url: 'https://api.balldontlie.io/v1/season_averages',
        params: {
            season: 2023,
            player_ids: [playerId]
        },
        headers: {
            'Authorization': API_KEY,
        }
    };
    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        //console.error(error);
    }
}

let progressTracker = {};

function updateProgress(statTerm, completedRequests, totalRequests) {
    const progress = (completedRequests / totalRequests) * 100;
    progressTracker[statTerm] = Math.min(Math.round(progress), 100); 
}


leaderboardRoutes.get('/progress/:statTerm', (req, res) => {
    const statTerm = req.params.statTerm;

    res.writeHead(200, {
        'Content-Type': 'text/event-stream', // Content Type for SSE
        'Cache-Control': 'no-cache', // SSE should not be cached
        'Connection': 'keep-alive', // Keep the connection alive
    });

    // Send a retry interval for reconnection attempts in milliseconds
    res.write('retry: 10000\n\n');

    const sendProgress = () => {
        const progress = progressTracker[statTerm] || 0;
        res.write(`data: ${JSON.stringify({ progress })}\n\n`); 
    };

    sendProgress();

    const intervalId = setInterval(() => {
        sendProgress();

    }, 500); 

    req.on('close', () => {
        clearInterval(intervalId);
    });
});


leaderboardRoutes.get('/:statTerm', async (req, res) => {
    const statTerm = req.params.statTerm;
    let statsData = [];
    let completedRequests = 0;
    const totalRequests = playerIdsCache.length;

    progressTracker[statTerm] = 0;

    const statsPromises = playerIdsCache.map(async (playerId) => {
        try {
            const playerInfo = await getPlayerDetails(playerId);
            const stats = await getSeasonStats(playerId);
            const statobj = stats[0];
            if (statobj !== undefined) {
                statsData.push({
                    name: playerInfo.data.first_name + " " + playerInfo.data.last_name,
                    team: playerInfo.data.team.full_name,
                    statValue: statobj[statTerm]
                });
            }
        } catch (error) {
            //console.error(`Error fetching stats for player ID ${playerId}:`, error);
        } finally {
            completedRequests++;
            progressTracker[statTerm] = (completedRequests / totalRequests) * 100;
            updateProgress(statTerm, completedRequests, totalRequests);
        }
    });

    try {
        await Promise.all(statsPromises);
        statsData.sort((a, b) => b.statValue - a.statValue);
        const leaderboardSize = 100;
        statsData = statsData.slice(0, leaderboardSize);
        console.log("Done");
        updateProgress(statTerm, totalRequests, totalRequests);
        res.json({ players: statsData, statTerm: statTerm });
    } catch (error) {
        //console.error("Error processing player stats:", error);
        res.status(500).send("Error fetching player stats");
    }
});

export default leaderboardRoutes;