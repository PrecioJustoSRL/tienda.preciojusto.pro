import qrcodeParser from "qrcode-parser";

async function QRreaderUtils(e, setFilterQR, setFilter, readUserData, setRecetaDBP) {

    const res = await qrcodeParser(e.target.files[0])
    setFilterQR(res);
    const data = await readUserData('Receta', res, setRecetaDBP, 'qr')
    console.log(data)
    // .then((res) => {

    //     });

}

export { QRreaderUtils }