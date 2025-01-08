const axios = require('axios');

async function shortenLink(req, res) {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        // Codificar o URL antes de enviar à API CleanURI
        const encodedUrl = encodeURIComponent(url.trim());

        // Fazer a solicitação para a API CleanURI
        const response = await axios.post(
            'https://cleanuri.com/api/v1/shorten',
            new URLSearchParams({ url }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        if (response.data && response.data.result_url) {
            return res.status(200).json({ error: 0, shortUrl: response.data.result_url });
        }

        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    } catch (error) {
        console.error('Erro ao acessar a API CleanURI:', error.message);
        return res.status(500).json({ error: 1, message: 'Erro ao acessar a API CleanURI' });
    }
}

module.exports = { shortenLink };
