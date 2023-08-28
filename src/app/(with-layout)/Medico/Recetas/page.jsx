'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Modal from '@/components/Modal'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData , deleteUserData} from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'


function Home() {
    const { user, userDB, modal, setModal, msg, setMsg, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})



    function onChangeHandler(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
    }

    function save(e, i) {
        e.preventDefault()
        updateUserData('Receta', state[i.uuid], i.uuid)
        postImage[i.uuid] && uploadStorage('Receta', postImage[i.uuid], i.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
    }
    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    async function deletConfirm (e) {
        e.preventDefault()
       await deleteUserData('Receta', item.uuid)
       readUserData('Receta', user.uuid, distributorPDB, setUserDistributorPDB, null, null, 'medico', true)

        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
    }  

    useEffect(() => {
        readUserData('Receta', user.uuid, setUserDistributorPDB, 'medico')
    }, [])

    return (

        <div class="relative overflow-x-auto shadow-md ">
                        {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario {msg}</Modal>}

            <table class="w-full min-w-[700px] text-[12px] text-left text-gray-500">
                <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-3 py-3">
                            #
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Paciente
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Diagnostico
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Hospital
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {distributorPDB && distributorPDB !== undefined && distributorPDB.map((i, index) => {
                        return <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='paciente' defaultValue={i['paciente']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['nombre de producto 1']} */}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='diagnostico' defaultValue={i['diagnostico']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['nombre de producto 2']} */}
                            </td>
                            <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='hospital' defaultValue={i['hospital']} class="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['nombre de producto 3']} */}
                            </td>
                            <td class="px-3 py-4">
                                {state[i.uuid] 
                                ? <Button theme={"Primary"} click={(e) => save(e, i)}>Guardar</Button>
                                : <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
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
