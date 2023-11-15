import { useContext } from 'react';
import style from "@/styles/botoncategory.module.css"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function BotonCategory() {
  const router = useRouter()

  function hombre(){
    router.push(`/productos/category/${encodeURIComponent("men's clothing")}`)
  }
  function mujer(){
    router.push(`/productos/category/${encodeURIComponent("women's clothing")}`)
  }
  function joyeria(){
    router.push("/productos/category/jewelery")
  }
  function gaming(){
    router.push("/productos/category/electronics")
  }

  return (
    <>
      <div className={style.botoncontainers}>
        <button onClick={hombre} className={style.boton}>
          Hombres
        </button>
        <button onClick={mujer} className={style.boton}>
          Mujeres
        </button>
          <button onClick={joyeria} className={style.boton}>
            Joyería
          </button>
        <button onClick={gaming} className={style.boton}>
          Gaming
        </button>
      </div>
    </>
  );
}

export default BotonCategory;
