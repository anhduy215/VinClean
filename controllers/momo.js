const { json } = require('body-parser');
const https = require('https');

exports.momo = async (req, res) => {
    const endpoint = req.body.endpoint;
    const requestBody = req.body.postJsonString;

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    const request = https.request(options, response => {
        response.setEncoding('utf8');
        response.on('data', (body) => {
            res.status(200).json({ data: body });
        });
    })

    request.write(requestBody);
    request.end();
}