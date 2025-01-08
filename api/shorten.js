const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { url, customName } = req.body; // Recebe a URL e o nome customizado, se fornecido

        try {
            // Construa o URL para a API Ulvis
            const apiUrl = `${process.env.API_URL}?url=${encodeURIComponent(url)}${
                customName ? `&custom=${customName}` : ''
            }&type=json&private=1`;

            console.log('URL gerada para a API Ulvis:', apiUrl);

            // Envie a requisição para a API Ulvis
            const response = await axios.get(apiUrl, {
                headers: {
                    'User-Agent': 'EncurtaLinkApp/1.0', // Adiciona cabeçalho User-Agent para evitar bloqueios
                },
            });

            // Verifique a resposta da API
            if (response.data.success === "1") {
                // Retorna a URL encurtada
                const shortUrl = response.data.data.url;
                console.log('Resposta bem-sucedida da API Ulvis:', shortUrl);
                res.status(200).json({ error: 0, shortUrl });
            } else {
                // Erro retornado pela API
                console.error('Erro retornado pela API Ulvis:', response.data);
                res.status(400).json({
                    error: 1,
                    message: response.data.error?.msg || 'Erro ao encurtar a URL'
                });
            }
        } catch (error) {
            // Erro na comunicação com a API
            console.error('Erro ao acessar a API:', error.message);

            // Adiciona detalhes da resposta, se disponíveis
            if (error.response) {
                console.error('Detalhes da resposta da API:', error.response.data);
            }

            res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
        }
    } else {
        // Método HTTP não permitido
        res.setHeader('Allow', ['POST']);
        console.warn(`Método não permitido: ${req.method}`);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
