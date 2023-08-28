'use client'

import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from '../components/Button'
import { useRouter } from 'next/navigation';


Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '1cm',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
    },
    image: {
        boxSizing: 'border-box',
        position: 'relative',
        objectFit: 'cover'
    },

})

const PDFView = ({ dbUrl, style }) => {
    const router = useRouter()

    const [dataUrl, setDataUrl] = useState('');

    const { userDB, user, state, cart } = useUser()
    const [isCliente, setisCliente] = useState(false);

    function download(url) {

        const isWebview = () => {

            if (typeof window === undefined) { return false };

            let navigator = window.navigator;

            const standalone = navigator.standalone;
            const userAgent = navigator.userAgent.toLowerCase();
            const safari = /safari/.test(userAgent);
            const ios = /iphone|ipod|ipad/.test(userAgent);
            return ios ? !standalone && !safari : userAgent.includes('wv');
        }
        if (isWebview()) {
            router.pathname !== '/DownloaderPDF' && window.open(`https://collage-two.vercel.app/DownloaderPDF?dataUrl=${dataUrl}&uid=${user.uid}`, '_system')
        } else {
            console.log('no es una webview')
        }
    }


    useEffect(() => {
        setDataUrl(dbUrl)
        setisCliente(true)
    });

    return (
        <div className="w-full p-5 height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page size='A4' style={styles.body} >
                        <View>
                            <Text style={{ fontSize: '12px' }}>En precio justo nos sentimos orgullosos de poder proveerle productos al mejor precio y de calidad. {user.nombre}</Text>
                        </View>

                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingTop: '50px' }}>
                            <View style={{ width: '50%',}}>
                                <Text style={{ fontSize: '12px', alignText: 'center' }}>DATOS</Text>
                                <View style={{ paddingTop: '12px' }}>
                                    <Text style={{ fontSize: '12px' }}>Nombre del paciente: {state['nombre del paciente']}</Text>
                                </View>
                                <View style={{ paddingTop: '12px' }}>
                                    <Text style={{ fontSize: '12px' }}>Número de celular: {state['celular del paciente']}</Text>
                                </View>
                                <View style={{ paddingTop: '12px' }}>
                                    <Text style={{ fontSize: '12px' }}>Numero de celular Referencia: {state['referencia del paciente']}</Text>
                                </View>
                                <View style={{ paddingTop: '12px' }}>
                                    <Text style={{ fontSize: '12px' }}>Solicitado para: {state.check ? 'Provincia' : 'Ciudad'}</Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image src="/logo-main.png" style={{ height: '130px', width: '100px' }}></Image>
                                </View>
                            </View>
                        </View>




                        <Text style={{ fontSize: '12px', alignText: 'center', paddingTop: '25px' }}>PRODUCTOS</Text>

                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingTop: '50px' }}>
                            <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px', color: 'white', fontWeight: 'bold', backgroundColor: '#2A52BE' }}>
                                Producto
                            </Text>
                            <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px', color: 'white', fontWeight: 'bold', backgroundColor: '#2A52BE'  }}>
                                Cantidad
                            </Text>
                            <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px', color: 'white', fontWeight: 'bold', backgroundColor: '#2A52BE'  }}>
                                Costo total
                            </Text>
                        </View>

                        {Object.values(cart).length > 0 ? Object.values(cart).map((i, index) => {
                            return <View style={{ display: 'flex', width: '100%', flexDirection: 'row', }}>

                                <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px'  }}>
                                    {i['nombre de producto 1']}
                                    {/* {i.costo} Bs. */}
                                </Text>
                                <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px'  }}>
                                    {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined && cart[i.uuid].cantidad !== 0 && cart[i.uuid].cantidad}
                                </Text>
                                <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px' }}>
                                    {cart && cart[i.uuid] && cart[i.uuid].cantidad !== undefined ? cart[i.uuid].cantidad * i.costo : i.costo} Bs.
                                </Text>
                            </View>
                        }) : ''}
                        {Object.values(cart).length > 0 ?  <View style={{ display: 'flex', width: '100%', flexDirection: 'row',  }}>

                                <Text style={{ width: '100%', fontSize: '12px' ,  border: '1px solid black', padding: '5px 2px', fontWeight: 'bold', backgroundColor: 'yellow'}}>
                                    TOTAL
                                </Text>
                                <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px' , fontWeight: 'bold', backgroundColor: 'yellow' }}>
                                    {state.check && '+350 Bs *Para provincia'}
                                </Text>
                                <Text style={{ width: '100%', fontSize: '12px',  border: '1px solid black', padding: '5px 2px', fontWeight: 'bold', backgroundColor: 'yellow' }}>
                                    {Object.values(cart).reduce((acc, i, index) => {
                                        const sum = i['costo'] * i['cantidad']
                                        return sum + acc
                                    }, 0) + (state.check ? 350 : 0)}  Bs.
                                </Text>
                            </View>
                         : ''}


                        <View style={{ width: '100%', paddingTop: '25px' }}>
                            <Text style={{ fontSize: '12px' }}>

                                El médico especialista que le está atendiendo cuenta con la idoneidad necesaria para emitir esta receta de implantes de osteosíntesis.
                                Precio justo recomienda seguir siempre el criterio de su médico tratante, puesto su experiencia es invaluable.
                                Precio Justo. La mejor calidad al menor precio.

                            </Text>
                        </View>
                    </Page>
                </Document>
            }
                fileName='Proforma'>

                {({ blob, url, loading, error }) =>
                    <div className='fixed top-0 right-[15px] w-1/2 max-w-[250px] py-4 z-[50] '>
                        <Button theme='PrimaryPrint'>Imprimir Proforma</Button>
                    </div>}
            </PDFDownloadLink>}
        </div>
    )
}

export default PDFView