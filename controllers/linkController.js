const axios = require('axios');

async function shortenLink(req, res) {
    const { url, customName } = req.body;

    if (!url) {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        const apiUrl = 'https://cutt.ly/api/api.php';

        const params = {
            key: process.env.CUTTLY_API_KEY,
            short: url,
        };

        if (customName) {
            params.name = customName;
        }

        const response = await axios.get(apiUrl, { params });

        if (response.data.url.status === 7) {
            const shortUrl = response.data.url.shortLink;
            return res.status(200).json({ error: 0, shortUrl });
        }

        let errorMessage = 'Erro ao encurtar a URL';
        switch (response.data.url.status) {
            case 2:
                errorMessage = 'O link informado não é válido';
                break;
            case 3:
                errorMessage = 'O nome customizado já está em uso';
                break;
            case 4:
                errorMessage = 'Chave da API inválida';
                break;
            case 5:
                errorMessage = 'O link contém caracteres inválidos';
                break;
            case 6:
                errorMessage = 'O domínio do link está bloqueado';
                break;
            case 8:
                errorMessage = 'Você atingiu o limite mensal de links encurtados';
                break;
        }

        return res.status(400).json({ error: 1, message: errorMessage });
    } catch (error) {
        console.error('Erro ao acessar a API Cuttly:', error.message);
        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    }
}

module.exports = { shortenLink };
