const axios = require('axios');

async function shortenLink(req, res) {
    const { url, customName } = req.body;

    if (!url) {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        console.log(`Enviando dados para a API GoTiny: ${url}`);
        const requestBody = {
            input: [
                {
                    long: url,
                    ...(customName && { custom: customName }), // Adiciona customName se fornecido
                    useFallback: true, // Permite fallback automático
                },
            ],
        };

        const response = await axios.post('https://gotiny.cc/api', requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.data && response.data.length > 0) {
            const shortUrl = `https://gotiny.cc/${response.data[0].code}`;
            return res.status(200).json({ error: 0, shortUrl });
        } else {
            return res.status(500).json({ error: 1, message: 'Resposta inesperada da API GoTiny' });
        }
    } catch (error) {
        console.error('Erro ao acessar a API GoTiny:', error.message);
        if (error.response) {
            console.error('Detalhes da resposta da API:', error.response.data);
        }
        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    }
}

module.exports = { shortenLink };
