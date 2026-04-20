const express = require('express');
const axios = require('axios');
const app = express();

app.get('*', async (req, res) => {
    try {
        // On prend l'URL après le domaine et on la colle derrière roblox.com
        // Exemple : /inventory/v1/... devient https://inventory.roblox.com/v1/...
        const parts = req.url.split('/');
        const apiName = parts[1]; // "inventory"
        const remainingPath = req.url.replace('/' + apiName, ''); // "/v1/users/..."
        
        const targetUrl = `https://${apiName}.roblox.com${remainingPath}`;
        
        console.log("Tentative vers : " + targetUrl);

        const response = await axios.get(targetUrl);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(response.data);
    } catch (error) {
        console.error("Erreur Roblox : " + error.message);
        res.status(error.response?.status || 500).json({
            error: true,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy Universel prêt !"));
