'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmailAndPassword, passwordResset } from '@/supabase/utils'
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
        let password1 = e.target[0].value
        let password2 = e.target[1].value

        if (password1.length == 0 && password2.length == 0) {
            setUserSuccess('Complete')
            return
        }
        if (password1 !== password2) {
            setUserSuccess('NoIdenticos')
            return
        }
        await passwordResset(password1)
        setUserSuccess('Inicia Session')
        return router.push('/')

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
                <form className={`space-y-6 lg:space-y-3 w-[100%] bg-[#00000090] rounded-[30px] lg:max-w-[350px] ${introVideo == true ? 'h-0 overflow-hidden' : 'h-auto px-5 py-10 lg:p-10'}`} onSubmit={signUpHandler} >
                    <div className='w-full text-center flex justify-center'>
                        <Image src="/logo-main.svg" width="150" height="150" alt="User" />
                    </div>
                    <br />
                    <h5 className="text-[18px] text-center text-white">Actualizar contraseña</h5>
                    <br />
                    <div>
                        <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Contraseña</label>
                        <Input type="password" name="password1" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-100 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Contraseña</label>
                        <Input type="password" name="password2" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-100 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                 
                    <Button type="submit" theme="Transparent">Continuar</Button>
                    <div className="text-[14px] text-center font-medium text-white">Ya tienes una cuenta? <Link href="/" className="text-gray-100 hover:underline">Inicia Sessión</Link >
          </div>
                </form>
            </div>
             {success == 'NoIdenticos' && <Msg>Los datos no coinciden</Msg>}
      {success == 'Complete' && <Msg>Complete el formulario</Msg>} 
        </div>
    )
}
