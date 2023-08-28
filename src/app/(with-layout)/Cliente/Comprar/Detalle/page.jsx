'use client';
import { useState } from 'react'
import Button from '@/components/Button';
import { useUser } from '@/context/Context.js'
import Subtitle from '@/components/Subtitle'
import { WithAuth } from '@/HOCs/WithAuth'
import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import Page from '@/components/Page'
import Label from '@/components/Label'
import MiniCard from '@/components/MiniCard'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import Confeti from '@/components/Confeti';

function Comprar({ theme, styled, click, children }) {

  const { user, userDB, cart, productDB, setUserProduct, setUserItem, setUserData, setUserSuccess } = useUser()
  const [add, setAdd] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [state, setState] = useState({})
  const router = useRouter()

  function onChangeHandler(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  function handlerPay() {
    // Object.values(cart).map((i) => {
    //   writeUserData('Pedido', {...i.cantidad, ...i.categoria, ...i.ciudad, ...i.costo, i.producto}, i.uuid, userDB, setUserData, setUserSuccess, 'existos', null)
    // })
    router.push('/Cliente/Comprar/Detalle')
  }
  function seguimiento() {
 
    router.push('/Cliente/Seguimiento')
  }

  console.log(cart)
  return (<div className='w-screen p-5'>
    <Confeti />
    <audio src="/sound.mpeg" autoPlay></audio>

    <div className='w-1/2 py-4'>
      <Button theme='Primary'>Imprimir</Button>
    </div>

    {Object.values(cart).length > 0 && <div className='p-5'>
      <h3 className='font-medium text-center text-[16px]'>FELICIDADES SU COMPRA SE REALIZO CON EXITO !!!</h3>
      <br />
      <div>
        Puedes hacer el seguimiento de tu compra en la barra de usuario o presionando el siguiente boton
      </div>
      <br />
      <Button theme='Primary' click={seguimiento}>Seguimiento de compra</Button>
    </div>}

    <br />

    <div className='relative items-center justify-between w-full max-w-[500px] bg-transparent md:flex  transition-all	z-0' >
      <ul className="flex flex-col bg-gray-100 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg   ">
        <h3 className='text-center text-[16px] pb-3'>DETALLES DE LA COMPRA</h3>
        <li>{Object.values(cart).length > 0 ? Object.values(cart).map((i, index) => {
          return <div class="relative w-full max-w-[500px] py-4" onClick={(e) => seeMore(e, i)} style={{ display: 'grid', gridTemplateColumns: 'auto 80px' }}>
            <div class=" flex  flex-col justify-between ">
              <div class=" font-bold text-[12px]  text-gray-950">
                Nombre de producto: {i['nombre de producto 1']}
              </div>

              <div class=" font-bold text-[12px]  text-gray-950">
                Cantidad: {i['cantidad']}u
              </div>
              <div class=" font-bold text-[12px]  text-gray-950">
                Costo Total: {i['costo'] * i['cantidad']}bs
              </div>
              <div class=" font-bold text-[12px]  text-gray-950">
                Empresa: {i['empresa']}
              </div>
              <div class=" font-bold text-[12px]  text-gray-950">
                Telefono: {i['telefono']}
              </div>
              <div class=" font-bold text-[12px]  text-gray-950">
                Celular: {i['whatsapp']}
              </div>
            </div>
          </div>
        }) : <span className='block text-[16px] text-center'>No tienes productos <br /> selecciona alguno <br /> </span>}</li>
        <li className='flex justify-between text-gray-700 text-[16px] '>
          <span className='font-bold '>TOTAL: </span>
          <span className='font-bold '>
            {Object.values(cart).reduce((acc, i, index) => {
              const sum = i['costo'] * i['cantidad']
              return sum + acc
            }, 0)} BOB
          </span>
        </li>
        {Object.values(cart).length > 0 && <span className='text-[12px] pt-[12px]'>En uno momento ellos se comunicaran contigo</span>}
      </ul>
    </div>
    <br />
{/* { Object.values(cart).length > 0 && <>
      <Button theme="Success" click={handlerPay}> Pagar por QR</Button>
      <br />
      <br />
      <Button theme="Success" click={handlerPay}> Pagar con tarjeta</Button>
    </>} */}

  </div>)
}

export default WithAuth(Comprar)


