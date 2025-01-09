const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        try {
            const apiKey = process.env.CUTTLY_API_KEY;

            if (!apiKey) {
                throw new Error("API Key is missing.");
            }
            const apiUrl = `https://cutt.ly/api/api.php?key=${apiKey}&short=${encodeURIComponent(url)}`;
            const response = await axios.get(apiUrl);
            if (response.data && response.data.url.status === 7) {
                return res.status(200).json({
                    shortUrl: response.data.url.shortLink,
                });
            } else {
                return res.status(400).json({
                    error: response.data.url.title || "Failed to shorten the URL",
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
