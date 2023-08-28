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
import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'

function Home() {
    const { user, userDB, userUuid, modal, setModal, msg, setMsg, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [sistema, setSistema] = useState('')


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
    function onChangeHandler(e, i) {
        setState({ ...state, [userUuid]: { ...state[userUuid], uuid: userUuid, [e.target.name]: e.target.value } })
    }

    async function save(i) {
        await updateUserData('Producto', state[userUuid], userUuid)
        postImage[userUuid] && await uploadStorage('Producto', postImage[userUuid], userUuid, updateUserData, true)
        const obj = { ...state }
        delete obj[userUuid]
        setState(obj)
        readUserData('Producto', userUuid, distributorPDB, setUserDistributorPDB, null, null, 'distribuidor', true)
    }
    async function blockConfirm() {
        console.log(item) 
        // console.log({ bloqueado: !item.bloqueado })
        // await updateUserData('Producto', { bloqueado: !item.bloqueado }, item.uuid, eq)
        // readUserData('Producto', userUuid, distributorPDB, setUserDistributorPDB, null, null, 'distribuidor', true)
        // updateUserData = async (rute, object, uuid, eq) 
        // postImage[userUuid] && uploadStorage('Producto', postImage[userUuid], userUuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[userUuid]
        // setState(obj) updateUserData = async (rute, object, uuid, eq)
    }
    async function deletConfirm() {
        await deleteUserData('Producto', userUuid)
        readUserData('Producto', userUuid, distributorPDB, setUserDistributorPDB, null, null, 'distribuidor', true)

        // postImage[userUuid] && uploadStorage('Producto', postImage[userUuid], userUuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[userUuid]
        // setState(obj)
    }
    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    function redirect() {
        router.push('/Distribuidor/Agregar')
    }

    function sortArray (x,y) {
        if(x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()  ) {return -1}
        if(x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) {return 1}
        return 0  
    }

    useEffect(() => {
        readUserData('Producto', userUuid, setUserDistributorPDB, 'distribuidor')
    }, [])

    return (

        <div class="relative overflow-x-auto shadow-md p-5 bg-white min-h-[80vh]">

            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario {msg}</Modal>}
            {modal === 'Block' && <Modal funcion={blockConfirm}>Estas seguro de BLOQUEAR al siguiente usuario {msg}</Modal>}

            <h3 className='font-medium text-[16px]'>Lista De Productos</h3>
            <br />
            {/* <div className='grid grid-cols-3 w-[900px]'>
                <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' placeholder='Ingresa el ID'/>
                <Button theme='Primary'>Importar Datos Mediante ID</Button>
                <Button theme='Primary'>Importar Datos De Precio Justo</Button>
            </div> */}

            <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Disponibilidad</h3>
                <div className="grid grid-cols-3 gap-4 w-[500px] ">
                    <Tag theme={disponibilidad == 'En 24 hrs' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'En 24 hrs' ? '' : 'En 24 hrs')}>En 24 hrs</Tag>
                    <Tag theme={disponibilidad == 'Disponibilidad inmediata' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'Disponibilidad inmediata' ? '' : 'Disponibilidad inmediata')}>Inmediato</Tag>
                    <Tag theme={disponibilidad == 'No disponible' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'No disponible' ? '' : 'No disponible')}>No disponible</Tag>
                </div>
            </div>
            <div className='min-w-[1900px] flex justify-start items-center my-5  '>
                <h3 className="flex pr-12 text-[14px]">Categorias</h3>
                <div className="grid grid-cols-3 gap-4 w-[500px] " >
                    <Tag theme={categoria == 'Titanio' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Titanio' ? '' : 'Titanio')}>Titanio</Tag>
                    <Tag theme={categoria == 'Acero' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Acero' ? '' : 'Acero')}>Acero</Tag>
                    <Tag theme={categoria == 'Otros' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Otros' ? '' : 'Otros')}>Otros</Tag>
                </div>
            </div>
            <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Sistema</h3>
                <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px) 100px 100px 100px 200px 200px 100px' }}>
                    <Tag theme={sistema == '1.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '1.5' ? '' : '1.5')}>1.5</Tag>
                    <Tag theme={sistema == '2.0' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.0' ? '' : '2.0')}>2.0</Tag>
                    <Tag theme={sistema == '2.4' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.4' ? '' : '2.4')}>2.4</Tag>
                    <Tag theme={sistema == '2.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.5' ? '' : '2.5')}>2.5</Tag>
                    <Tag theme={sistema == '2.7' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.7' ? '' : '2.7')}>2.7</Tag>
                    <Tag theme={sistema == '3.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '3.5' ? '' : '3.5')}>3.5</Tag>
                    <Tag theme={sistema == '4.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '4.5' ? '' : '4.5')}>4.5</Tag>
                    <Tag theme={sistema == 'Clavos' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Clavos' ? '' : 'Clavos')}>Clavos</Tag>
                    <Tag theme={sistema == 'Protesis' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Protesis' ? '' : 'Protesis')}>Protesis</Tag>
                    <Tag theme={sistema == 'Costillas' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Costillas' ? '' : 'Costillas')}>Costillas</Tag>
                    <Tag theme={sistema == 'Columna y neurocirugía' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Columna y neurocirugía' ? '' : 'Columna y neurocirugía')}>Columna y neurocirugía</Tag>
                    <Tag theme={sistema == 'Fijadores externos' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Fijadores externos' ? '' : 'Fijadores externos')}>Fijadores externos</Tag>
                    <Tag theme={sistema == 'Otros' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Otros' ? '' : 'Otros')}>Otros</Tag>
                </div>
            </div>
            <table class="w-[1900px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3">
                            #
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Nombre 1
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Nombre 2
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Nombre 3
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Descripción basica
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Descripción tecnica
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Usos frecuentes
                        </th>
                        <th scope="col" class="px-8 py-3">
                            Sistema
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Costo
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Ciudad
                        </th>
                        <th scope="col" class="px-3 py-3">
                            categoría
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Disponibilidad
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Imagen
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
                    {distributorPDB && distributorPDB !== undefined && distributorPDB.sort(sortArray).map((i, index) => {

                        return i.disponibilidad.includes(disponibilidad) && i.categoria.includes(categoria) && i.sistema.includes(sistema) && <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['nombre de producto 1']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 2' defaultValue={i['nombre de producto 2']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['nombre de producto 2']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 3' defaultValue={i['nombre de producto 3']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['nombre de producto 3']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='descripcion basica' defaultValue={i['descripcion basica']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['descripcion basica']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='descripcion tecnica' defaultValue={i['descripcion tecnica']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['descripcion tecnica']}
                            </td>
                            <td class="px-3 py-4 h-full font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='uso frecuente' defaultValue={i['uso frecuente']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['uso frecuente']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <Select arr={['1.5', ' 2.0', ' 2.4', '2.5', '2.7', '3.5', '4.5', 'Clavos', 'Protesis', 'Costillas', 'Columna y neurocirugia', 'Fijadores externos', 'Otros']} name='sistema' defaultValue={i.sistema} uuid={userUuid} click={onClickHandlerSystem} />
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} class="block p-1.5 h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Write your thoughts here..."></textarea> */}
                                {i['costo']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <Select arr={['La Paz', 'Cochabamba', 'Santa Cruz']} name='ciudad' defaultValue={i.ciudad} uuid={userUuid} click={onClickHandlerCity} /> */}
                                {i.ciudad}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <Select arr={['Titanio', 'Acero Inox', 'Otros']} name='categoria' defaultValue={i.categoria} uuid={userUuid} click={onClickHandlerCategory} /> */}
                                {i.categoria}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <Select arr={['Disponible', 'Disponibilidad inmediata', 'No disponible']} name='disponibilidad' defaultValue={i.disponibilidad} uuid={userUuid} click={onClickHandlerAvailability} /> */}
                                {i.disponibilidad}
                            </td>
                            <td class="w-32 p-4">
                                <img src={urlPostImage[userUuid] ? urlPostImage[userUuid] : i.url} alt="Apple Watch" />
                            </td>
                            <td class="px-3 py-4">
                                <Button theme={"Danger"} click={() => delet(i, 'Block')}>Bloquear</Button>
                            </td>
                            <td class="px-3 py-4">
                                <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
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