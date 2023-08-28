const { BCPServices } = require('./BCPService.js');



export default function handler(req, res) {




    const collector = [
        {
            "Name": "Id",
            "Paremeter": "int",
            "Value": 123
        },
        {
            "Name": "Nombre",
            "Paremeter": "string",
            "Value": "Prueba"
        },
        {
            "Name": "Prueba",
            "Paremeter": "ClasePrueba",
            "Value": {
                "Key": "Value"
            }
        }
    ]

    console.log('here')

    if (req.method === 'POST') {
    console.log(req.body.amount)

    const bcp = new BCPServices();
    bcp.generatedQr(req.body.amount, "BOB", "GLOSA", collector, "1/00:00", "123")
        .then(response => {
            console.log(response.data)
            return res.json(response.data)
        })
        .catch(error => {
            console.error('');
        })
    }
}



  // console.log(response);
            //         const myContent = `
            //     <br/>
            //     <img src="data:image/png;base64,${response.data.data.qrImage}">
            //     <br/>
            // `;
            // fs.writeFileSync('./index.html', myContent);

            // response.data.data.qrImage


// export default function handler(req, res) {
//     let options = { format: 'A4' };
//     console.log(req.body)
//     let file = { content: req.body, name: 'example.pdf', path: './mypdf.pdf' };

//     html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//         res.setHeader('Content-Type', 'application/pdf')

//         //    const data = fs.writeFileSync('./src/components/my.pdf', pdfBuffer)
//         return res.send(pdfBuffer)
//     });
// }

























// const bcp = new BCPServices();
// bcp.generatedQr(1, "BOB", "GLOSA", collector, "1/00:00", "123")
// .then(response => {
//     console.log(response);
//     const myContent = `
//         <br/>
//         <img src="data:image/png;base64,${response.data.data.qrImage}">
//         <br/>
//     `;
//     fs.writeFileSync('./index.html', myContent);
// })
// .catch(error => {
//     console.error(error);
// })



























































































































// var html_to_pdf = require('html-pdf-node');
// // var fs = require('fs');

// export default function handler(req, res) {
//     let options = { format: 'A4' };
//     console.log(req.body)
//     let file = { content: req.body, name: 'example.pdf', path: './mypdf.pdf' };

//     html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//         res.setHeader('Content-Type', 'application/pdf')

//         //    const data = fs.writeFileSync('./src/components/my.pdf', pdfBuffer)
//         return res.send(pdfBuffer)
//     });
// }
