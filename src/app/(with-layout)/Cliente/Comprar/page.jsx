'use client';
import { useState, useEffect } from 'react'
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
import dynamic from "next/dynamic";
import Msg from "@/components/Msg"
const InvoicePDF = dynamic(() => import("@/components/ProformaPDF"), {
  ssr: false,
});

function Comprar({ theme, styled, click, children }) {

  const { user, userDB, cart, productDB, setUserProduct, setUserItem, setUserData, setUserSuccess, success, state, setState, modal, setModal, qrBCP, setQrBCP } = useUser()
  const [add, setAdd] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [check, setCheck] = useState(false)
  const [payQR, setPayQR] = useState(false)


  const router = useRouter()

  function onChangeHandler(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }







  function handlerPay(e) {
    e.preventDefault()
    if (state['nombre del paciente'] && state['celular del paciente'] && state['referencia del paciente']) {
      setModal('SuccessFull')

      const val = calculator()
      console.log(val)
      return val !== 0 && requestQR()
    } else {
      setUserSuccess('Complete')
    }





    // Object.values(cart).map((i) => {
    //   const data = { ...i }
    //   delete data['created_at']
    //   delete data['id']
    //   writeUserData('Pedido', { ...data, envio: check, ...state, estado: 'nuevo', cliente: user.uuid }, i.uuid, userDB, setUserData, setUserSuccess, 'existos', null)
    // })
    // router.push('/Cliente/Comprar/Detalle')


    // window.navigator.vibrate([1000])
  }
  function handlerCheck(data) {
    setCheck(data)
    setState({ ...state, check: data })

  }


  function calculator() {
    const val = Object.values(cart).reduce((acc, i, index) => {
      const sum = i['costo'] * i['cantidad']
      return sum + acc
    }, 0)
    return val
  }

  const requestQR = async () => {
    const amount = calculator()
    try {
      console.log('her')
      const res = await fetch('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({ amount: amount + (check ? 350 : 0) }),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      })
      const data = await res.json()
      console.log(data.data.qrImage)
      setQrBCP(data.data.qrImage)
    } catch (err) {
      console.log(err)
    }
    //     console.log('click')
    //     fetch('http://localhost:3000/api')
    //   .then(response => console.log(response))
    //   .then(data => console.log(data));
  }

  // useEffect(() => {
  //   const val = calculator()
  //   console.log(val)
  //   qrBCP === undefined && val !== 0 && requestQR()
  // }, [qrBCP])

  function closeModal() {
    setModal('')
    setQrBCP(undefined)
  }


  function fetchApiCallback() {
    fetchData(API, function (error1, data1) {

    })
  }















  console.log(userDB)
  return (<div className='w-full relative p-5 pb-[50px]'>
    {success == 'Complete' && <Msg>Complete el formulario</Msg>}
    <InvoicePDF />
    <form >
      <h3 className='text-center text-[16px] pb-3'>DATOS DEL PACIENTE</h3>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label htmlFor="">NOMBRE DEL PACIENTE</Label>
          <Input type="text" name="nombre del paciente" onChange={onChangeHandler} require />
        </div>
        <div>
          <Label htmlFor="">NÚMERO DE CELULAR</Label>
          <Input type="text" name="celular del paciente" onChange={onChangeHandler} require />
        </div>
        <div>
          <Label htmlFor="">NÚMERO DE CELULAR REFERENCIA</Label>
          <Input type="text" name="referencia del paciente" onChange={onChangeHandler} require />
        </div>
        <div>
          <div className="mb-2">
            <Label htmlFor="">REFERENCIA DEL LUGAR</Label>
            <div className="flex items-center" onClick={() => handlerCheck(false)}>
              <div className="flex  mt-[2px] h-5 mr-5">
                <input id="remember" type="radio" value="" checked={check == false ? true : false} onClick={() => handlerCheck(false)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="remember" className="ml-2 text-[14px] font-medium " onClick={() => handlerCheck(false)}>Para la ciudad</label>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center" onClick={() => handlerCheck(true)}>
              <div className="flex  mt-[2px] h-5 mr-5">
                <input id="remember" type="radio" value="" checked={check == true ? true : false} onClick={() => handlerCheck(true)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="remember" className="ml-2 text-[14px] font-medium " onClick={() => handlerCheck(true)} >Para provincia (+350bs)</label>
            </div>
          </div>
        </div>

      </div>
      {user.rol == 'Clinica' && userDB && userDB[0].access == 'Solicitadora'
        ? Object.values(cart).length > 0 && <div className="fixed w-screen px-5 left-0 bottom-[70px] lg:w-[250px] lg:bottom-auto lg:top-[75px] lg:left-auto lg:right-5  z-20">
          <Button theme="SuccessBuy" click={handlerPay}> Solicitar</Button>
        </div>
        : Object.values(cart).length > 0 && <div className="fixed w-screen px-5 left-0  bottom-[70px] lg:w-[250px] lg:bottom-auto lg:top-[75px] lg:left-auto lg:right-5  z-20">
          <Button theme="SuccessBuy" click={handlerPay}> Pagar por QR</Button>
        </div>
      }
    </form>






    {modal === 'SuccessFull' && <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#000000c2] z-50">
      <div className='relative p-10 bg-white'>
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <br />
        Paga por QR y adquiere tus productos
        <br />
        {
          qrBCP !== undefined
            ? <img src={`data:image/png;base64,${qrBCP}`} className=' w-[80vw] max-w-[300px]' alt="" />
            : <div aria-label="Loading..." role="status" className="flex items-center justify-center space-x-2 py-10">
              <svg className="h-5 w-5 animate-spin stroke-gray-950" viewBox="0 0 256 256"><line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
              <span className="text-[12px] text-gray-950">Generando QR...</span>
            </div>
        }
        <br />
        {qrBCP !== undefined && <a
          className="block text-gray-950 w-full rounded-full bg-[#32CD32] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-[14px]  py-4 text-center z-50"
          href={`data:image/png;base64,${qrBCP}`} download>Guardar ImagenQR</a>}
      </div>
    </div>}









    <h3 className='text-center text-[16px] px-5 py-2 bg-[#2A52BE] text-white' >MIS COMPRAS</h3>

    <div className='relative overflow-x-auto items-center justify-between w-full max-w-screen bg-transparent md:w-auto lg:max-w-auto transition-all	z-0' >

      <table class="w-full lg:min-w-[800px] border-[1px] border-gray-200 lg:w-full lg:min-w-auto text-[12px] text-left text-gray-500">
        {Object.values(cart).length > 0 && <thead class="text-[12px] text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col-3" class="w-1/2 px-2 py-3">
              Producto
            </th>
            <th scope="col" class="px-0 py-3 text-center">
              Cantidad
            </th>
            <th scope="col" class="px-2 w-[200px] py-3">
              Costo total
            </th>
          </tr>
        </thead>}

        {Object.values(cart).length > 0 ? Object.values(cart).map((i, index) => <MiniCard i={i} />) : <span className='block text-[16px] text-center'>No tienes productos <br /> selecciona alguno <br /> </span>}

        {Object.values(cart).length > 0 && <tbody>
          <tr class="bg-white text-[12px] border-b">
            <td class="px-2 py-4  flex text-[16px] text-gray-700 font-extrabold text-gray-900">
              TOTAL:
            </td>
            <td>{check && '+350 Bs *Para provincia'}</td>
            <td class="px-2 py-4 font-extrabold  text-[16px] text-gray-700">
              {Object.values(cart).reduce((acc, i, index) => {
                const sum = i['costo'] * i['cantidad']
                return sum + acc
              }, 0) + (check ? 350 : 0)}  Bs.
            </td>
          </tr>
        </tbody>}

      </table>
    </div>
    <br />
    <br />






  </div>)
}

export default WithAuth(Comprar)





// import Page from '@/components/Page'

// const Home = () => {
//   return (
//   <>
//     <a href="/api/pdf" download="generated_pdf.pdf" className="downloadBtn">Download PDF</a>
//     <Page>
//       <h1>Generated PDF</h1>
//       <p>As you can see you can scroll without issues and select text.</p>
//     </Page>
//     <Page>
//       <h1>Page 2</h1>
//       <p>As you can see you can scroll without issues and select text.</p>
//     </Page>
//   </>
//   )
// }

// export default Home
{/* <li className='flex justify-between text-gray-700 text-[16px] '>
          <span className='font-bold '>TOTAL: </span>
          <span className='font-bold '>
            {Object.values(cart).reduce((acc, i, index) => {
              const sum = i['costo'] * i['cantidad']
              return sum + acc
            }, 0)}  Bs
          </span>
        </li> */}







