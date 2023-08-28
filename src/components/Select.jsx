'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import style from './Select.module.css'


export default function Select({arr, name, click, defaultValue, uuid}) {

    const router = useRouter()

    const [select, setSelect] = useState(false)
    const [state, setState] = useState(defaultValue ? defaultValue : arr[0])

    function handlerSelect () {
        setSelect(!select)
    }

    function handlerUserState (name, i) {
        setState(i)
        click(name, i, uuid)
    }



    return (

        <div 
            className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full  `} 
            // className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
            onClick={handlerSelect}>
                <div className={`p-3 ${state == 'No disponible' &&  'bg-red-400'} ${state == 'Inmediato' &&  'bg-green-400'} ${state == 'En 24 hrs' &&  'bg-yellow-300'}`}>
                     {state} <span className={select ? 'absolute right-5 rotate-[270deg]' :'absolute right-5 rotate-90'}>{'>'}</span>
            
                </div>
           <ul 

            className={select ? `p-3 absolute left-0 top-12 bg-gray-50 outline outline-1 outline-gray-300 text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full p-3 z-30`: 'hidden' } 
            // className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
            >
                {
                    arr.map((i)=> <li key={i} className={`mb-2 cursor-pointer`} onClick={() => handlerUserState(name, i)}>{i}</li>)
                }
            </ul>
        </div>
    )
}

















// 'use client';

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation';
// import style from './Select.module.css'


// export default function Select({arr, click}) {

//     const router = useRouter()

//     const [select, setSelect] = useState(false)
//     const [state, setState] = useState('La Paz')

//     function handlerSelect () {
//         setSelect(!select)
//     }

//     function handlerUserState (data) {
//         setState(data)
//     }



//     return (

//         <div className={select ? style.select : style.noSelect} onClick={handlerSelect}>
//             {state} <span>{'>'}</span>
//             <ul>
//                 {
//                     arr.map((i)=> <li key={i} onClick={() => handlerUserState(i)}>{i}</li>)
//                 }
            
//             </ul>
//         </div>
//     )
// }
