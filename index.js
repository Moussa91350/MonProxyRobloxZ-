const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:api/*', async (req, res) => {
    const apiType = req.params.api; 
    const path = req.params[0];
    const query = req.url.split('?')[1] || '';
    
    const targetUrl = `https://${apiType}.roblox.com/${path}?${query}`;
    
    try {
        const response = await axios.get(targetUrl);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.message);
    }
});

app.listen(PORT, () => console.log(`Proxy actif sur le port ${PORT}`));
