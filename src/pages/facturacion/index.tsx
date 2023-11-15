import Nav from "@/components/nav/Nav";
import style from "@/styles/facturacion.module.css";
import React, { FormEvent, useRef, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Cart from "@/components/Cart";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

function DatosDeFacturacion() {
  const router = useRouter();
  const  cart  = useContext(CartContext);
  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const calleRef = useRef<HTMLInputElement>(null);
  const alturaRef = useRef<HTMLInputElement>(null);
  const cpostalRef = useRef<HTMLInputElement>(null);
  const provinciaRef = useRef<HTMLInputElement>(null);
  const localidadRef = useRef<HTMLInputElement>(null);
  const dniRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);

  async function enviarDatosDeFacturacion(evento: FormEvent) {
    evento.preventDefault();

    const datosAEnviar = {
      nombre: nombreRef.current?.value,
      apellido: apellidoRef.current?.value,
      calle: calleRef.current?.value,
      altura: Number(alturaRef.current?.value),
      cpostal: Number(cpostalRef.current?.value),
      provincia: provinciaRef.current?.value,
      localidad: localidadRef.current?.value,
      dni: Number(dniRef.current?.value),
      email: emailRef.current?.value,
      telefono: Number(telefonoRef.current?.value),
    };

    const respuesta = await fetch("http://localhost:3000/api/facturacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAEnviar),
    });

    if (respuesta.status !== 201) {
      const error = await respuesta.json();
      alert(error.msg);
    } else {
      // Después de enviar los datos de facturación, realizar la llamada a MercadoPago
      handleComprar();
    }
  }

  const handleComprar = async () => {
    const facturacion = {
      nombre: nombreRef.current?.value,
      apellido: apellidoRef.current?.value,
      calle: calleRef.current?.value,
      altura: Number(alturaRef.current?.value),
      cpostal: Number(cpostalRef.current?.value),
      provincia: provinciaRef.current?.value,
      localidad: localidadRef.current?.value,
      dni: Number(dniRef.current?.value),
      email: emailRef.current?.value,
      telefono: Number(telefonoRef.current?.value),
    };

    const productosEnCarrito = cart?.products ?? [];
    const producto = productosEnCarrito.length > 0 ? productosEnCarrito[0] : null;

    try {
      const respuestaMercadoPago = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facturacion, producto }),
      });

      if (respuestaMercadoPago.status === 200) {
        const responseData = await respuestaMercadoPago.json();
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${responseData.global}`;
      } else {
        const error = await respuestaMercadoPago.json();
        alert(error.global);
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };
  return (
    <>
      <Nav />
        <div className={style.container}>
          <h1>Ingresa datos de facturacion</h1>
          <form className={style.form} method="post" onSubmit={async (e) => await enviarDatosDeFacturacion(e)}>
            <div className={style.flexrow}>
              <div className={style.formgroup}>
                <label htmlFor="nombre">Nombre(s)</label>
                <input
                  type="text"
                  ref={nombreRef}
                  name=""
                  placeholder="Nombre"
                  id="nombre"
                  required
                />
              </div>
              <div className={style.formgroup}>
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  ref={apellidoRef}
                  name=""
                  placeholder="Apellido"
                  id="apellido"
                  required
                />
              </div>
            </div>
            <div className={style.formgroup}>
              <label htmlFor="dni">N° de documento</label>
              <input
                type="text"
                minLength={7}
                maxLength={8}
                inputMode="numeric"
                name=""
                ref={dniRef}
                placeholder="12.456.365"
                id="dni"
                required
              />
            </div>
            <h2 className={style.envio}>Datos de envio</h2>
            <div className={style.flexrow}>
              <div className={style.formgroup}>
                <label htmlFor="calle">Calle</label>
                <input
                  ref={calleRef}
                  type="text"
                  name=""
                  placeholder="calle"
                  id="calle"
                  required
                />
              </div>
              <div className={style.formgroup}>
                <label htmlFor="numerocasa">Altura</label>
                <input
                  type="text"
                  ref={alturaRef}
                  inputMode="numeric"
                  name=""
                  placeholder="1975"
                  id="numerocasa"
                  required
                />
              </div>
            </div>
            <div className={style.formgroup}>
              <label htmlFor="codepostal">Codigo Postal</label>
              <input
                type="text"
                name=""
                ref={cpostalRef}
                inputMode="numeric"
                minLength={4}
                maxLength={5}
                placeholder="1975"
                id="codepostal"
                required
              />
            </div>
            <div className={style.flexrow}>
              <div className={style.formgroup}>
                <label htmlFor="provincia">Provincia</label>
                <input
                  type="text"
                  ref={provinciaRef}
                  name=""
                  placeholder="Buenos Aires"
                  id="provincia"
                  required
                />
              </div>
              <div className={style.formgroup}>
                <label htmlFor="localidad">Localidad</label>
                <input
                  type="text"
                  name=""
                  ref={localidadRef}
                  placeholder="Mar del plata"
                  id="localidad"
                  required
                />
              </div>
            </div>
            <h2 className={style.envio}>Contacto</h2>
            <div className={style.formgroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name=""
                ref={emailRef}
                placeholder="ejemplo@ejemplo.com"
                inputMode="email"
                id="email"
                required
              />
              <small>Te enviaremos el comprobante</small>
            </div>
            <div className={style.formgroup}>
              <label htmlFor="telefono">N° de telefono</label>
              <input
                type="text"
                ref={telefonoRef}
                minLength={10}
                maxLength={11}
                placeholder="1159031584"
                id="telefono"
                inputMode="numeric"
                required
              />
            </div>
            <button type="submit" className={style.btn} onClick={handleComprar}>
              Confirmar
            </button>
          </form>
        </div>
        <Footer />
    </>
    );
  }

export default DatosDeFacturacion;
