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
    const [state, setState] = useState({})




    const redirectHandler = (ref) => {
        router.push(ref)
    }

    console.log(userDB)
    useEffect(() => {
        if (user && user.rol !== undefined) readUserData(user.rol, user.uuid, setUserData,)
    }, []);
    return (
        <div className='w-full flex justify-center'>
            {userDB !== undefined && userDB !== null
                ? <div className="min-h-[92vh] bg-white p-5">
                    <br />
                    <div className="flex justify-center">
                        <img className='h-[100px] w-[100px] rounded-full' src={userDB[0].url} alt="" />
                    </div>
                    <br />
                    <h3 className='w-full font-base  font-normal text-center '>{userDB[0]['nombre']}</h3>
                    <h3 className='text-[12px] text-center text-emerald-400'>Abierto</h3>
                    <br />
                    <Subtitle>Quienes Somos</Subtitle>
                    <Paragraph> {userDB[0]['descripcion']}</Paragraph>
                    <div>
                        <Subtitle>Dias de atención</Subtitle>
                        <div className="flex justify-between">
                            <input type="checkbox" id="L" name="L" checked={JSON.parse(userDB[0]['dias de atencion'])['L'] ? true : false} readOnly />
                            <label htmlFor="L">L</label>
                            <input type="checkbox" id="M" name="M" checked={JSON.parse(userDB[0]['dias de atencion'])['M'] ? true : false} readOnly />
                            <label htmlFor="M">M</label>
                            <input type="checkbox" id="M" name="Mi" checked={JSON.parse(userDB[0]['dias de atencion'])['Mi'] ? true : false} readOnly />
                            <label htmlFor="M">M</label>
                            <input type="checkbox" id="J" name="J" checked={JSON.parse(userDB[0]['dias de atencion'])['J'] ? true : false} readOnly />
                            <label htmlFor="J">J</label>
                            <input type="checkbox" id="V" name="V" checked={JSON.parse(userDB[0]['dias de atencion'])['V'] ? true : false} readOnly />
                            <label htmlFor="V">V</label>
                            <input type="checkbox" id="S" name="S" checked={JSON.parse(userDB[0]['dias de atencion'])['S'] ? true : false} readOnly />
                            <label htmlFor="S">S</label>
                            <input type="checkbox" id="D" name="D" checked={JSON.parse(userDB[0]['dias de atencion'])['D'] ? true : false} readOnly />
                            <label htmlFor="D">D</label>
                        </div>
                    </div>
                    <Subtitle>Horarios De Atención</Subtitle>
                    <p className=''>{userDB[0]['horarios de apertura']} - {userDB[0]['horarios de cierre']}</p>
                    <Subtitle>Categorias</Subtitle>
                    <Subtitle>Contactos</Subtitle>
                    <div className=''>
                        <Paragraph> <img className="inline pr-5" src="/telefono.svg" alt="" />{userDB[0]['telefono']}</Paragraph>
                        <Paragraph> <img className="inline pr-5" src="/ubicacion.svg" alt="" />{userDB[0]['direccion']}</Paragraph>
                    </div>
                    <br />
                    <Button theme="Success" click={() => redirectHandler('Distribuidor/')}>Editar Perfil</Button>
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
