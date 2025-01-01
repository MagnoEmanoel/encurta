const puppeteer = require('puppeteer');

async function shortenLink(req, res) {
    const { url, customName } = req.body;

    if (!url) {
        return res.status(400).json({ error: 1, message: 'A URL é obrigatória' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Construa o URL com parâmetros
        const apiUrl = `https://ulvis.net/api.php?url=${encodeURIComponent(url)}&custom=${customName || ''}&private=1`;

        // Acesse a página e aguarde a resposta
        await page.goto(apiUrl, { waitUntil: 'networkidle2' });

        // Pegue o link gerado
        const shortUrl = await page.evaluate(() => document.body.innerText);

        await browser.close();

        // Retorne o link curto
        res.status(200).json({ error: 0, shortUrl });
    } catch (error) {
        console.error('Erro ao encurtar link:', error.message);
        res.status(500).json({ error: 1, message: 'Erro ao encurtar o link' });
    }
}

module.exports = { shortenLink };
