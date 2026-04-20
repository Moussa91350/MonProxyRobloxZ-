const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:api/*', async (req, res) => {
    try {
        const apiType = req.params.api; 
        const fullPath = req.params[0];
        const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
        
        const targetUrl = `https://${apiType}.roblox.com/${fullPath}${query}`;
        console.log("Appel vers : " + targetUrl);

        const response = await axios.get(targetUrl);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(response.data);
    } catch (error) {
        console.error("Erreur proxy : " + error.message);
        res.status(error.response?.status || 500).json({
            error: true,
            message: error.message
        });
    }
});

app.listen(PORT, () => console.log(`Proxy prêt sur le port ${PORT}`));
