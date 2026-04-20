const express = require('express');
const axios = require('axios');
const app = express();

app.get('/inventory/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // On teste l'API COLLECTIBLES qui est souvent plus tolérante
        const url = `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?assetType=GamePass&limit=100&sortOrder=Asc`;
        
        console.log("Tentative Collectibles pour : " + userId);
        
        const response = await axios.get(url);
        
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(response.data);
    } catch (error) {
        // SI CA ECHOUE, ON TENTE UNE AUTRE API DANS LE CATCH (Plan B)
        try {
            const userId = req.params.userId;
            const urlPlanB = `https://www.roblox.com/users/inventory/list-json?assetTypeId=34&itemsPerPage=100&userId=${userId}`;
            console.log("Plan B pour : " + userId);
            const respB = await axios.get(urlPlanB);
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(200).json({data: respB.data.Data.Items.map(i => ({id: i.Item.AssetId}))});
        } catch (err2) {
            console.error("Échec total :", err2.message);
            res.status(500).json({ error: true, message: "Aucun pass trouvé" });
        }
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Proxy Ultime en ligne"));
