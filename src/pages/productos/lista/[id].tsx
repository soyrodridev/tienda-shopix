import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Nav from '@/components/nav/Nav';
import style from '@/styles/detalleproducto.module.css';
import { CartContext } from '@/context/CartContext';
import Footer from '@/components/Footer';

interface Producto {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  cantidad: 1;
}

const DetalleDelProducto: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [producto, setProducto] = useState<Producto | null>(null);
  
  //@ts-ignore
  const { cart, setCart } = useContext(CartContext);
  
  useEffect(() => {
    const obtenerDetalleProducto = async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const datos = await res.json();
        setProducto(datos);
    };
    if (id) {
      obtenerDetalleProducto();
    }
  }, [id]);
  if (!producto) {
    return <p>Cargando...</p>;
  }


  return (
    <>
      <Nav />
      <section className={style.container}>
        <div className={style.containerImage}>
        <Image src={producto.image} alt={`Foto de ${producto.title}`} width={200} height={200} className={style.imageproduct} />
        </div>
          <section className={style.textcontain}>
          <h1 className={style.titulo}>{producto.title}</h1>
          <h2 className={style.categoria}>{producto.category}</h2><span> ${ producto.price }</span>
          <p>{producto.description}</p>

          <button onClick={() => {
            setCart({
              products: [...cart.products, producto],
              totalPrice: cart.totalPrice + producto.price, 
            })
          }}
          className={style.btn}>
            Agregar al carrito
          </button>
        </section>
      </section>
      <Footer />
      </>
  );
};

export default DetalleDelProducto;