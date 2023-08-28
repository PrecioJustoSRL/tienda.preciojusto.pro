'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmailAndPassword, passwordRedirect } from '@/supabase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Msg from '@/components/Msg'
import Video from '@/components/Video'
import { useRouter } from 'next/navigation';
import LoaderWithLogo from '@/components/LoaderWithLogo'


export default function Home() {
    const { user, introVideo, setSound, setIntroVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
    const [isDisable, setIsDisable] = useState(false)
    const router = useRouter()


    
    async function handlerResset(e) {
        e.preventDefault()
        setIsDisable(true)

        let email = e.target[0].value
        let read = e.target[1].value


        if (email.length == 0 || read.length == 0) {
            setUserSuccess('Complete')
            return setTimeout(() => { setIsDisable(false) }, 6000)
        }

        
        if (read !== 'RESETEAR-CONTRASEÑA') {
            setUserSuccess('CompleteREAD')
            return 	setTimeout(() => { setIsDisable(false) }, 6000)

        }
      await  passwordRedirect(email)

      setUserSuccess('RevisaTuGmail')
      return setIsDisable(false)
    }



    useEffect(() => {
        user === undefined && onAuth(setUserProfile)
        if (user !== undefined && user !== null) router.replace('/Cliente')
    }, [user])

    return (
        user === undefined
            ? <LoaderWithLogo></LoaderWithLogo>
            : <div className="h-full"
                style={{
                    backgroundImage: 'url(/bg-signup.avif)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover'
                }}>

                <Video />
                <div className='w-screen h-screen  flex flex-col justify-center items-center p-5'>
                    <form className={`space-y-6 lg:space-y-3 w-[100%] bg-[#00000090] rounded-[30px] lg:max-w-[350px]  ${introVideo === true || introVideo === null ? 'h-0 overflow-hidden p-0 lg:p-0' : 'h-auto px-5 py-10 lg:p-10'}`} onSubmit={!isDisable ? handlerResset : (e)=>e.preventDefault()} >
                        <div className='w-full text-center flex justify-center'>
                            <Image src="/logo-main.svg" width="150" height="150" alt="User" />
                        </div>
                        <br />
                        <h5 className="text-[18px] text-center text-white">Recuperar Contraseña</h5>
                        <br />
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Email</label>
                            <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Escribe: RECUPERAR-CONTRASEÑA</label>
                            <Input type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="RECUPERAR-CONTRASEÑA" required />
                        </div>
                        <br />
                        <br />
                        <Button type="submit" theme="Transparent">Recuperar</Button>
                        <div className="text-[14px] text-center font-medium text-white">Ya tienes una cuenta? <Link href="/" className="text-gray-100 underline">Inicia Sesión</Link ></div>
                    </form>
                </div>
                {success == 'AccountNonExist' && <Msg>Cuenta inexistente</Msg>}
                {success == 'CompleteREAD' && <Msg>Escriba RECUPERAR-CONTRASEÑA</Msg>}

                {success == 'Complete' && <Msg>Complete el formulario</Msg>}
                {success == 'RevisaTuGmail' && <Msg>Un link fue enviado a tu correo</Msg>}

            </div>
    )
}