const express = require('express');
const axios = require('axios');
const app = express();

app.get('/inventory/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const url = `https://inventory.roblox.com/v1/users/${userId}/inventory/game-pass?limit=100&sortOrder=Asc`;
        
        console.log("Appel pour : " + userId);
        
        const response = await axios.get(url);
        
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Erreur détaillée :", error.message);
        res.status(500).json({ 
            error: true, 
            message: "Erreur Roblox ou Inventaire Privé" 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy opérationnel"));
