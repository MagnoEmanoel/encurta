const { shortenLink } = require('../controllers/linkController');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await shortenLink(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
