'use client'


import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { useState } from 'react'
import { useUser } from '../../../context/Context.js'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import { departamentos } from '@/constants'


import Button from '../../../components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const [account, setAccount] = useState('Solicitadora')





    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


    function manageInputIMG(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))

    }


    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerCheck(e) {
        setState({ ...state, [e.target.name]: e.target.checked })
    }
    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }


    async function save(e) {
        e.preventDefault()
        await writeUserData('Clinica', { ...state, uuid: user.uuid, access: account, ciudad: user.ciudad }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        await uploadStorage('Clinica', postImage, user.uuid, updateUserData)
        return router.push('/Clinica/Perfil')
    }
    return (
        <div className='w-full flex justify-center'>

            <form className='p-5 bg-white w-full max-w-[800px]'>
                <br />
                <div className='flex w-full  justify-around mb-12 border-[3px] border-[#2a52BE] transition-all'>
                    <div className={`w-1/2 flex justify-center cursor-pointer ${account == 'Solicitadora' ? 'bg-[#2a52BE]' : 'bg-white'}`} onClick={() => setAccount('Solicitadora')}>
                        <span className={`text-center text-[14px] p-5 ${account == 'Solicitadora' ? 'text-white' : ''}`} >Cuenta Solicitadora</span>
                    </div>
                    <div className={`w-1/2 flex justify-center border-l-[2px] border-gray-500  cursor-pointer transition-all ${account == 'Verificadora' ? 'bg-[#2a52BE]' : 'bg-white'}`} onClick={() => setAccount('Verificadora')}>
                        <span className={`p-5 text-center text-[14px] ${account == 'Verificadora' ? 'text-white' : ''}`}>Cuenta Verificadora</span>
                    </div>
                </div>

                <br />
                <h3 className='text-center pb-3 text-[14px] '>Agregar Perfil</h3>

                <br />

                <div className="w-full flex flex-col justify-center items-center">
                    <label htmlFor="file" className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" >
                        {urlPostImage ? <img className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" style={{ objectPosition: 'center' }} src={urlPostImage} alt="" />
                            : 'Subir Imagen'}
                    </label>
                    <br />
                    <br />
                    {account == 'Solicitadora' && <div className='relative h-[40px] left-0 w-full text-center text-[12px]'>
                        {user.uuid}
                        < br />
                        ID de solicitador
                    </div>}
                    <br />
                    <br />
                    <input className="hidden" onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" id='file' type="file" required />
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {account == 'Verificadora' &&
                        <div>
                            <Label htmlFor="">ID de solicitador</Label>
                            <Input type="text" name="ID Verificador" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
                        </div>}
                    <div>
                        <Label htmlFor="">Nombre de la clínica</Label>
                        <Input type="text" name="nombre" onChange={onChangeHandler} />
                    </div>

                    <div>
                        <Label htmlFor="">Teléfono</Label>
                        <Input type="text" name="telefono" reference={inputRefPhone} onChange={onChangeHandler} />
                    </div>
                    <div>
                        <Label htmlFor="">Whatsapp</Label>
                        <Input type="text" name="whatsapp" onChange={onChangeHandler} reference={inputRefWhatsApp} />
                    </div>
                </div>
                <div className='flex w-full justify-around'>
                    <Button theme='Primary' click={save}>Mandar solicitud</Button>
                </div>
            </form>
        </div>
    )
}

export default WithAuth(Home)




{/* <div>
                    <Label htmlFor="">Ciudad</Label>
                    <Select arr={departamentos} name='ciudad' click={onClickHandler} />
                </div> */}
{/* <div>
                    <Label htmlFor="">Dirección</Label>
                    <Input type="text" name="direccion" onChange={onChangeHandler} />
                </div> */}



