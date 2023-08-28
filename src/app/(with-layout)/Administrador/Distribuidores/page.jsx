'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [filter, setFilter] = useState('')

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
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
    }
    async function deletConfirm() {
        await deleteUserData('Producto', userUuid)
        readUserData('Producto', userUuid, setUserDistributorPDB, 'distribuidor')
    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
    }
    function redirect(id) {
        setUserUuid(id)
        return router.push('Administrador/Distribuidores/Productos')
    }
    function sortArray(x, y) {
        if (x['nombre'].toLowerCase() < y['nombre'].toLowerCase()) { return -1 }
        if (x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) { return 1 }
        return 0
    }

    useEffect(() => {
        readUserAllData('Distribuidor', null, setTemporal)
    }, [])

    return (

        <div class="relative overflow-x-auto shadow-md p-5 bg-white min-h-[80vh]">
            {modal === 'Delete' && <Modal click={deletConfirm} funcion={() => delet(i)}>Estas seguro de eliminar al siguiente usuario {msg}</Modal>}
            <h3 className='font-medium text-[16px]'>Distribuidores</h3>
            <br />
            <div className='flex justify-center w-full'>
                <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandler} placeholder='Filtrar por nombre' />
            </div>
            <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Ciudad</h3>
                <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px) 100px 100px 100px 200px 200px 100px' }}>
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
            <table class="w-[1900px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3">
                            #
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Nombre empresarial
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Descripcón
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Ciudad
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Dirección
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Dias de atención
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Horarios de atención
                        </th>
                        <th scope="col" class="px-8 py-3">
                            Telefono
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Whatsapp
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Ver Productos
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Bloquear
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {temporal && temporal !== undefined && temporal.sort(sortArray).map((i, index) => {

                        return i.ciudad.includes(ciudad) && i.nombre.toLowerCase().includes(filter) && <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white" onClick={(e) => redirect(i.uuid)}>
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['nombre']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 2' defaultValue={i['nombre de producto 2']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['descripcion']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 3' defaultValue={i['nombre de producto 3']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['ciudad']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='descripcion basica' defaultValue={i['descripcion basica']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['direccion']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='descripcion tecnica' defaultValue={i['descripcion tecnica']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['direccion']}
                            </td>
                            <td class="px-3 py-4 h-full font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='uso frecuente' defaultValue={i['uso frecuente']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['horarios de apertura']} - {i['horarios de cierre']}
                            </td>

                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} class="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['telefono']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} class="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['whatsapp']}
                            </td>
                            <td class="px-3 py-4">

                                <Button theme={"Primary"} click={(e) => redirect(i.uuid)}>Ver productos</Button>

                            </td>
                            <td class="px-3 py-4">

                                <Button theme={"Danger"} click={() => delet(i)}>Bloquear</Button>

                            </td>
                            <td class="px-3 py-4">

                                <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>

                            </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>



        </div>

    )
}


export default WithAuth(Home)








// const onClickHandlerCategory = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['categoria']: value } })
// }
// const onClickHandlerCity = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['ciudad']: value } })
// }
// function manageInputIMG(e, uuid) {
//     const file = e.target.files[0]
//     setPostImage({ ...postImage, [uuid]: file })
//     setUrlPostImage({ ...urlPostImage, [uuid]: URL.createObjectURL(file) })
//     setState({ ...state, [uuid]: { ...state[uuid], uuid } })
// }
// const onClickHandlerAvailability = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['disponibilidad']: value } })
// }
// const onClickHandlerSystem = (name, value, uuid) => {
//     setState({ ...state, [uuid]: { ...state[uuid], uuid, ['sistema']: value } })
// }
// postImage[userUuid] && uploadStorage('Producto', postImage[userUuid], userUuid, updateUserData, true)
// const obj = { ...state }
// delete obj[userUuid]
// setState(obj)