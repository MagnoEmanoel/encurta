const axios = require('axios');

async function shortenLink(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        console.log('Enviando requisição para a API CleanURI...');
        const apiUrl = 'https://cleanuri.com/api/v1/shorten';

        // Enviando a URL para encurtar
        const response = await axios.post(
            apiUrl,
            new URLSearchParams({ url: encodeURIComponent(url) }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        // Verifica a resposta da API
        if (response.data && response.data.result_url) {
            const shortUrl = response.data.result_url;
            console.log('URL encurtada com sucesso:', shortUrl);
            return res.status(200).json({ error: 0, shortUrl });
        } else {
            console.error('Erro na resposta da API:', response.data);
            return res.status(500).json({ error: 1, message: 'Erro ao encurtar a URL' });
        }
    } catch (error) {
        console.error('Erro ao acessar a API CleanURI:', error.message);
        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    }
}

module.exports = { shortenLink };
