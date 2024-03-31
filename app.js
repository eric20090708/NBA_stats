import express from 'express';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import playerRoutes from './services/players.js';
import leaderboardRoutes from './services/leaderboard.js';



const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { title: 'NBA Stats Dashboard' });
});
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function searchNBAPlayers(searchQuery) {
    const options = {
        method: 'GET',
        url: 'http://api.balldontlie.io/v1/players',
        params: { search: searchQuery },
        headers: {
            'Authorization': '989f571f-050d-4c9c-ad48-45fa86251ea8',
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.get('/players/search', async (req, res) => {
    const searchTerm = req.query.search || '';
    const searchQuery = sanitizeHtml(searchTerm);
    try {
        const response = await searchNBAPlayers(searchQuery);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch NBA players' });
    }
});

app.get('/stats', (req, res) => {
    res.render('leaderboard', { players:[]}); 
});

app.use('/leaderboard', leaderboardRoutes);

app.use('/players', playerRoutes);


export default app;