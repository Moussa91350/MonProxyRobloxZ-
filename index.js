const express = require('express');
const axios = require('axios');
const app = express();

// On capture tout sans distinction
app.get('/:subdomain/*', async (req, res) => {
    try {
        const subdomain = req.params.subdomain; // ex: inventory
        const path = req.params[0];           // ex: v1/users/...
        const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
        
        const targetUrl = `https://${subdomain}.roblox.com/${path}${query}`;
        
        console.log("Appel vers : " + targetUrl);

        const response = await axios.get(targetUrl);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(response.data);
    } catch (error) {
        console.error("Erreur : " + error.message);
        res.status(error.response?.status || 500).json({
            message: error.message,
            urlTentée: `https://${req.params.subdomain}.roblox.com/${req.params[0]}`
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy en ligne sur le port ${PORT}`));
