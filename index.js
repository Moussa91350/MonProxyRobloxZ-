const express = require('express');
const axios = require('axios');
const app = express();

// Remplis ici l'ID de ton jeu "DONATE REROLL" (on le voit dans l'URL de ton image)
// C'est l'ID qui est juste après /creations/ dans ton navigateur
const UNIVERS_ID = "17351604085"; 

app.get('/inventory/:userId', async (req, res) => {
    try {
        // Cette API récupère les pass attachés au JEU directement
        // C'est la méthode la plus fiable à 100%
        const url = `https://games.roblox.com/v1/games/${UNIVERS_ID}/game-passes`;
        
        console.log("Récupération des pass pour le jeu...");
        const response = await axios.get(url);
        
        res.set('Access-Control-Allow-Origin', '*');
        
        // On renvoie les données au format attendu par ton script Roblox
        res.json(response.data);
    } catch (error) {
        console.error("Erreur Roblox :", error.message);
        res.status(500).json({ error: true, message: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Proxy GamePass Opérationnel"));
