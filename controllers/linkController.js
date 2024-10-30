const axios = require('axios');

async function shortenLink(req, res) {
    const { url } = req.body;

    try {
        // Encurtar o link
        const linkResponse = await axios.post(`${process.env.API_URL}/url/add`, { url }, {
            headers: { Authorization: `Bearer ${process.env.API_KEY}`, 'Content-Type': 'application/json' }
        });
        const shortUrl = linkResponse.data.shorturl;

        // Retornar apenas a URL encurtada
        res.json({ error: 0, shortUrl });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.json({ error: 1, message: 'Falha ao processar a solicitação' });
    }
}

module.exports = { shortenLink };
