const crypto = require('crypto');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { reference, amountInCents, currency } = req.body;
    const integritySecret = "prod_integrity_9QPykHUQT2g8dTwNJzrKraJAABsNGReM";

    const stringToSign = `${reference}${amountInCents}${currency}${integritySecret}`;
    const signature = crypto.createHash('sha256').update(stringToSign).digest('hex');

    return res.status(200).json({ signature });
};
