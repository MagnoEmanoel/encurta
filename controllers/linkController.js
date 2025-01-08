const axios = require('axios');

async function shortenLink(req, res) {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        // Codifique e prepare os dados
        const formData = new URLSearchParams();
        formData.append('url', url.trim());

        console.log('Enviando dados para CleanURI:', formData.toString());

        // Envie a requisição para a API CleanURI
        const response = await axios.post(
            'https://cleanuri.com/api/v1/shorten',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                },
            }
        );

        console.log('Resposta da API CleanURI:', response.data);

        // Verifique se o resultado foi retornado corretamente
        if (response.data && response.data.result_url) {
            return res.status(200).json({ error: 0, shortUrl: response.data.result_url });
        }

        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    } catch (error) {
        console.error('Erro ao acessar a API CleanURI:', error.message);

        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }

        return res.status(500).json({
            error: 1,
            message: 'Erro ao acessar a API CleanURI',
        });
    }
}

module.exports = { shortenLink };