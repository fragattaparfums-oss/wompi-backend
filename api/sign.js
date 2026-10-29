const crypto = require('crypto');

module.exports = (req, res) => {
    // Encabezados para permitir CORS desde GitHub Pages
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { reference, amountInCents, currency } = req.body;
        const integritySecret = "prod_integrity_9QPykHUQT2g8dTwNJzrKraJAABsNGReM";

        // Estructura oficial de la cadena de integridad exigida por Wompi
        const stringToSign = `${reference}${amountInCents}${currency}${integritySecret}`;
        
        // Generación del Hash SHA-256 en hexadecimal
        const signature = crypto.createHash('sha256').update(stringToSign).digest('hex');

        return res.status(200).json({ signature });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
