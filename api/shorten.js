const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { url, customName } = req.body; // Recebe a URL e o nome customizado, se fornecido

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 1, message: 'URL inválida ou ausente' });
        }

        try {
            // Configuração do corpo da requisição
            const requestBody = {
                input: [
                    {
                        long: url,
                        ...(customName && { custom: customName }), // Adiciona customName se fornecido
                        useFallback: true, // Permite fallback automático
                    },
                ],
            };

            console.log('Enviando dados para a API GoTiny:', requestBody);

            // Chamada para a API GoTiny
            const response = await axios.post('https://gotiny.cc/api', requestBody, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Verifica se a resposta contém o resultado
            if (response.data && response.data.length > 0) {
                const shortUrl = `https://gotiny.cc/${response.data[0].code}`;
                res.status(200).json({ error: 0, shortUrl });
            } else {
                res.status(500).json({ error: 1, message: 'Erro ao encurtar a URL' });
            }
        } catch (error) {
            // Trata erros na comunicação com a API
            console.error('Erro ao acessar a API GoTiny:', error.message);
            if (error.response) {
                console.error('Detalhes da resposta da API:', error.response.data);
            }
            res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
        }
    } else {
        // Método HTTP não permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
