'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'

import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'


function Home() {
    const { user, userDB, modal, setModal, msg, setMsg, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, temporal, setTemporal } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [rol, setRol] = useState('')
    const [ciudad, setCiudad] = useState('')

    const [filter, setFilter] = useState('')


    function seeMore() {
        router.push('/Producto')
    }
    const onClickHandlerCategory = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['categoria']: value } })
    }

    const onClickHandlerCity = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['ciudad']: value } })
    }

    function manageInputIMG(e, uuid) {
        const file = e.target.files[0]
        setPostImage({ ...postImage, [uuid]: file })
        setUrlPostImage({ ...urlPostImage, [uuid]: URL.createObjectURL(file) })
        setState({ ...state, [uuid]: { ...state[uuid], uuid } })
    }

    const onClickHandlerAvailability = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['disponibilidad']: value } })
    }
    const onClickHandlerSystem = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['sistema']: value } })
    }
    function onChangeHandler(e) {
        setFilter(e.target.value.toLowerCase())
    }

    async function save(i) {
        await updateUserData('Producto', state[i.uuid], i.uuid)
        postImage[i.uuid] && await uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
        readUserData('Producto', user.uuid, distributorPDB, setUserDistributorPDB, null, null, 'distribuidor', true)

    }

    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    async function blockConfirm() {
        console.log(item)
        await updateUserData('Users', { bloqueado: !item.bloqueado }, item.uuid, null)
        await readUserAllData('Users', null, setTemporal)
        setModal('')

    }
    async function deletConfirm() {
        await deleteUserData('Users', item.uuid)
        readUserAllData('Users', null, setTemporal)
        setModal('')

    }

    function redirect() {
        router.push('/Distribuidor/Agregar')
    }


    function sortArray (x,y) {
        if(x['nombre'].toLowerCase() < y['nombre'].toLowerCase()  ) {return -1}
        if(x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) {return 1}
        return 0  
    }
    console.log(item)
    useEffect(() => {
        readUserAllData('Users', null, setTemporal)
    }, [])

    return (

        <div class="relative overflow-x-auto shadow-md p-5   bg-white min-h-[80vh]">
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario: {item.nombre}</Modal>}
            {modal === 'Block' && <Modal funcion={blockConfirm}>Estas seguro de BLOQUEAR al siguiente usuario {item.nombre}</Modal>}

            <h3 className='font-medium text-[16px]'>Clinicas</h3>
            <br />
            <div className='flex justify-center w-full'>
                <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
            </div>

            <div className=' flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Ciudad</h3>
                <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 120px)' }}>
                    <Tag theme={rol == 'Cliente' ? 'Primary' : 'Secondary'} click={() => setRol(rol == 'Cliente' ? '' : 'Cliente')}>Cliente</Tag>
                    <Tag theme={rol == 'Medico' ? 'Primary' : 'Secondary'} click={() => setRol(rol == 'Medico' ? '' : 'Medico')}>Medico</Tag>
                    <Tag theme={rol == 'Clinica' ? 'Primary' : 'Secondary'} click={() => setRol(rol == 'Clinica' ? '' : 'Clinica')}>Clinica</Tag>
                    <Tag theme={rol == 'Distribuidor' ? 'Primary' : 'Secondary'} click={() => setRol(rol == 'Distribuidor' ? '' : 'Distribuidor')}>Distribuidor</Tag>
                    <Tag theme={rol == 'Administrador' ? 'Primary' : 'Secondary'} click={() => setRol(rol == 'Administrador' ? '' : 'Administrador')}>Administrador</Tag>
                </div>
            </div>
            <div className=' flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Ciudad</h3>
                <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px) 100px 100px' }}>
                    <Tag theme={ciudad == 'Sucre' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Sucre' ? '' : 'Sucre')}>Sucre</Tag>
                    <Tag theme={ciudad == 'La paz' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'La paz' ? '' : 'La paz')}>La paz</Tag>
                    <Tag theme={ciudad == 'Cochabamba' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Cochabamba' ? '' : 'Cochabamba')}>Cochabamba</Tag>
                    <Tag theme={ciudad == 'Santa Cruz' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Santa Cruz' ? '' : 'Santa Cruz')}>Santa Cruz</Tag>
                    <Tag theme={ciudad == 'Oruro' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Oruro' ? '' : 'Oruro')}>Oruro</Tag>
                    <Tag theme={ciudad == 'Beni' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Beni' ? '' : 'Beni')}>Beni</Tag>
                    <Tag theme={ciudad == 'Pando' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Pando' ? '' : 'Pando')}>Pando</Tag>
                    <Tag theme={ciudad == 'Tarija' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Tarija' ? '' : 'Tarija')}>Tarija</Tag>
                    <Tag theme={ciudad == 'Potosi' ? 'Primary' : 'Secondary'} click={() => setCiudad(ciudad == 'Potosi' ? '' : 'Potosi')}>Potosi</Tag>
                </div>
            </div>
            <table class="w-full text-[12px] min-w-[1100px] text-left text-gray-500 border-t-4 border-gray-400">
                <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3">
                            #             
                        </th>                                 
                        <th scope="col" class="px-3 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Ciudad
                        </th>
                        <th scope="col" class="px-8 py-3">
                            Telefono
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Whatsapp
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Rol
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Blockear
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {temporal && temporal !== undefined && temporal.sort(sortArray).map((i, index) => {

                        return i.rol && i.rol.includes(rol) && i.ciudad.includes(ciudad) && i.nombre.toLowerCase().includes(filter) && <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['nombre']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 3' defaultValue={i['nombre de producto 3']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['ciudad']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} class="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {/* {i['telefono']} */}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} class="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {/* {i['whatsapp']} */}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 3' defaultValue={i['nombre de producto 3']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['rol']}
                            </td>
                           {i['rol'] === 'Administrador' ? <><td class="px-3 py-4">
                                No permitido
                            </td>
                            <td class="px-3 py-4">
                            No permitido
                            </td> </>
                            :<><td class="px-3 py-4">
                            {i.bloqueado == true
                                ? <Button theme={"Success"} click={() => delet(i, 'Block')}>Desbloquear</Button>
                                : <Button theme={"Secondary"} click={() => delet(i, 'Block')}>Bloquear</Button>
                            }
                        </td>
                        <td class="px-3 py-4">
                            <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
                        </td> </>
                            }
                        </tr>
                    })
                    }
                </tbody>
            </table>



        </div>

    )
}


export default WithAuth(Home)




        // console.log({ bloqueado: !item.bloqueado })
        // await updateUserData('Producto', { bloqueado: !item.bloqueado }, item.uuid, eq)
        // readUserData('Producto', userUuid, distributorPDB, setUserDistributorPDB, null, null, 'distribuidor', true)
        // updateUserData = async (rute, object, uuid, eq) 
        // postImage[userUuid] && uploadStorage('Producto', postImage[userUuid], userUuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[userUuid]
        // setState(obj) updateUserData = async (rute, object, uuid, eq)


        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
