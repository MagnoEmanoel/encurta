const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { url } = req.body; // Recebe a URL a ser encurtada

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 1, message: 'URL inválida ou ausente' });
        }

        try {
            // Chamada para a API CleanURI
            const apiUrl = 'https://cleanuri.com/api/v1/shorten';
            const response = await axios.post(
                apiUrl,
                new URLSearchParams({ url: encodeURIComponent(url) }), // Formata os dados para envio
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            // Verifica se a resposta contém o resultado
            if (response.data && response.data.result_url) {
                const shortUrl = response.data.result_url;
                res.status(200).json({ error: 0, shortUrl });
            } else {
                res.status(500).json({ error: 1, message: 'Erro ao encurtar a URL' });
            }
        } catch (error) {
            // Trata erros na comunicação com a API
            console.error('Erro ao acessar a API CleanURI:', error.message);
            res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
        }
    } else {
        // Método HTTP não permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
