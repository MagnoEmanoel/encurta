const puppeteer = require('puppeteer');

async function shortenLink(req, res) {
    const { url, customName } = req.body;

    console.log('Recebendo requisição:', { url, customName });

    if (!url || typeof url !== 'string') {
        console.error('URL inválida ou ausente');
        return res.status(400).json({ error: 1, message: 'A URL válida é obrigatória' });
    }

    try {
        console.log('Iniciando Puppeteer...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const apiUrl = `https://ulvis.net/api.php?url=${encodeURIComponent(url)}${
            customName ? `&custom=${customName}` : ''
        }&private=1`;

        console.log('Acessando URL da API:', apiUrl);
        await page.goto(apiUrl, { waitUntil: 'networkidle2' });

        const responseText = await page.evaluate(() => document.body.innerText);
        console.log('Resposta da API:', responseText);

        await browser.close();

        // Verifica se a resposta é um link (texto puro) ou JSON
        if (responseText.startsWith('http')) {
            console.log('URL encurtada detectada como texto puro:', responseText);
            return res.status(200).json({ error: 0, shortUrl: responseText });
        }

        // Se não for texto puro, tenta interpretar como JSON
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(responseText);
        } catch (err) {
            console.error('Resposta da API não é JSON nem link:', responseText);
            throw new Error('Resposta da API não é válida');
        }

        if (parsedResponse.success === "1") {
            const shortUrl = parsedResponse.data.url;
            console.log('URL encurtada com sucesso:', shortUrl);
            return res.status(200).json({ error: 0, shortUrl });
        } else {
            console.error('Erro da API:', parsedResponse.error?.msg || 'Erro desconhecido');
            return res.status(400).json({
                error: 1,
                message: parsedResponse.error?.msg || 'Erro ao encurtar a URL',
            });
        }
    } catch (error) {
        console.error('Erro geral no processamento:', error.message);
        return res.status(500).json({ error: 1, message: 'Erro ao processar a solicitação' });
    }
}

module.exports = { shortenLink };
