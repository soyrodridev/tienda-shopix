import React from 'react'
import style from '@/styles/index.module.css'
import Image from 'next/image'
import BotonCategory from './BotonCategory'
import Link from 'next/link'
function Inicio() {
  return (
    <>
    <section className={style.container}>
        <div className={style.textcontain}>
            <h1>Tenemos todo lo que buscas</h1>
            <p>Encontra lo mejor al mejor precio!</p>
        </div>
        <BotonCategory />
        <div className={style.flex}>
            <div className={style.imagecard}>
          <Link href={`/productos/category/${encodeURIComponent("women's clothing")}`}>
                <Image src="https://images.pexels.com/photos/1559920/pexels-photo-1559920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='banner ropa'
                width={100}
                height={200}
                layout="responsive"
                className={style.banner}
                />
          </Link>
                <h2>Todo lo nuevo lo tenemos aca!</h2>
            </div>
          <div className={style.imagecard}>
          <Link href={`/productos/category/${encodeURIComponent("men's clothing")}`}>
              <Image src="https://images.pexels.com/photos/775279/pexels-photo-775279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='banner ropa'
              width={100}
              height={200}
              layout="responsive"
              className={style.banner}
              />
              </Link>
              <h2>Todo lo nuevo lo tenemos aca!</h2>
          </div>
        </div>
        <h2 className={style.title}>Productos Gaming</h2>
        <p className={style.subtitle}>Contamos con una gran variedad de productos Gaming</p>
        <Link href={"/productos/category/electronics"}>
          <Image src="https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='Imagen Gaming' width={100} height={100} layout="responsive" className={style.imagegame}/>
        </Link>
    </section>
    </>
  )
}

export default Inicio