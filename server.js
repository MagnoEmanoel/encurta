const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const linkController = require('./controllers/linkController');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos da pasta raiz

// Rota para encurtar links
app.post('/api/shorten', linkController.shortenLink);

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
