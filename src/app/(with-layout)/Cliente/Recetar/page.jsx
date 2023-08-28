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
import { generateUUID } from '@/utils/UIDgenerator'
import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import Modal from '@/components/Modal';


const InvoicePDF = dynamic(() => import("@/components/recetaPDF"), {
  ssr: false,
});
import QRCode from "qrcode.react";

function Comprar({ theme, styled, click, children }) {

  const { user, userDB, cart, qr, setQr, QRurl, setQRurl, productDB, setUserProduct, setUserItem, setUserData, setUserSuccess, recetaDB, setRecetaDB, setUserCart, modal, setModal } = useUser()
  const [add, setAdd] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [check, setCheck] = useState(false)

  const router = useRouter()

  function onChangeHandler(e) {
    setRecetaDB({ ...recetaDB, [e.target.name]: e.target.value })
  }

  const handlerQRUrl = (e) => {
    const qr = e
    setQr(qr)

  };



  function handlerPay(e) {
    e.preventDefault()
    const dataURL = recetaDB.paciente.replaceAll(' ', '') + user.uuid
    handlerQRUrl(dataURL)
    Object.values(cart).map((i) => {
      const data = { ...i }
      delete data['created_at']
      delete data['id']
      writeUserData('Receta', { ...data, ...recetaDB, medico: user.uuid, qr: dataURL }, i.uuid, userDB, setUserData, setUserSuccess, 'existos', null)
    })
  }
  function generarPDF(e) {
    e.preventDefault()
  }

  function handlerQRShare() {
    window.open(`whatsapp://send?text=${encodeURIComponent('https://hhxlyesjmtbhnqwsoplw.supabase.co/storage/v1/object/public/Clinica/9714a0de-aa97-43e0-952b-710ee646710b.webp')}`, '_blank')
  }

  function finish() {
    setModal('Finish')
  }

  function finishConfirm() {
    setUserCart({})
    setModal('')
    router.push('/Cliente')
  }

  useEffect(() => {
    document.getElementById('qr') && setQRurl(document.getElementById('qr').toDataURL())
  }, [qr, QRurl]);

  // console.log(QRurl)

  return (<div className='w-full flex flex-col justify-center items-center'>
    {modal == 'Finish' && <Modal funcion={finishConfirm}>Estas seguro de finalizar se <br /> archivara la receta que generaste.</Modal>}



    <div className=' bg-white w-full max-w-[800px] p-5'>




      <form className='min-w-[90%]' onSubmit={handlerPay}>
        <h3 className='text-center text-[16px] pb-3'>PACIENTE</h3>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Label htmlFor="">Paciente</Label>
            <Input type="text" name="paciente" onChange={onChangeHandler} require />
          </div>
          <div>
            <Label htmlFor="">Diagnostico</Label>
            <Input type="text" name="diagnostico" onChange={onChangeHandler} />
          </div>
          <div>
            <Label htmlFor="">Hospital o centro medico</Label>
            <Input type="text" name="hospital" onChange={onChangeHandler} />
          </div>
          <div className='flex items-end w-full'>
            <Button theme="Success" >Generar QR</Button>
          </div>
        </div>
      </form>
      <div className='w-full flex justify-center'>


        <div className='w-[150px] h-[150px]'>
          {qr !== '' && <QRCode
            id='qr'
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%", border: '10px', backgroundColor: 'white' }}
            value={qr}
            level={'H'}
            includeMargin={false}
            renderAs={'canvas'}
            viewBox={`0 0 256 256`}
          />}
        </div>

      </div>

      <br />

      {qr !== '' && <a
        className="block text-gray-950 w-full rounded-full bg-[#32CD32] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-[14px]  py-4 text-center z-50"
        href={QRurl} download>Guardar ImagenQR</a>}
      <br />
      {qr !== '' && <InvoicePDF dbUrl={QRurl} />}
      <br />
      {qr !== '' && <Button theme='Danger' click={finish}>Receta Completada</Button>}
    </div>
  </div>)
}

export default WithAuth(Comprar)