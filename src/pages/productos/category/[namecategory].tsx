import Nav from "@/components/nav/Nav";
import Image from "next/image";
import css from "@/styles/productos.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BotonCategory from "@/components/BotonCategory";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

function Category() {
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = window.location.pathname.split("/").pop(); // Extract category from the URL
        const url = `https://fakestoreapi.com/products/category/${category}`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error al obtener datos: ${respuesta.statusText}`);
        }

        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        console.error("Error");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Nav />

      <BotonCategory />
      <div className={css.gridcontainer}>
        {productos.map((producto) => (
          <article className={css.cardcontain} key={producto.id}>
            <Image
              src={producto.image}
              alt={`Foto de ${producto.title}`}
              width={200}
              height={200}
              className={css.imagedit}
            />

            <div className={css.textcontain}>
              <h2 className={css.titulo}>{producto.title}</h2>
              <p className={css.price}>$ {producto.price}</p>
              <Link className={css.btn} href={`../lista/${producto.id}`}>
                Ver más
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Category;
