const express = require('express');
const axios = require('axios');
const app = express();

app.get('/inventory/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // URL ultra-directe pour les Game Passes
        const targetUrl = `https://games.roblox.com/v1/games/17351604085/game-passes`; 
        // ATTENTION : Si tu veux les pass d'un JOUEUR précis et pas d'un JEU, utilise celle-ci :
        const userUrl = `https://inventory.roblox.com/v1/users/${userId}/inventory/game-pass?limit=100&sortOrder=Asc`;

        console.log("Appel vers Roblox...");
        const response = await axios.get(userUrl);
        
        res.set('Access-Control-Allow-Origin', '*');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.listen(process.env.PORT || 3000);
