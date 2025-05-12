import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const url = `http://localhost:3000/api/vinyls`;
    const [vinyls, setVinyls] = useState({
        state: "loading"
    });
    const [cart, setCart] = useState([]);

    const addToCart = (vinyl) => {
        if (vinyl.nAvailable === 0) {
            alert("Questo vinile è esaurito!");
            return;
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.slug === vinyl.slug);

            if (existingItem && existingItem.quantity >= existingItem.nAvailable) {
                alert(`You have reached the maximum quantity available (${vinyl.nAvailable})`);
                return prevCart;
            }

            return existingItem
                ? prevCart.map(item =>
                    item.slug === vinyl.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prevCart, { ...vinyl, quantity: 1, nAvailable: vinyl.nAvailable }];
        });
    };

    const incrementQuantity = (slug) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.slug === slug) {
                    if (item.quantity >= item.nAvailable) {
                        alert("You have reached the maximum quantity available!");
                        return item;
                    }
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };

    const decrementQuantity = (slug) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.slug === slug
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (slug) => {
        setCart(prevCart => prevCart.filter(item => item.slug !== slug));
    };

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setVinyls({
                    state: "success",
                    vinyl_data: data
                })
            })
            .catch(err => {
                console.error(err)
                setVinyls({
                    state: "error",
                    message: `error type: ${err}`
                })
            })
    }, []);


    const clearCartAfterPayment = () => {
        setCart([]);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <GlobalContext.Provider
            value={{
                vinyls,
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                clearCart,
                clearCartAfterPayment // Aggiungi la funzione per svuotare il carrello
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobalContext };
