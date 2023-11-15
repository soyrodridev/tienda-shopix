import style from "@/styles/reglog.module.css"
import { useRouter } from 'next/navigation'
import React, { FormEvent, useRef } from 'react'
import Link from 'next/link'

function FormLogin() {
    const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);

  //redirigir
function redirigir(){
  router.push("/home")
}

//Validar Datos
  async function ValidarDatos(evento: FormEvent) {
    evento.preventDefault()

    //Capturar datos
    const datosRecibir = {
      //@ts-ignore
      email: emailRef.current?.value,
      //@ts-ignore
      password: passwdRef.current?.value,
    }
    console.log(datosRecibir)


    const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(datosRecibir)
    });
    if(respuesta.status !== 201){
      const error = await respuesta.json()
      alert(error.msg)
    } else {
      console.log(datosRecibir)
      redirigir()
    } 
  }

  return (
    <section className={style.container}>
        <h1 className={style.title}>Iniciar Sesion</h1>
        <form className={style.formcontain} onSubmit={ValidarDatos}>
            {/* Form Group */}
            <div className={style.formgroup}>
                <label htmlFor="email">
                    Email
                </label>
                <input type="email" ref={emailRef} inputMode='email' placeholder='ejemplo@ejemplo.com' id='email' />
            </div>
            {/* Fin Form Group */}
            {/* Form Group */}
            <div className={style.formgroup}>
                <label htmlFor="password">
                    Contraseña
                </label>
                <input type="password" ref={passwdRef} placeholder='*******' id='password'/>
            </div>
            {/* Fin Form Group */}

            <button type='submit' className={style.btn}>Iniciar Sesion</button>
            <Link href={'/auth/register'}className={style.tengocuenta}>Crear cuenta</Link>
        </form>
    </section>
  )
}

export default FormLogin