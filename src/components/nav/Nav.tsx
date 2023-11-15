import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '@/styles/navar.module.css';
import search from '@/assets/img/search.png';
import setting from '@/assets/img/setting.png';
import carrito from '@/assets/img/shopping-cart (3).png';
import Cart from '../Cart';
import Hamburgesa from './Hambuesa';
import Link from 'next/link';
import css from '@/styles/productos.module.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Nav() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [mostrarmenu, setMostrarmenu] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const apiUrl = 'https://fakestoreapi.com/products';



    const handleClick = () => {
      setMostrarmenu(!mostrarmenu)
    }
  

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  

const handleSearch = async () => {
  try {
    const response = await fetch(`${apiUrl}?title=${searchTerm}`);
    const data = await response.json();

    const filteredResults = data.filter((producto: Product) =>
      producto.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  } catch (error) {
    console.error('Error al buscar productos:', error);
  }
};

  return (
    <div>
      <nav className={style.navbarcontainer}>
        {searchVisible && (
          <div className={css.searchContainer}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={css.searchInput}
            />
            <button className={css.searchButton} onClick={handleSearch}>Buscar</button>
          </div>
        )}

        <button onClick={handleSearchToggle}>
          <Image src={search} alt="foto no disponible" className={style.buscador} />
        </button>

        <div>
      <button onClick={handleClick}>
        <Image src={setting} alt="foto no disponible" className={style.menu} />
      </button>

      {mostrarmenu && <Hamburgesa />}
    </div>

        <button onClick={handleCartToggle}>
          <Image src={carrito} alt="Cart Icon" className={style.carrito} />
        </button>
      </nav>

      {cartOpen && <Cart />}

      {searchResults.length > 0 && (
        <>
          <div className={css.gridcontainer}>
        {searchResults.map((producto) => (
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
        </>
      )}
    </div>
  );
}