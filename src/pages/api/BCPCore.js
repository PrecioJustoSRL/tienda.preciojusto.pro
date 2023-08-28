const https = require('https');
const fs = require('fs');
const axios = require('axios');

async function conexionApiBCP(url, method, body, correlationId, usuarioEmpresaBCP, passwordEmpresaBCP, filePfxBcp, passwordPfxBcp) {
    try {
        const cert = fs.readFileSync(filePfxBcp);

        const agent = new https.Agent({
            pfx: cert,
            passphrase: passwordPfxBcp,
            maxVersion: "TLSv1.2",
            // keepAlive: true,
            // timeout: 60000
        });
    
        const options = {
            method: method,
            headers: {
                'Correlation-Id': correlationId,
                'Content-Type': 'application/json',
                'Authorization':  'Basic ' + Buffer.from(usuarioEmpresaBCP + ':' + passwordEmpresaBCP).toString('base64'),
                // 'Access-Control-allow-Origin': '*'
            },
            url: url,
            httpsAgent: agent,
            data: body,
        }

        const response = await axios(options);
        return response; 

    } catch(err) {
        console.error(err);
    }
   
}

module.exports = { conexionApiBCP }
  