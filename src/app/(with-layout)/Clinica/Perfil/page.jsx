'use client'
import { readUserData } from '@/supabase/utils'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '../../../../context/Context.js'
import Button from '../../../../components/Button'
import Subtitle from '@/components/Subtitle'
import Paragraph from '@/components/Paragraph'
import { WithAuth } from '@/HOCs/WithAuth'

function Home() {
    const router = useRouter()

    const { user, userDB, setUserData } = useUser()

    const redirectHandler = (ref) => {
        router.push(ref)
    }

    console.log(userDB)
    useEffect(() => {
        if (user && user.rol !== undefined) readUserData(user.rol, user.uuid, setUserData,)
    }, [user]);
    return (
        <div className='w-full flex justify-center'>
            {userDB !== undefined && userDB !== null
                ? <div className=" bg-white  w-full max-w-[800px] p-5 ">
                    <br />
                    <div className="flex justify-center">
                        <img className='h-[100px] w-[100px] rounded-full' src={userDB[0].url} alt="" />
                    </div>
                    <br />
                    <h3 className='w-full text-[14px] text-center '>{userDB[0]['nombre'].toUpperCase()}</h3>
                    <br />
                    <h3 className='w-full text-[14px] text-center '>{userDB[0]['access']}</h3>
                    <br />
                    <Subtitle>Contactos</Subtitle>
                    <div className=''>
                        <Paragraph> <img className="inline pr-5" src="/whatsapp.svg" alt="" />{userDB[0]['whatsapp']}</Paragraph>
                        <Paragraph> <img className="inline pr-5" src="/telefono.svg" alt="" />{userDB[0]['telefono']}</Paragraph>
                        <Paragraph> <img className="inline pr-5" src="/ubicacion.svg" alt="" />{userDB[0]['ciudad']}</Paragraph>
                    </div>
                    <br />
                    <Button theme="Success" click={() => redirectHandler(`/${user.rol}`)}>Editar Perfil</Button>
                    <img className="fixed bottom-5 right-5" src="/whatsapp.svg" alt="" />
                </div>
                : <div className='w-full flex justify-center'>
                    <div className=" w-full max-w-[800px] p-5 flex flex-col items-center justify-center bg-white h-[80vh]">
                        <img src="/logo-circle.png" className='w-[150px] h-[150px]' alt="" />
                        <br />
                        <Button theme="Success" click={() => redirectHandler(`/${user.rol}`)}>Completa tu Perfil</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default WithAuth(Home)
