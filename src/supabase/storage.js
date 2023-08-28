import { supabase } from './config'
import imageCompression from 'browser-image-compression';


const uploadPDF = async (rute, file, fileName, updateUserData) => {

    await supabase
        .storage
        .from(rute)
        .upload(fileName, file, {
            cacheControl: '0',
            contentType: 'application/pdf',
            upsert: false
        })

    const { data } = await supabase
        .storage
        .from(rute)
        .getPublicUrl(fileName)

    console.log(data)

    return updateUserData(rute, { pdfURL: data.publicUrl }, fileName, 'qr')
}


const uploadStorage = async (rute, file, fileName, updateUserData, update) => {
    const options = {
        maxWidthOrHeight: 500,
        maxSizeMB: 0.07,
        alwaysKeepResolution: true,
        useWebWorker: true,
        maxIteration: 300,
        fileType: 'image/webp'
    }
    const compressedFile = file.type != 'image/gif' ? await imageCompression(file, options) : file

    const imagesRef = `${fileName}.webp`

    update === true
        ? await supabase
            .storage
            .from(rute)
            .update(imagesRef, compressedFile, {
                cacheControl: '0',
                upsert: false
            })

        : await supabase
            .storage
            .from(rute)
            .upload(imagesRef, compressedFile, {
                cacheControl: '0',
                upsert: false
            })

    const { data } = await supabase
        .storage
        .from(rute)
        .getPublicUrl(imagesRef)

    console.log(data)

    return updateUserData(rute, { url: data.publicUrl }, fileName)
}

export { uploadStorage, uploadPDF }