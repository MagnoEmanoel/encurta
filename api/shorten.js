const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { url } = req.body;

    try {
      // Encurtar o link
      const linkResponse = await axios.post(`${process.env.API_URL}/url/add`, { url }, {
        headers: { Authorization: `Bearer ${process.env.API_KEY}`, 'Content-Type': 'application/json' }
      });
      const shortUrl = linkResponse.data.shorturl;

      // Retornar apenas a URL encurtada
      res.status(200).json({ error: 0, shortUrl });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).json({ error: 1, message: 'Falha ao processar a solicitação' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
