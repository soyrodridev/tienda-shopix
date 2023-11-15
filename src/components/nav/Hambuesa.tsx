import React from 'react'
import Link from 'next/link'
import style from '@/styles/menu.module.css'
function Hambuesa() {
  return (
    <>
    <ul className={style.listmenu}>
        <li> <Link className={style.linkmenu} href={"/"}>Inicio</Link> </li>
        <li> <Link className={style.linkmenu} href={"/productos"}>Productos</Link> </li>
        <li> <Link className={style.linkmenu} href={"/auth/login"}>Iniciar Sesión</Link> </li>
        <li> <Link className={style.linkmenu} href={"/auth/login"}>Registrarse</Link> </li>
    </ul>
    </>
  )
}

export default Hambuesa