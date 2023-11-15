import { Children, createContext, useState } from 'react'

let inicialCart = {
    products: [],
    totalPrice: 0,
};

export const CartContext = createContext(inicialCart);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState(inicialCart);

    return (
        //@ts-ignore
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}