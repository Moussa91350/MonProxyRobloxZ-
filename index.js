const express = require('express');
const axios = require('axios');
const app = express();

app.get('/inventory/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // NOUVELLE URL ROBLOX (C'est celle-ci qui fonctionne en 2026)
        const url = `https://inventory.roblox.com/v1/users/${userId}/user-assets/game-pass?limit=100&sortOrder=Asc`;
        
        console.log("Appel vers la nouvelle API pour : " + userId);
        
        const response = await axios.get(url);
        
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Erreur Roblox :", error.message);
        res.status(500).json({ error: true, message: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Proxy en ligne sur port " + PORT));
