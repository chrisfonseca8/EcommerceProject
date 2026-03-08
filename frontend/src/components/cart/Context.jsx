import { useState, useEffect, createContext, useContext } from "react";

export const CartContext = createContext({
    cartItems: [],
    addToCart: (productId, quantity, ProductName, size, price) => { },
    removeFromCart: (productId, size) => { },
    clearCart: () => { },
    updateCounter: (productId, size, newCount) => { },

})

export const GettingCartContext = () => {
    return useContext(CartContext);
}

export const CartContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {

        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];

    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (productId, quantity, ProductName, size, price) => {

        setCartItems((prev) => {

            const existingItem = prev.find(
                (item) => item.productId === productId && item.size === size
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prev,
                { productId, quantity, ProductName, size, price }
            ];
        });
    }


    const removeFromCart = (productId, size) => {
        setCartItems((prev) => (
            prev.filter(
                (item) => !(item.productId === productId && item.size === size)
            )
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    }

    const updateCounter = (productId, size, newCount) => {
        setCartItems((prev) => (
             prev.map((item)=>
           item.productId===productId&&item.size===size
        ? {...item,quantity:newCount}
        : item)
        ))
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateCounter
            }}
        >
            {children}
        </CartContext.Provider>
    );
}