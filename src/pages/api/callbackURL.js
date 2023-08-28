const { BCPServices } = require('./BCPService.js');

const { writeUserData, updateUserData } = require('./supabase.js');


const axios = require('axios');


export default function handler(req, res) {

    if (req.method === 'POST' && req.headers.authorization === 'Basic UFJFQ0pVU1RPX1VTRVI6NkFFNTJBNUUtM0E3MC00MTQwLTlERUUtRTkxNTU3NTBBNDFG') {


        if (req.body && req.body.Description === 'PROCESADO') {
            const resData = {
                State: "000",
                Message: "Correcto",
                data: {
                    id: req.body.Id
                }
            }
            const object = {
                state: "000",
                message: "Correcto",
                uuid: req.body.Id,
                amount: req.body.Amount
            }
            // writeUserData('Transacciones', object)
            updateUserData('Transacciones', object, req.body.Id,)
            res.setHeader('Content-Type', 'application/json')
            return res.json(resData)

        } else {
            const resData = {
                State: "017",
                Message: "incorrecto",
                data: {
                    id: req.body.Id
                }
            }
            const object = {
                state: "017",
                message: "incorrecto",
                uuid: req.body.Id,

            }
            writeUserData('Transacciones', object)

            res.setHeader('Content-Type', 'application/json')
            return res.json(resData)

        }

        // console.log(req.body)
    }



    // const options = {
    //     method: method,
    //     headers: {
    //         'Correlation-Id': correlationId,
    //         'Content-Type': 'application/json',
    //         'Authorization':  'Basic ' + Buffer.from(usuarioEmpresaBCP + ':' + passwordEmpresaBCP).toString('base64'),
    //         // 'Access-Control-allow-Origin': '*'
    //     },
    //     url: url,
    //     httpsAgent: agent,
    //     data: body,
    // }

    // const response = await axios(options);
    // return response; 


    // if (req.method === 'POST') {


    //     const options = {
    //         method: method,
    //         headers: {
    //             'Correlation-Id': '123',
    //             'Content-Type': 'application/json',
    //             'Authorization':  'Basic UFJFQ0pVU1RPX1VTRVI6NkFFNTJBNUUtM0E3MC00MTQwLTlERUUtRTkxNTU3NTBBNDFG',
    //         },
    //         url: url,
    //         // httpsAgent: agent,
    //         data: body,   
    //     }

    // res.setHeader('Content-Type', 'application/json')
    // res.setHeader('Authorization', `Basic UFJFQ0pVU1RPX1VTRVI6NkFFNTJBNUUtM0E3MC00MTQwLTlERUUtRTkxNTU3NTBBNDFG`)


    // }

}






