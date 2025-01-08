const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // Obtém a URL do corpo da requisição
        const { url } = req.body;

        if (!url) {
            // Retorna erro se a URL estiver ausente
            return res.status(400).json({ error: 'URL is required' });
        }

        try {
            // Obtém a chave da API do ambiente
            const apiKey = process.env.CUTTLY_API_KEY;

            if (!apiKey) {
                throw new Error("API Key is missing.");
            }

            // Constrói a URL da API do Cuttly
            const apiUrl = `https://cutt.ly/api/api.php?key=${apiKey}&short=${encodeURIComponent(url)}`;

            // Faz a requisição para o Cuttly
            const response = await axios.get(apiUrl);

            // Verifica se a resposta é válida
            if (response.data && response.data.url.status === 7) {
                return res.status(200).json({
                    shortUrl: response.data.url.shortLink,
                });
            } else {
                return res.status(400).json({
                    error: response.data.url.title || "Failed to shorten the URL",
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        // Retorna erro se o método HTTP não for POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
