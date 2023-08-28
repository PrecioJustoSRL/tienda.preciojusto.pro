'use client'

import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { useState, useEffect } from 'react'
import { useUser } from '../../../context/Context.js'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Label from '@/components/Label'
import LoaderBlack from '@/components/LoaderBlack'
import Button from '../../../components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, success, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)


    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });

    function manageInputIMG(e) {
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))
    }
    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
   
    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }
    async function save(e) {
        e.preventDefault()
        if (userDB && userDB[0]['whatsapp']) {
            setUserSuccess('Cargando')
            await updateUserData('Administrador', { ...state, ciudad: user.ciudad }, user.uuid)
            router.push('/Administrador/Perfil')
            setUserSuccess('')
        } else {
            setUserSuccess('Cargando')
            await writeUserData('Administrador', {...state, uuid: user.uuid, ciudad: user.ciudad }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente',)
            router.push('/Administrador/Perfil')
            setUserSuccess('')
        }
    }

    useEffect(() => {
        if (user && user.rol !== undefined) readUserData(user.rol, user.uuid, setUserData,)
    }, [user]);

    return (
        <div className='w-full flex justify-center'>

        <form className='p-5 bg-white w-full max-w-[800px]' onSubmit={save} >
            {success === "Cargando" && <LoaderBlack></LoaderBlack>}
            <h3 className='text-center text-[14px] pb-3 font-bold'>Datos Empresariales</h3>
            <br />
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <Label htmlFor="">Teléfono</Label>
                    <Input type="text" name="telefono" reference={inputRefPhone} onChange={onChangeHandler} defValue={userDB && userDB[0]['telefono']} />
                </div>
                <div>
                    <Label htmlFor="">Whatsapp</Label>
                    <Input type="text" name="whatsapp" onChange={onChangeHandler} reference={inputRefWhatsApp} defValue={userDB && userDB[0]['whatsapp']} require />
                </div>
            </div>
            <br />
            <br />
            <div className='flex w-full justify-around'>
                <Button theme='Primary'>Guardar</Button>
            </div>
        </form>
        </div>
    )
}

export default WithAuth(Home)




