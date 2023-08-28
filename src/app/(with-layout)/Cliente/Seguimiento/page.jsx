'use client'
import { readUserAllData, updateUserData } from '@/supabase/utils'
import { useUser } from '@/context/Context.js'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Card from '@/components/Card'
import CardM from '@/components/CardM'
import QRreader from '@/components/QRreader'


import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect } from 'react'
import QrcodeDecoder from 'qrcode-decoder';
import { QRreaderUtils } from '@/utils/QRreader'

function Home() {
    const { user, cart, productDB, setUserProduct, setUserItem, item, filter, setFilter, filterQR, setFilterQR, recetaDBP, setRecetaDBP } = useUser()

    const router = useRouter()


    function HandlerCheckOut() {
        router.push('/Cliente/Comprar')
    }
    function HandlerRecetar() {
        router.push('/Cliente/Recetar')
    }
    function HandlerOnChange(e) {
        QRreaderUtils(e, setFilterQR)
    }


    console.log(filterQR)

    useEffect(() => {
        readUserAllData('Producto', productDB, setUserProduct)
        readUserAllData('Receta', recetaDBP, setRecetaDBP)
    }, []);

    return (

        <main className="p-4 flex flex-col justify-center">
            <br /><br />
            <h1 className='text-center text-[22px]'>FELICIDADES POR TU COMPRA </h1>
            <br />
            <div className='flex items-center justify-center'>
                <div className='h-[80px] w-[80px] bg-red-400 rounded-full font-medium mr-6'></div>
                <p className="flex max-w-[250px]">TU COMPRA SE HA INFORMADO A LA EMPRESA, EN BREVE DE PONDRA EN CONTACTO CONTIGO</p>
            </div>
            <br />
            <div className='flex items-center justify-center'>
                <div className='h-[80px] w-[80px] bg-gray-400 rounded-full mr-6'></div>
                <p className="flex max-w-[250px]">TE HAS PUESTO EN CONTACTO CON LA EMPRESA, ESTAMOS SEGUROS QUE LE IRA BIEN EN LA CIRUGIA</p>
            </div>
            <br />
            <div className='flex items-center justify-center'>
                <div className='h-[80px] w-[80px] bg-gray-400 rounded-full mr-6'></div>
                <p className="flex max-w-[250px]">NOS INFORMAN QUE LA CIRUGIA SE HA LLEVADO A CABO CON EXITO, FELICIDADES</p>
            </div>
        </main>
    )
}

export default WithAuth(Home)