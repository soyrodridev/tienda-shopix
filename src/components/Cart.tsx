import React, { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContext';
import Cartcss from '@/styles/Cart.module.css';
import Image from 'next/image';
import basura from '@/assets/img/recycle-bin (2).png';
import más from '@/assets/img/button.png';
import Link from 'next/link';

type Producto = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  cantidad: number;
};

export default function Cart(): JSX.Element {
  //@ts-ignore
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  const saveCartToLocalStorage = (cartData: any) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const productosConCantidad = cart.products.map((producto: Producto) => ({
    ...producto,
    cantidad: producto.cantidad || 1,
  }));

  const handleIncrement = (productId: number) => {
    const existeIndexProducto = cart.products.findIndex((p: { id: any }) => p.id === productId);

    if (existeIndexProducto !== -1) {
      const productoActual = cart.products[existeIndexProducto];
      const cantidadAntes = Number(productoActual.cantidad) || 1;

      if (!isNaN(cantidadAntes)) {
        cart.products[existeIndexProducto].cantidad = cantidadAntes + 1;

        const precioBase = productoActual.price / cantidadAntes;

        cart.products[existeIndexProducto].price = Number((precioBase * cart.products[existeIndexProducto].cantidad).toFixed(2));
      }
    }

    const nuevoTotal = Number(cart.products.reduce((total: any, producto: { price: any }) => total + producto.price, 0).toFixed(2));

    setCart({ ...cart, totalPrice: nuevoTotal });
    saveCartToLocalStorage({ ...cart, totalPrice: nuevoTotal });
  };

  const handleDelete = (productId: number) => {
    const existeIndexProducto = cart.products.findIndex((p: { id: any }) => p.id === productId);

    if (existeIndexProducto !== -1) {
      const productoActual = cart.products[existeIndexProducto];
      const cantidadAntes = Number(productoActual.cantidad) || 1;

      let actualizarProductos;

      if (cantidadAntes > 1) {
        actualizarProductos = [...cart.products];
        actualizarProductos[existeIndexProducto] = {
          ...productoActual,
          cantidad: cantidadAntes - 1,
          price: Number((productoActual.price / cantidadAntes * (cantidadAntes - 1)).toFixed(2)),
        };
      } else {
        actualizarProductos = cart.products.filter((producto: Producto) => producto.id !== productId);
      }

      const nuevoTotal = Number(actualizarProductos.reduce((total: any, producto: { price: any }) => total + producto.price, 0).toFixed(2));

      setCart({ ...cart, products: actualizarProductos, totalPrice: nuevoTotal });
      saveCartToLocalStorage({ ...cart, products: actualizarProductos, totalPrice: nuevoTotal });
    }
  };

  const handleComprar = () => {
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = "/facturacion";
  };

  if (cart.products.length === 0) {
    return <p className={Cartcss.cart}>El carrito está vacío.</p>;
  }

  return (
    <div className={Cartcss.cart}>
      <h2 className={Cartcss.h2}>Carrito de compras</h2>
      <ul>
        {productosConCantidad.map((producto: Producto) => (
          <li className={Cartcss.li} key={producto.id}>
            <div className={Cartcss.Container}>
              <Image className={Cartcss.image} src={producto.image} alt='foto no disponible' width={15} height={15} />
              <h2 className={Cartcss.title}>{producto.title}</h2>
            </div>
            <div className={Cartcss.ContainerPrecioCantidad}>
              <div className={Cartcss.ContainerPrice}>
                <h3>Precio: ${producto.price}</h3>
                <p>Cantidad: {producto.cantidad}</p>
              </div>
              <div className={Cartcss.ContainerButtons}>
                <button className={Cartcss.button} onClick={() => handleIncrement(producto.id)}>
                  <Image src={más} alt='foto no disponible' /></button>
                <button className={Cartcss.button} onClick={() => handleDelete(producto.id)}>
                  <Image src={basura} alt='foto no disponible' />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={Cartcss.ContainerComprar}>
        <p className={Cartcss.Total}>Total: ${cart.totalPrice}</p>
        <button className={Cartcss.Comprar} onClick={handleComprar}>
          Comprar
        </button>
      </div>
    </div>
  );
}
