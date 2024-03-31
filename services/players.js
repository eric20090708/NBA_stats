import express from 'express';
import axios from 'axios';

const playerRoutes = express.Router();

async function getPlayerDetails(playerId) {
    const url = `https://api.balldontlie.io/v1/players/${playerId}`;
    const options = {
        method: 'GET',
        params: {},
        headers: {
            'Authorization': '989f571f-050d-4c9c-ad48-45fa86251ea8',
        }
    };
    try {
        const response = await axios.request(url, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw error; 
    }
}

async function getSeasonStats(playerId) {
    const options = {
        method: 'GET',
        url: 'https://api.balldontlie.io/v1/season_averages',
        params: {
            season: 2022,
            player_ids: [playerId]
        },
        headers: {
            'Authorization': '989f571f-050d-4c9c-ad48-45fa86251ea8',
        }
    };
    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

async function getTeammates(teamId) {
    const options = {
        method: 'GET',
        url: 'http://api.balldontlie.io/v1/players',
        params: {
            team_ids: [teamId]
        },
        headers: {
            'Authorization': '989f571f-050d-4c9c-ad48-45fa86251ea8',
        }
    };
    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

playerRoutes.get('/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    try {
        const playerDetails = await getPlayerDetails(playerId);
        const seasonStats = await getSeasonStats(playerId);
        res.render('players', {
            player: playerDetails.data,
            seasonStats: seasonStats[0],
            statKeys: ["pts", "ast", "turnover", "pf", "fga", "fgm", "fta",
                "ftm", "fg3a", "fg3m", "reb", "oreb", "dreb", "stl", "blk",
                "fg_pct", "fg3_pct", "ft_pct", "min", "games_played"
            ],
        });
    } catch (error) {
        res.status(500).send('Failed to fetch player data');
    }
});

playerRoutes.get('/json/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    try {
        const playerDetails = await getPlayerDetails(playerId);
        res.json({ players: playerDetails });
    } catch (error) {
        res.status(500).send('Failed to fetch player data');
    }
});

playerRoutes.get('/team/:teamId', async (req, res) => {
    const teamId = req.params.teamId;
    try {
        const teammates = await getTeammates(teamId);
        res.json({ players: teammates });
    } catch (error) {
        res.status(500).send('Failed to fetch player data');
    }
});

export default playerRoutes;