'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { getDayMonthYear } from '@/utils/DateFormat'


function Home() {
    const { user, userDB, distributorPDB, setUserDistributorPDB, pedidos, setUserPedidos, setUserItem, setUserData, setUserSuccess, } = useUser()

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

    function delet(i) {
        deleteUserData('Pedido', i.uuid)
        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
    }

    function calculator(data) {
        const val = Object.values(data).reduce((acc, i, index) => {
            const sum = i['costo'] * i['cantidad']
            return sum + acc
        }, 0)
        return val
    }

    console.log(state)
    useEffect(() => {
        readUserData('Pedido', user.uuid, setUserPedidos, 'cliente')
    }, [])

    return (

        <div class="relative overflow-x-auto shadow-md ">
            <table class=" min-w-[1200px] lg:w-full lg:min-w-[1000px] text-[12px] text-left text-gray-500">
                <thead class="w-full text-[12px] text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col-3" className="px-3 py-3 text-center">
                            #
                        </th>
                        <th scope="col-3" className="px-3 py-3 text-center">
                            Paciente
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Producto
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Ciudad/Provincia
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Estado
                        </th>

                        <th scope="col" className="px-3 py-3 text-center">
                            Costo
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Debito
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                            Fecha
                        </th>
                        {/* <th scope="col" className="px-3 py-3 text-center">
                            Eliminar
                        </th> */}
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {pedidos && pedidos !== undefined && pedidos.map((i, index) => {
                        return <tr class="text-[12px] border-b hover:bg-gray-50" key={index}>
                            <td class="px-3 py-4  flex font-semibold  text-gray-900  text-center">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {i['nombre del paciente']}
                            </td>
                            <td class="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {JSON.parse(i.compra).map((el, index) => <li key={index}>{el['nombre de producto 1']}{' *('}{el['cantidad']}{')'}</li>)}
                            </td>
                            <td class="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {i['check'] == true ? 'Provincia' : 'Ciudad'}
                            </td>
                            <td class={`px-3 py-4 font-semibold text-gray-900   flex justify-center w-full`}>
                                {/* <Select arr={['Nuevo', 'Atendido', 'Felicitaciones']} name='estado' defaultValue={i.estado} uuid={i.uuid} click={onClickHandlerCategory} /> */}
                                <span class={`px-3 py-4 font-semibold text-gray-900   rounded-full ${i.estado == 'Pendiente' && 'bg-gray-400'} ${i.estado == 'Felicitaciones' && 'bg-green-400'} ${i.estado == 'Atendido' && 'bg-yellow-300'}`}>{i['estado']}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {calculator(JSON.parse(i.compra)) * 1 + (i['check'] == true ? 350 : 0)}
                            </td>
                            <td class="px-3 py-4 font-semibold  text-gray-900  text-center">
                                {i['message'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'}
                            </td>
                            <td class="px-3 py-4 h-full font-semibold  text-gray-900  text-center">
                                {getDayMonthYear(i['created_at'])}
                            </td>
                            {/* 
                            <td class="px-3 py-4">
                                {state[i.uuid]
                                    ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                    : <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                }
                            </td> */}
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>

    )
}

export default WithAuth(Home)


