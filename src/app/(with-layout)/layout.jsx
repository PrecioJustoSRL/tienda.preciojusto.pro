'use client'
import { useUser } from '@/context/Context'
import { readUserAllData, updateUserData, readUserData } from '@/supabase/utils'

import { useState, useEffect } from 'react'
import style from './Medico.module.css'
import { signOut } from '@/supabase/utils'
import { useRouter } from 'next/navigation';
import Cart from '@/components/Cart'
import { WithAuth } from '@/HOCs/WithAuth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BottomNavigation from '@/components/BottomNavigation'
import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import VideoClient from '@/components/Vide'
import { Turret_Road } from 'next/font/google'
import Whatsapp from '@/components/Whatsapp'

function Home({ children }) {
  const router = useRouter()
  const { user, userDB, setUserProfile, setUserCart, setUserProduct, setRecetaDB, distributorPDB, setUserDistributorPDB, whatsapp, setWhatsapp, setUserData, filter, setFilter, nav, setNav, modal, setModal, cart, introClientVideo, setIntroClientVideo, recetaDBP, setRecetaDBP, productDB, search, setSearch, videoClientRef, setFilterQR } = useUser()
  const pathname = usePathname()


  console.log(pathname)



  const redirectHandler = (ref) => {
    router.push(ref)
  }

  const handlerFilter = (e) => {
    const data = e.target.value
    data.length > 0 ? setSearch(true) : setSearch(false)
    setFilter(data)
    setFilterQR('')
  }
  const back = () => {
    router.back()
  }
  function openNav(e) {
    e.preventDefault()
    e.stopPropagation()
    setNav(!nav)
  }

  const signOutConfirm = async () => {
    await signOut()
    setUserProfile(null)
    setUserCart({})
    setUserProduct(undefined),
      setRecetaDB(undefined),
      setUserDistributorPDB(undefined)
    setUserData(null)
    setModal('')
    return router.push('/')
  }

  function sortArray(x, y) {
    if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
    if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
    return 0
  }
  function handlerSearchFilter(data) {

    setFilter(data)
    setSearch(false)
  }
  function handlerClientVideo(data) {

    videoClientRef.current.pause()
    setIntroClientVideo(false)
    setWhatsapp(false)
  }

  function handlerWhatsapp() {
    videoClientRef.current.pause()
    setIntroClientVideo(false)
    setWhatsapp(false)
  }


  useEffect(() => {
    readUserData('Producto', 'Precio-Justo-SRL-Data', setUserDistributorPDB, 'distribuidor')

    readUserAllData('Producto', productDB, setUserProduct)
    readUserAllData('Receta', recetaDBP, setRecetaDBP)
  }, [user]);


  return (
    // <div className="pt-[65px] pb-[65px] min-h-screen bg-gray-white"  style={{ backgroundImage: `url(bg.png)`, backgroundAttachment: 'fixed', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom' }}>
    <div className="h-screen bg-gray-white">

      {modal == 'SignOut' && <Modal funcion={signOutConfirm}>
        Estas seguro de salir...? <br /> {Object.keys(cart).length > 0 && 'Tus compras no han sido efectuadas'}
      </Modal>}
      {modal == 'Verifica' && <Modal funcion={() => { router.push(`/${user.rol}`); setModal('') }}>
        Completa tu perfil para hacer tu primera compra
      </Modal>}
      <div className={`fixed top-0 w-[220px] lg:w-[280px]   h-screen bg-[#2A52BE] h-screen transition-all	z-40  ${nav ? 'left-0  ' : 'left-[-220px] lg:left-[-280px] '} z-50`} >
        <div class="py-4 overflow-y-auto ">
          {user && user !== undefined && <Navbar rol={user.rol} />}
        </div>
      </div>

      {nav && <div className='fixed top-0 left-0 w-screen h-screen bg-[#000000C2] z-40' onClick={() => setNav(false)}></div>}
      {introClientVideo && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={handlerClientVideo}></div>}
      {whatsapp && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={handlerWhatsapp}></div>}
      {search && <div className='fixed top-0 left-0 w-screen h-screen bg-[#ffffff00] z-40' onClick={() => setSearch(false)}></div>}

      <main className={`relative min-w-screen  lg:pb-0  lg:min-w-auto my-[0px]  lg:bg-blue-50 lg:min-h-screen  ${nav ? 'w-screen pl-[220px] lg:pl-[280px] ' : '  lg:px-[0px]'}`} onClick={() => setNav(false)} style={{ transition: 'all 0.5' }}>
        {/* <img src="/bg.png" className='fixed bottom-[60px] lg:bottom-0 right-[20px] w-[60vw] lg:w-[40vw]' alt="" /> */}
        <nav className="w-screen fixed top-0 border-b border-gray-200 shadow-sm flex items-center justify-between bg-[#2A52BE]  p-4 h-[70px] z-30" onClick={() => setNav(false)}>
          {pathname !== '/Cliente' && <div className='flex  hidden lg:block'>
            <div className='flex '>
              <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg hidden lg:block" onClick={openNav}>
                <svg className="w-9 h-9 text-white" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
              </button>
              <h1 className='text-[18px] hidden lg:flex lg:justify-between ml-5 lg:w-[240px] lg:items-center text-white font-medium'> <img src="/logo-circle.png" className='h-[50px] w-[50px]' alt="" /> <span className='font-medium'>PRECIO JUSTO SRL</span></h1>
            </div>
          </div>

          }
          {pathname === '/Cliente' ?
            <div className='flex '>
              <button type="button" className="inline-flex items-center p-2 text-[14px] text-white rounded-lg  " onClick={openNav}>
                <svg className="w-9 h-9 text-gray-900" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
              </button>
              <h1 className='text-[18px] hidden lg:flex lg:justify-between ml-5 lg:w-[240px] lg:items-center text-white font-medium'> <img src="/logo-circle.png" className='h-[50px] w-[50px]' alt="" /> <span className='font-medium'>PRECIO JUSTO SRL</span></h1>
            </div>
            :
            <button type="button" className="inline-flex items-center lg:hidden p-2 text-[14px] text-white rounded-lg  dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => back(!nav)}>
              <svg width="19" height="34" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 32L2 17L17 2" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>}

          {pathname === '/Cliente' && <div className="relative lg:min-w-[500px]">
            <div className="absolute inset-y-0 right-[5px] flex items-center py-3 z-50 ">
              <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" onChange={handlerFilter} className="block w-full bg-white rounded-full lg:min-w-[400px] p-2 pl-10 text-[14px] text-gray-950 text-center border-b border-gray-300  bg-transparent focus:ring-white focus:border-white focus:outline-transparent" placeholder="Buscar producto..." />
          </div>}

          {user && user !== undefined && user.rol !== 'Distribuidor' && pathname === '/Cliente' && <Cart />}
        </nav>







        {search
          && filter.length > 0
          && distributorPDB !== null
          && distributorPDB !== undefined && <div className='w-[100vw] max-w-[800px] fixed top-[70px] left-0 right-0 mx-auto border-[2px] border-white max-h-[40vh] overflow-y-auto z-30 bg-white'>
            {search
              && filter.length > 0
              && distributorPDB !== null
              && distributorPDB !== undefined
              && distributorPDB.filter((obj, index) => index === distributorPDB.findIndex(o => obj['nombre de producto 1'] === o['nombre de producto 1'])).sort(sortArray).filter((i, index) => {
                if (i['nombre de producto 1'].toLowerCase().includes(filter.toLowerCase())) { return i}
                if (i['nombre de producto 2'] && i['nombre de producto 2'].toLowerCase().includes(filter.toLowerCase())) { return i}
                if (i['nombre de producto 3'] && i['nombre de producto 3'].toLowerCase().includes(filter.toLowerCase())) { return i}}
              ).map((i, index)=><div className={`w-full text-[12px] px-5 py-2 ${(index + 1) % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto', }} onClick={() => handlerSearchFilter(i['nombre de producto 1'])}>
              <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <div className='pl-5'>{i['nombre de producto 1'] && i['nombre de producto 1']}</div>
            </div>)}
          </div>}











        <div className="lg:px-[50px] pt-[85px] pb-[65px] md:pt-[85px] md:pb-5 h-screen overflow-y-auto">
          <VideoClient />
          {children}
        </div>
        {user && user !== undefined && <div className="fixed bottom-0  z-40 w-full h-[65px] bg-[#2A52BE] rounded-t-[40px] border-t-[1px] border-gray-50 border- lg:hidden">
          <BottomNavigation rol={user.rol} />
        </div>}
        {/* {user && user !== undefined && <div className="fixed bottom-0  z-30 w-full h-[65px] bg-gray-50 border-t-8 border-white rounded-t-[40px] lg:hidden">
          <BottomNavigation rol={user.rol} />
        </div>} */}
      </main>
      {/* <Whatsapp /> */}
    </div>
  )
}






export default Home


        {/* {search
          && filter.length > 0
          && distributorPDB !== null
          && distributorPDB !== undefined && <div className='w-[100vw] max-w-[800px] fixed top-[70px] left-0 right-0 mx-auto border-[2px] border-white max-h-[40vh] overflow-y-auto z-30 bg-white'>
            {search
              && filter.length > 0
              && distributorPDB !== null
              && distributorPDB !== undefined
              && distributorPDB.filter((obj, index) => index === distributorPDB.findIndex(o => obj['nombre de producto 1'] === o['nombre de producto 1'])).sort(sortArray).map((i, index) => {
                // return (`${i['nombre de producto 1']} ${i['nombre de producto 2'] !== undefined && i['nombre de producto 2'] !== null && i['nombre de producto 2']} ${i['nombre de producto 3'] !== undefined && i['nombre de producto 3'] !== null && i['nombre de producto 3']}`).toLowerCase().includes(filter)

                if (i['nombre de producto 1'].toLowerCase().includes(filter.toLowerCase())) {
                  return <div className={`w-full text-[12px] px-5 py-2 ${(index + 1) % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto', }} onClick={() => handlerSearchFilter(i['nombre de producto 1'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 1']}</div>
                  </div>
                }
                if (i['nombre de producto 2'] && i['nombre de producto 2'].toLowerCase().includes(filter.toLowerCase())) {
                  return <div className={`w-full text-[12px] px-5 py-2 ${(index + 1) % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto', }} onClick={() => handlerSearchFilter(i['nombre de producto 2'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 2'] && i['nombre de producto 2']}</div>
                  </div>
                }
                if (i['nombre de producto 3'] && i['nombre de producto 3'].toLowerCase().includes(filter.toLowerCase())) {
                  return <div className={`w-full text-[12px] px-5 py-2 ${(index + 1) % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} style={{ display: 'grid', gridTemplateColumns: '30px auto', }} onClick={() => handlerSearchFilter(i['nombre de producto 3'])}>
                    <svg className="w-8 h-8 text-white " aria-hidden="true" fill="text-gray-100" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#2A52BE" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <div className='pl-5'>{i['nombre de producto 3'] && i['nombre de producto 3']}</div>
                  </div>
                }

              }
              )}
          </div>} */} 