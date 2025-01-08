const puppeteer = require('puppeteer');

async function shortenLink(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        console.log('Iniciando Puppeteer...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const apiUrl = `https://ulvis.net/api.php?url=${encodeURIComponent(url)}&private=1`;
        console.log('Acessando URL da API:', apiUrl);

        await page.goto(apiUrl, { waitUntil: 'networkidle2' });

        // Obtenha o corpo da resposta
        const responseText = await page.evaluate(() => document.body.innerText);
        console.log('Resposta da API:', responseText);

        await browser.close();

        if (responseText.startsWith('http')) {
            return res.status(200).json({ error: 0, shortUrl: responseText });
        }

        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    } catch (error) {
        console.error('Erro ao acessar a API:', error.message);
        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    }
}

module.exports = { shortenLink };
