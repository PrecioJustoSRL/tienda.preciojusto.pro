'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmailAndPassword, passwordRedirect } from '@/supabase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Msg from '@/components/Msg'
import Video from '@/components/Video'
import { useRouter } from 'next/navigation';
import LoaderWithLogo from '@/components/LoaderWithLogo'
import Particles from '@/components/Particles'


export default function Home() {
  const { user, introVideo, setSound, setIntroVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, sound1, sound2, setSound1, setSound2, } = useUser()
  const [isDisable, setIsDisable] = useState(false)
  const router = useRouter()



  function readIndexedDB() {
    if (indexedDB) {
      let swoouDB
      const request = indexedDB.open('preciojusto', 1)
      request.onsuccess = () => {
        swoouDB = request.result
        readData()
      }
      request.onupgradeneeded = (e) => {
        swoouDB = e.target.result
        const objectStoreUserDB = swoouDB.createObjectStore('preciojusto', {
          keyPath: 'uid'
        })
      }
      const readData = () => {
        const transaction = swoouDB.transaction(['preciojusto'], 'readwrite')
        const objectStore = transaction.objectStore('preciojusto')
        const request = objectStore.get('video-mp4')

        request.onsuccess = () => {
          console.log(request)
          request && request.result && request.result.play == true
            ? setIntroVideo(false)
            : addData()
        }

        const addData = () => {
          const transaction = swoouDB.transaction(['preciojusto'], 'readwrite')
          const objectStore = transaction.objectStore('preciojusto')
          const request = objectStore.add({ uid: 'video-mp4', play: true })
          setIntroVideo(true)
          // setSound(true)
        }
      }
    }
  }




  console.log(introVideo)

  const signInHandler = async (e) => {
    e.preventDefault()
    setIsDisable(true)

    let email = e.target[0].value
    let password = e.target[1].value
    if (email.length == 0 || password.length == 0) {
      setUserSuccess('Complete')
      return setTimeout(() => { setIsDisable(false) }, 6000)
    }
   await signInWithEmailAndPassword(email, password, setUserSuccess)

   return setIsDisable(false)
  }



  useEffect(() => {
    introVideo == undefined ? readIndexedDB() : ''
    user === undefined && onAuth(setUserProfile)
    if (user !== undefined && user !== null) router.replace('/Cliente')
  }, [user])
  console.log(user)

  return (
    user === undefined
      ? <LoaderWithLogo></LoaderWithLogo>
      : <div className="h-full"
        style={{
          backgroundImage: 'url(/bg-login.avif)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}>

        <Video />
        <div className='w-screen h-screen  flex flex-col justify-center items-center p-5'>
          <form className={`space-y-6 lg:space-y-3 w-[100%] bg-[#00000090] rounded-[30px] lg:max-w-[350px]  ${introVideo === true || introVideo === null ? 'h-0 overflow-hidden p-0 lg:p-0' : 'h-auto px-5 py-10 lg:p-10'}`} onSubmit={!isDisable ? signInHandler : (e)=>e.preventDefault()} >
            <div className='w-full text-center flex justify-center'>
              <Image src="/logo-main.svg" width="150" height="150" alt="User" />
            </div>
            <br />
            <h5 className="text-[18px] text-center text-white">Iniciar Sesión</h5>
            <br />
            <div>
              <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-white">Email</label>
              <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-[16px] text-left  font-medium text-white">Contraseña</label>
              <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div className="flex items-start">
              <Link href='/Resetear' className="ml-auto text-white text-[14px] text-gray-100 underline">Olvidaste tu contraseña?</Link>
            </div>
            <Button type="submit" theme="Transparent">Iniciar Sesión</Button>
            <div className="text-[14px] text-center font-medium text-white">No tienes una cuenta? <Link href="/SignUp" className="text-gray-100 underline">Registrate</Link ></div>
          </form>
        </div>
        {success == 'AccountNonExist' && <Msg>Cuenta inexistente</Msg>}
        {success == 'CompleteEmail' && <Msg>Introduce tu email</Msg>}

        {success == 'Complete' && <Msg>Complete el formulario</Msg>}
        <Particles />
      </div>
  )
}


  // function createIndexedDB() {
  //   setIntroVideo(true)
  //   const indexedDB = window.indexedDB
  //   if (indexedDB) {
  //     let swoouDB
  //     const request = indexedDB.open('preciojusto', 1)
  //     request.onsuccess = (e) => {
  //       swoouDB = e.target.result
  //       addData()
  //     }
  //     request.onupgradeneeded = (e) => {
  //       swoouDB = e.target.result
  //       const objectStoreUserDB = swoouDB.createObjectStore('preciojusto', {
  //         keyPath: 'uid'
  //       })
  //     }
  //     request.onMsg = (err) => {
  //       console.log(err)
  //     }
  //     const addData = () => {
  //       const transaction = swoouDB.transaction(['preciojusto'], 'readwrite')
  //       const objectStore = transaction.objectStore('preciojusto')
  //       const request = objectStore.add({ uid: 'video-mp4', play: true })
  //     }
  //   }
  // }


