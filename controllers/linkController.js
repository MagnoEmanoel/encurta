const axios = require('axios');

async function shortenLink(req, res) {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        // Codificar a URL e preparar os dados
        const formData = new URLSearchParams();
        formData.append('url', url.trim());

        // Fazer a requisição POST para a API CleanURI
        const response = await axios.post(
            'https://cleanuri.com/api/v1/shorten',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Verificar se o resultado foi retornado corretamente
        if (response.data && response.data.result_url) {
            return res.status(200).json({ error: 0, shortUrl: response.data.result_url });
        }

        // Retornar erro genérico caso o resultado esteja vazio
        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    } catch (error) {
        console.error('Erro ao acessar a API CleanURI:', error.message);

        // Capturar e retornar detalhes do erro caso seja fornecido
        if (error.response && error.response.data) {
            console.error('Detalhes da resposta da API:', error.response.data);
        }

        return res.status(500).json({ error: 1, message: 'Erro ao acessar a API CleanURI' });
    }
}

module.exports = { shortenLink };
