import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/Nav';
import css from '@/styles/productos.module.css'
import Link from 'next/link';
import Footer from '@/components/Footer';


type Product ={
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  cantidad: 1;
}

export default function StorePage({ products }: {products:Product[]}) {
  return (
    <>
      <Nav />
        <div className={css.gridcontainer}>
        {products.map((producto) => (
             <article className={css.cardcontain} key={producto.id}>
            <Image
              src={producto.image}
              alt={`Foto de ${producto.title}`}
              width={200}
              height={200}
              layout='resposive'
              className={css.imagedit}
            />

            <div className={css.textcontain}>
              <h2 className={css.titulo}>{producto.title}</h2>
              <p className={css.price}>$ {producto.price}</p>
              <Link className={css.btn} href={`./productos/lista/${producto.id}`}>
                Ver más
              </Link>
            </div>
          </article>
        ))}
        </div>
        <Footer />
    </>
  )
  
}


export async function getServerSideProps(context: any) {
  const res = await fetch("https://fakestoreapi.com/products")
  const products = await res.json();
  
  return {
    props: {
      products,
    }
  }
}
