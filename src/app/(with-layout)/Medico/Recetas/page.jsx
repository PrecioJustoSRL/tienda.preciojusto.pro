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
    const { user, userDB, modal, setModal, msg, setMsg, recetaDBP, setRecetaDBP, setUserItem, item, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})



    function onChangeHandler(e, i) {
        setState({ ...state, [i.qr]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
    }

    function save(e, i) {
        e.preventDefault()
        updateUserData('Receta', state[i.qr], i.qr, 'qr')
        const obj = { ...state }
        delete obj[i.qr]
        setState(obj)
    }
    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    async function deletConfirm (e) {
        e.preventDefault()
       await deleteUserData('Receta', item.qr, 'qr')
       readUserData('Receta', user.uuid, setRecetaDBP, 'medico',)

        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
        setModal('')
    }  

    useEffect(() => {
        readUserData('Receta', user.uuid, setRecetaDBP, 'medico')
    }, [])

    return (

        <div className="relative overflow-x-auto shadow-md ">
                        {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario {msg}</Modal>}

            <table className="w-full min-w-[700px] text-[12px] text-left text-gray-500">
                <thead className="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-3">
                            #
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Paciente
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Diagnostico
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Hospital
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Receta
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recetaDBP && recetaDBP !== undefined && recetaDBP.map((i, index) => {
                        return <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td className="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='paciente' defaultValue={i['paciente']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea> */}
                                {i['paciente']}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='diagnostico' defaultValue={i['diagnostico']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['diagnostico']} */}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='hospital' defaultValue={i['hospital']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['hospital']} */}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white ">
                                {console.log(JSON.parse(i.receta))}
                                {JSON.parse(i.receta).map((i, index) => 
                                    <li>{i['nombre de producto 1']}{'  (*'}{i['cantidad']}{')'}</li>
                                )}
                            </td>
                            <td className="px-3 py-4">
                                {state[i.qr] 
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
