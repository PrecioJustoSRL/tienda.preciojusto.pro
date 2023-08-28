'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmailAndPassword } from '@/supabase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Msg from '@/components/Msg'
import Video from '@/components/Video'

import Input from '@/components/Input'
import { useRouter } from 'next/navigation';


export default function Home() {

  const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()


  const signUpHandler = async (e) => {
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value

   if ( email.length == 0 && password.length == 0 ){
    setUserSuccess('Complete')
    return
   }

    const data = await signUpWithEmailAndPassword(email, password, setUserProfile)
    console.log(data)
    setUserProfile(data.user)
    data.user == null ?  setUserSuccess('CuentaExiste') : router.push('/Register')
  }

  useEffect(() => {
    // user == undefined && onAuth(setUserProfile)
    // user && router.push('/Register')
  }, [user, success]);

  return (
    <div className="min-h-full"
      style={{
        backgroundImage: 'url(/bg-signup.avif)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}>
      <Video />
      <div className='w-screen h-screen  flex flex-col justify-center items-center p-5'>
        <form className={`space-y-6 lg:space-y-3 w-[100%] bg-[#00000090] rounded-[30px] lg:max-w-[350px] ${introVideo == true ? 'h-0 overflow-hidden' : 'h-auto px-5 py-10 lg:p-10'}`}  onSubmit={signUpHandler} >
          <div className='w-full text-center flex justify-center'>
            <Image src="/logo-main.svg" width="150" height="150" alt="User" />
          </div>
          <br />
          <h5 className="text-[18px] text-center text-white">Registrate</h5>
          <br />
          <div>
            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Email</label>
            <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Contraseña</label>
            <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-100 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div className="flex items-start">
          <Link href="/Resetear" className="ml-auto text-[14px] text-gray-100 underline">Olvidaste tu contraseña?</Link>
          </div>
          <Button type="submit" theme="Transparent">Continuar</Button>
          <div className="text-[14px] text-center font-medium text-white">Ya tienes una cuenta? <Link href="/" className="text-gray-100 underline">Inicia Sessión</Link >
          </div>
        </form>
      </div>
      {success == 'CuentaExiste' && <Msg>Cuenta ya registrada</Msg>}
      {success == 'Complete' && <Msg>Complete el formulario</Msg>}
    </div>
  )
}
