const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { shortenLink } = require('./controllers/linkController');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para encurtar links
app.post('/api/shorten', shortenLink);

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
