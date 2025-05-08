import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

export default GlobalContext;
function GlobalProvider({ children }) {

    const url = `http://localhost:3000/api/vinyls`
    const [vinyls, setVinyls] = useState({
        state: "loading"
    });
    const [cart, setCart] = useState([]);
    const addToCart = (vinyl) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.slug === vinyl.slug);

            if (existingItem) {
                return prevCart.map(item =>
                    item.slug === vinyl.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...vinyl, quantity: 1 }];
            }
        });
    };
    const incrementQuantity = (slug) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.slug === slug
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
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
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                vinyls,
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity
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