'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import Input from '@/components/Input'
import { generateUUID } from '@/utils/UIDgenerator'
import LoaderBlack from '@/components/LoaderBlack'
import { disponibilidad as dispo } from '@/constants'
import Modal from '@/components/Modal'

function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, modal, setModal, success, item, } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [sistema, setSistema] = useState('')
    const [id, setId] = useState('')
    function seeMore() {
        router.push('/Producto')
    }
    const onClickHandlerCategory = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['categoria']: value } })
    }



    console.log(distributorPDB)





    const importacionConfirm = async (e) => {
        setModal('')

        setUserSuccess('Actualizando')
        const queryUuid = e === 'Importar PrecioJustoSRL' ? 'Precio-Justo-SRL-Data' : id

        const data = await readUserData('Producto', queryUuid, null, 'distribuidor')
        await deleteUserData('Producto', user.uuid, 'distribuidor')

        data.map(async i => {
            const obj = { ...i }
            delete obj.id
            return await writeUserData('Producto', { ...obj, uuid: generateUUID(), distribuidor: user.uuid, ciudad: user.ciudad }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        })
        setUserDistributorPDB(undefined)
        await readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
        return setUserSuccess('')
    }

    const importacionHandler = async (e) => {
        console.log(userDB)
        if (userDB === undefined) {
            setModal('Verifica')
            return
        }

        const queryUuid = e === 'Importar PrecioJustoSRL' ? 'Precio-Justo-SRL-Data' : id

        const data = await readUserData('Producto', queryUuid, null, 'distribuidor')

        if (data.length === 0) {
            setModal('No Data')
            return
        }

        if (distributorPDB !== null && distributorPDB !== undefined) {
            setModal(e)
        }
    }

    const onChangeId = (e) => {
        setId(e.target.value)
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
        setState({ ...state, [i.uuid]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
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
        await updateUserData('Producto', { ...state[item.uuid], archivado: true }, item.uuid)
        // postImage[item.uuid] && await uploadStorage('Producto', postImage[item.uuid], item.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[item.uuid]
        setState(obj)
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
        setModal('')

    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
        console.log(item)
    }
    function redirect() {
        router.push('/Distribuidor/Agregar')
    }
    function sortArray(x, y) {
        if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
        if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
        return 0
    }
    console.log(distributorPDB)
    useEffect(() => {
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
    }, [])

    return (
        <div className='h-full'>

            <div class="relative overflow-x-auto h-full  overflow-y-auto shadow-md p-5 bg-white min-h-[80vh]">
                {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de archivar el siguiente item:  {item['nombre de producto 1']}</Modal>}

                {modal === 'No Data' && <Modal funcion={() => ''}>El identificador no contiene datos o no existe</Modal>}
                {modal === 'Importar ID' && <Modal funcion={() => importacionConfirm('Importar ID')}>Esta seguro de volver a importar los datos, <br /> se perderan los que ya tiene.</Modal>}
                {modal === 'Importar PrecioJustoSRL' && <Modal funcion={() => importacionConfirm('Importar PrecioJustoSRL')}>Esta seguro de reimportar los datos, <br /> se perderan los que ya tienes.</Modal>}
                <h3 className='font-medium text-[16px]'>Lista De Productos</h3>
                <br />
                <div className='grid grid-cols-3 w-[1000px]'>
                    <input type="text" onChange={onChangeId} className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' placeholder='Ingresa el ID' />
                    <Button theme='Primary' click={() => importacionHandler('Importar ID')}>Importar Datos Mediante ID</Button>
                    {distributorPDB !== null && distributorPDB !== undefined
                        ? <Button theme='Primary' click={() => importacionHandler('Importar PrecioJustoSRL')}>Reimportar Datos De Precio Justo</Button>
                        : <Button theme='Primary' click={() => importacionConfirm('Importar PrecioJustoSRL')}>Importar Datos De Precio Justo</Button>
                    }
                </div>
                <div className='grid grid-cols-3 w-[1000px]'>
                    <Input type="text" valu={user.uuid} />
                    <span className='flex items-center text-[14px] pl-5'>*ID para compartir productos</span>
                </div>
                <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]" htmlFor="">Disponibilidad</h3>
                    <div className="grid grid-cols-3 gap-4 w-[500px] ">
                        <Tag theme={disponibilidad == 'En un día' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'En un día' ? '' : 'En un día')}>En un día</Tag>
                        <Tag theme={disponibilidad == 'Inmediatamente' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'Inmediatamente' ? '' : 'Inmediatamente')}>Inmediatamente</Tag>
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
                                categoría
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Disponibilidad
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Imagen
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {distributorPDB && distributorPDB !== undefined && distributorPDB.sort(sortArray).map((i, index) => {
                            return i.archivado === false && i.disponibilidad.includes(disponibilidad) && i.categoria.includes(categoria) && i.sistema.includes(sistema) && <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td class="w-[200px] px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} class="block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea> */}
                                    <span className='block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 rounded-lg '>
                                        {i['nombre de producto 1']}
                                    </span>
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 2' defaultValue={i['nombre de producto 2']} class="block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['nombre de producto 2']} */}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 3' defaultValue={i['nombre de producto 3']} class="block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['nombre de producto 3']} */}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='descripcion basica' defaultValue={i['descripcion basica']} class="block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['descripcion basica']} */}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='descripcion tecnica' defaultValue={i['descripcion tecnica']} class="block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['descripcion tecnica']} */}
                                </td>
                                <td class="px-3 py-4 h-full font-semibold text-gray-900 dark:text-white">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='uso frecuente' defaultValue={i['uso frecuente']} class="block p-1.5  w-full h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['uso frecuente']} */}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <Select arr={['1.5', ' 2.0', ' 2.4', '2.5', '2.7', '3.5', '4.5', 'Clavos', 'Protesis', 'Costillas', 'Columna y neurocirugia', 'Fijadores externos', 'Otros']} name='sistema' defaultValue={i.sistema} uuid={i.uuid} click={onClickHandlerSystem} />
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} name='costo' cols="4" defaultValue={i['costo']} class="block p-1.5 h-full text-[14px] font-normal text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                    {/* {i['costo']} */}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <Select arr={['Titanio', 'Acero Inox', 'Otros']} name='categoria' defaultValue={i.categoria} uuid={i.uuid} click={onClickHandlerCategory} />
                                    {/* {i['costo']} */}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    <Select arr={dispo} name='disponibilidad' defaultValue={i.disponibilidad} uuid={i.uuid} click={onClickHandlerAvailability} />
                                </td>
                                <td class="w-32 p-4">
                                    <label htmlFor={`img${index}`}>
                                        <img src={urlPostImage[i.uuid] ? urlPostImage[i.uuid] : i.url} alt="Apple Watch" />
                                        <input id={`img${index}`} type="file" onChange={(e) => manageInputIMG(e, i.uuid)} className='hidden' />
                                    </label>
                                </td>
                                <td class="px-3 py-4">
                                    {state[i.uuid]
                                        ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                        : <Button theme={"Danger"} click={() => delet(i)}>Archivar</Button>
                                    }
                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
                <div className='lg:flex hidden lg:fixed top-[100px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-normal font-medium bg-[#32CD32] border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Producto</div>
                    <div className='flex justify-center items-center bg-[#0064FA] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div>

                {success == 'Actualizando' && <LoaderBlack />}

            </div>
        </div>
    )
}

export default WithAuth(Home)












{/* <div className='w-[100%] fixed bottom-[50px] right-[50px]  justify-end hidden lg:flex'>
<div className='flex justify-center items-center bg-white h-[50px] border border-gray-200 rounded-[10px] px-10 cursor-pointer' onClick={redirect}>Agregar Producto</div> <div className='flex justify-center items-center bg-[#0064FA] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
</div> */}
// postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
// const obj = { ...state }
// delete obj[i.uuid]
// setState(obj)
{/* <td class="px-3 py-4">
        <div class="flex items-center space-x-3">
        <button class="inline-flex items-center p-1 text-[14px] font-normal font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
        <span class="sr-only">Quantity button</span>
        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div>
            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-[14px] font-normal rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
        </div>
        <button class="inline-flex items-center p-1 text-[14px] font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span class="sr-only">Quantity button</span>
            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        </button>
</div>
</td> */}

