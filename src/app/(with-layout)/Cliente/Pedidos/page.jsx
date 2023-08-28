'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData , deleteUserData, readUserAllData} from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { getDayMonthYear } from '@/utils/DateFormat'


function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, pedidos, setUserPedidos,  setUserItem, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})

    function seeMore() {
        router.push('/Producto')
    }
    const onClickHandlerCategory = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['estado']: value } })
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

    function onChangeHandler(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
    }

    function save(i) {
        updateUserData('Pedido', state[i.uuid], i.uuid)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
    }

    function delet (i) {
        deleteUserData('Pedido', i.uuid)
        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
    }  
console.log(state)
    useEffect(() => {
        readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
    }, [])

    return (

        <div class="relative overflow-x-auto shadow-md ">
            <table class=" min-w-[1200px] lg:w-full lg:min-w-[1000px] text-[12px] text-left text-gray-500">
                <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col-3" class="px-3 py-3">
                            #
                        </th>
                        <th scope="col-3" class="px-3 py-3">
                            Paciente
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Producto
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Cantidad
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Envio
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Estado
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Fecha
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos && pedidos !== undefined && pedidos.map((i, index) => {
                        return <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['nombre del paciente']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['nombre de producto 1']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['cantidad']}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['check'] == true ? 'Provincia' : 'Ciudad'}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <Select arr={['Nuevo', 'Atendido', 'Felicitaciones']} name='estado' defaultValue={i.estado} uuid={i.uuid} click={onClickHandlerCategory} />
                                {/* {i['costo']} */}
                            </td>
                            <td class="px-3 py-4 h-full font-semibold text-gray-900 dark:text-white">
                                {getDayMonthYear(i['created_at'])}
                            </td>

                            <td class="px-3 py-4">
                                {state[i.uuid] 
                                ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                : <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                            }
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


