'use client'
import { writeUserData, readUserData, onAuth, signOut } from '@/supabase/utils'
import { useUser } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { WithAuth } from '@/HOCs/WithAuth'
import Video from '@/components/Video'
import { departamentos } from '@/constants'


import { useRouter } from 'next/navigation';

function Home() {

    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData } = useUser()
    const router = useRouter()

    const [rol, setRol] = useState('Cliente')
    const [ciudad, setCiudad] = useState('La paz')


    const onClickHandler = (name, value) => {
        setRol(value)
    }
    const onClickHandlerCity = (name, value) => {
        setCiudad(value)
    }
    const registerHandler = async (e) => {
        e.preventDefault()
        let nombre = e.target[0].value
        const data = await writeUserData('Users', { uuid: user.id, nombre, rol, ciudad }, user.id, user, setUserProfile, setUserSuccess)
        console.log(data)
        setUserProfile(data[0])
        return data && dada[0] && dada[0].rol ? router.push('/Cliente') : ''
    }

   const redirectLogin = () => {
    setUserProfile(null)
    signOut()
    router.push('/')
}

    console.log(user)
    useEffect(() => {
        // console.log(user)
        // if (user && user.rol) router.push('/Cliente')
        // if (user == null || user == undefined || user.role !== 'authenticated') router.push('/SignUp')
        // if (user && user.rol) readUserData('Users', user.uuid, setUserData)
        user === undefined && onAuth(setUserProfile)
        if (user && user.rol) router.push('/Cliente')
        // if (user !== undefined && user !== null) router.replace('/Cliente')
    }, [user]);


    return (
        <div className="min-h-full "
            style={{
                backgroundImage: 'url(/bg-signup.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover'
            }}>
            <Video />
            <div className='w-screen h-screen  flex flex-col justify-center items-center p-5'>

            <form className={`space-y-6 lg:space-y-3 w-[100%] bg-[#00000090] rounded-[30px] lg:max-w-[350px] ${introVideo == true ? 'h-0 overflow-hidden' : 'h-auto px-5 py-10 lg:p-10'}`}  onSubmit={registerHandler} >
                    <div className='w-full text-center flex justify-center'>
                        <Image src="/logo-main.svg" width="150" height="150" alt="User" />
                    </div>
                    <br />
                    <h5 className="text-[18px] text-center text-white">Registrate</h5>
                    <br />                        <div>
                        <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Nombre</label>
                        <Input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Tipo de cuenta</label>
                        <Select arr={['Cliente', 'Medico', 'Clinica', 'Distribuidor']} name='rol' click={onClickHandler} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Ciudad</label>
                        <Select arr={departamentos} name='Ciudad' click={onClickHandlerCity} />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-[16px] h-[16px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 " required />
                            </div>
                            <Link href="/Politicas" className="ml-2 text-[14px] font-medium text-gray-100 underline">Políticas de Servicio</Link>
                        </div>        
                    </div>                            
                    <Button type="submit" theme="Transparent">Continuar</Button>
                    <br />
                    <div className="text-[14px] text-center font-medium text-white dark:text-gray-300">Ya tienes una cuenta? <span onClick={redirectLogin} className="text-gray-100 underline">Inicia Sessión</span >
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Home
