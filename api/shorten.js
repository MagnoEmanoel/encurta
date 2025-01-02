const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { url, customName } = req.body; // Recebe a URL e o nome customizado, se fornecido

        try {
            // Construa o URL para a API Ulvis
            const apiUrl = `${process.env.API_URL}?url=${encodeURIComponent(url)}${
                customName ? `&custom=${customName}` : ''
            }&type=json&private=1`;

            // Envie a requisição para a API Ulvis
            const response = await axios.get(apiUrl);

            // Verifique a resposta da API
            if (response.data.success === "1") {
                // Retorna a URL encurtada
                const shortUrl = response.data.data.url;
                res.status(200).json({ error: 0, shortUrl });
            } else {
                // Erro retornado pela API
                res.status(400).json({
                    error: 1,
                    message: response.data.error?.msg || 'Erro ao encurtar a URL'
                });
            }
        } catch (error) {
            // Erro na comunicação com a API
            console.error('Erro ao acessar a API:', error.message);
            res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
        }
    } else {
        // Método HTTP não permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
