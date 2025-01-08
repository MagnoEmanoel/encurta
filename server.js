const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const linkController = require('./controllers/linkController');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para encurtar links
app.post('/api/shorten', linkController.shortenLink);

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de teste para verificar a conectividade com a API
app.get('/api/test-ulvis', async (req, res) => {
    try {
        const testUrl = 'https://ulvis.net/api.php?url=https://google.com&private=1';
        const response = await axios.get(testUrl, {
            headers: {
                'User-Agent': 'EncurtaLinkApp/1.0',
            },
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Erro ao testar a API Ulvis:', error.message);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }
        res.status(500).json({ success: false, error: error.message });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
