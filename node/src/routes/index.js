const {Router} = require('express')



const { BCPServices } = require('../BCPService.js');

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









const router = Router()


router.get('/', (req, res) => {


    const bcp = new BCPServices();
    bcp.generatedQr(1, "BOB", "GLOSA", collector, "1/00:00", "123")
    .then(response => {
        console.log(response);
        console.log(response.data.data.qrImage)
        const data= {data: response.data.data.qrImage}
        res.json(data)
       res.send(response.data.data.qrImage)
    })
    .catch(error => {
        console.error(error);
    })

})

router.post('/api/ ', (req, res) => {

    res.setHeader({'Content-Type': 'application/json'})

})

module.exports = router