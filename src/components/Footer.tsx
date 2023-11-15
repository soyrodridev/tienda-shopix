import React from 'react'
import Link from 'next/link'
import style from '@/styles/footer.module.css'
import Image from 'next/image'
import facebook from '../../public/images/redes/facebook.png'
import instagram from '../../public/images/redes/instagram.png'
import whatsapp from '../../public/images/redes/whatsapp.png'
import telegram from '../../public/images/redes/telegram.png'

function Footer() {
  return (
    <>
    <footer className={style.footer_container}>
            <h2>Shopix</h2>
            <div className={style.list}>
                <ul className={style.listul}>
                    <li>
                        <Link className={style.linkli} href="/about">Acerca de</Link>
                    </li>
                    <li>
                        <Link className={style.linkli} href="/about">Terminos y Condiciones</Link>
                    </li>
                    <li>
                        <Link className={style.linkli} href="/about">Policica de Privacidad</Link>
                    </li>
                </ul>
                <ul className={style.listul}>
                <li>
                        <Link className={style.linkli} href="/about">Devoluciones</Link>
                    </li>
                    <li>
                        <Link className={style.linkli} href="/about">Metodo de pago</Link>
                    </li>
                    <li>
                        <Link className={style.linkli} href="/about">Reclamos</Link>
                    </li>
                </ul>
            </div>
            <div className={style.redes}>
                <h3>Nuestras Redes Sociales</h3>
                <div className={style.pack}>
                    <Image src={facebook} alt='facebook'/>
                    <Image src={instagram} alt='instagram'/>
                    <Image src={telegram} alt='telegram'/>
                    <Image src={whatsapp} alt='whatsapp'/>
                </div>
            </div>
    </footer>
    </>
  )
}

export default Footer