'use client'


import Image from 'next/image'
import Link from 'next/link'
import style from '../Cliente/Cliente.module.css'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import Subtitle from '../../../components/Subtitle'

import Tag from '../../../components/Tag'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'

import { useMask } from '@react-input/mask';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {

    const { cart, productDB, setUserProduct, setUserCart, setUserItem, item, tienda, setTienda } = useUser()

    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const router = useRouter()

    function HandlerCheckOut() {
        router.push('/Cliente/Comprar')
    }
    function HandlerReceta() {
        router.push('/Cliente/Recetar')
    }
    function seeMore() {
        router.push('/Producto')
    }
    const addCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: 1 } })
    }
    const addPlussCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad + 1 } })
    }
    const addLessCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        const obj = { ...cart }
        delete obj[i.uuid]
        console.log(obj)

        cart[i.uuid].cantidad - 1 == 0
            ? setUserCart(obj)
            : setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad - 1 } })
    }
    console.log(item)
    return (
        item !== undefined ? <main className="relative left-0 right-0 mx-auto p-5 mt-12 max-w-[900px] flex flex-col items-center lg:flex-row lg:justify-between lg:items-center pt-[20px] pb-[20px] bg-white rounded-[5px]">
            <div className='flex flex-wrap justify-center lg:justify-start md:max-w-[400px] '>
                <img src={item.url} className='lg:w-[90vw] lg:max-w-[400px] max-h-[200px] lg:max-h-[10000px] lg:px-10' alt="" />
                <div className='w-full flex justify-end  items-center p-5 lg:px-10'>
                    <div class="flex items-baseline text-gray-900">
                        <span class="text-[16px] text-gray-600 font-semibold">BOB</span>
                        <span class="text-[30px]  text-gray-600 font-extrabold tracking-tight">{item.costo}</span>
                    </div>
                </div>
            </div>
            <br />
            <div className='lg:pl-12 lg:border-l bg-gray-50 p-5 lg:bg-white lg:p-0'>
                <div class=" font-bold text-[16px] mb-2 text-gray-950">
                    {item['nombre de producto 1']}
                </div>
                <div class=" font-bold text-[16px] mb-2 text-gray-950">
                    {item['nombre de producto 2']}
                </div>
                <div class=" font-bold text-[16px] mb-2 text-gray-950">
                    {item['nombre de producto 3']}
                </div>
                <Subtitle>Descripción basica</Subtitle>
                <p className={style.paragraph}>{item['descripcion basica']}</p>
                <br />
                <Subtitle>Descripción tecnica</Subtitle>
                <p className={style.paragraph}>{item['descripcion tecnica']}</p>
                <br />
                <Subtitle>Uso frecuente</Subtitle>
                <p className={style.paragraph}>{item['uso frecuente']}</p>
                <br />
                <Subtitle>Cantidad</Subtitle>
                <div className='relative flex w-full justify-between items-center pr-4'>
                    {cart && cart[item.uuid] && cart[item.uuid].cantidad !== undefined && cart[item.uuid].cantidad !== 0
                        ? <div className='flex w-[150px]'>
                            <Button theme='MiniPrimary' click={(e) => addLessCart(e, item)}>-</Button>
                            {cart && cart[item.uuid] && cart[item.uuid].cantidad !== undefined && cart[item.uuid].cantidad !== 0   && <span className='flex justify-center items-center text-[16px] text-right px-5 w-[40px] font-bold'> {cart[item.uuid].cantidad} </span>}
                            <Button theme='MiniSecondary' click={(e) => addPlussCart(e, item)}>+</Button>
                        </div>
                        : <Button theme='MiniPrimaryComprar' click={(e) => addCart(e, item)}>Comprar</Button>
                    }
                </div>
                <br />
            </div>
            {Object.entries(cart).length !== 0 && <div className="fixed w-screen px-5 bottom-[70px] lg:w-[250px] lg:bottom-auto lg:top-[75px] lg:left-auto lg:right-5  z-20">
                {tienda === 'Recetar'
                    ? <Button theme="SuccessReceta" click={HandlerReceta}>Completar Receta</Button>
                    : <Button theme="SuccessBuy" click={HandlerCheckOut}>Ir a pagar</Button>}
            </div>}
        </main> : <div ></div>
    )
}
export default WithAuth(Home)