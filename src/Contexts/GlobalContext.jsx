import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

export default GlobalContext;
function GlobalProvider({ children }) {

    const url = `http://localhost:3000/api/vinyls`
    const [vinyls, setVinyls] = useState({
        state: "loading",
        vinyl_data: [],
        message: ""
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
                addToCart
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