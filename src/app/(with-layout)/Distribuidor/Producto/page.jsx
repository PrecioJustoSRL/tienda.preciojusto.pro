'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'


function Home() {

    const router = useRouter()


    function seeMore() {
        router.push('/Producto')
    }


    return (
        <main className=" w-full  flex flex-col justlfy-center  items-center ">
            <Subtitle htmlFor="">Categorias</Subtitle>
            <div className="flex flex-wrap justify-between">
                <Tag styled='tagPrimary'>Los mas recientes</Tag>
                <Tag styled='tagSecondary'>En oferta</Tag>
                <Tag styled='tagSecondary'>Recientes</Tag>
                <Tag styled='tagSecondary'>Otros</Tag>
            </div>
            <br />
            <div class="w-[70%] max-w-[350px] bg-white border border-gray-200 rounded-lg shadow">
                <p className="flex justify-between p-5">
                    <span>Cartera</span><span className="text-red-500">Bs 100</span>
                </p>
                <img src="/cartera.svg" alt="" />
                <div>
                    <Button theme='Primary' styled='miniButtonSecondaryGreen' click={seeMore}>Ver +</Button>
                    <Button theme='Success' click={seeMore}>Comprar</Button>
                </div>
                <span>Nombre de la empresa</span>
            </div>
        </main>
    )
}

export default  WithAuth(Home)