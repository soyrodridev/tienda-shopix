import Link from 'next/link'
import style from "@/styles/reglog.module.css"
import React, { FormEvent, useRef } from "react";
function FormRegister() {

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    async function mandarDatosDeRegistro(evento: FormEvent) {
      evento.preventDefault()
  
      const datosAEnviar = {
        //@ts-ignore
      nombre: nameRef.current?.value, 
      //@ts-ignore
      email: emailRef.current?.value,
      //@ts-ignore
      password: passwordRef.current?.value,
      }
  
      console.log(datosAEnviar)
  
  
      const respuesta = await fetch("http://localhost:3000/api/usurios/register", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(datosAEnviar)
      });
  
  
      if (!respuesta.ok) {
        const errorHtml = await respuesta.text();
        console.error(`Error en la solicitud: ${errorHtml}`);
        return; 
      }
  
  
      const token = await respuesta.json()
  
      console.log(token)
    }

  return (
    <section className={style.container}>
        <h1 className={style.title}>Registrate</h1>
        <form className={style.formcontain} onSubmit={async (e) => await mandarDatosDeRegistro(e)}>
            {/* Form Group */}
            <div className={style.formgroup}>
                <label htmlFor="fullname">
                    Nombre y Apellido
                </label>
                <input type="text" ref={nameRef} placeholder='Nombre y Apellido' id='fullname' />
            </div>
            {/* Fin Form Group */}
            {/* Form Group */}
            <div className={style.formgroup}>
                <label htmlFor="email">
                    Email
                </label>
                <input type="text" ref={emailRef} placeholder='ejemplo@ejemplo.com' id='email' />
            </div>
            {/* Fin Form Group */}
            {/* Form Group */}
            <div className={style.formgroup}>
                <label htmlFor="password">
                    Contraseña
                </label>
                <input type="text" ref={passwordRef} placeholder='*******' id='password' />
            </div>
            {/* Fin Form Group */}

            <button type='submit' className={style.btn}>Resgitrar</button>
            <Link href={'/auth/login'}className={style.tengocuenta}>Ya tengo una cuenta</Link>
        </form>
    </section>
  )
}

export default FormRegister