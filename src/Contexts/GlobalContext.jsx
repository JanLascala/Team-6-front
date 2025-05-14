import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const url = `http://localhost:3000/api/vinyls`;
    const [vinyls, setVinyls] = useState({
        state: "loading"
    });
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    /* useEffect per salvare il carrello nel local storage */
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);


    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

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

        setVinyls(prevVinyls => {
            if (prevVinyls.state !== "success") return prevVinyls;

            return {
                ...prevVinyls,
                vinyl_data: prevVinyls.vinyl_data.map(v =>
                    v.slug === vinyl.slug
                        ? { ...v, nAvailable: v.nAvailable - 1 }
                        : v
                )
            };
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


    useEffect(() => {
        if (vinyls.state === "success" && vinyls.vinyl_data) {
            setCart(prevCart =>
                prevCart.filter(cartItem => {
                    const vinyl = vinyls.vinyl_data.find(v => v.slug === cartItem.slug);
                    return vinyl && vinyl.nAvailable > 0;
                })
            );
        }
    }, [vinyls]);

    const removeFromCart = (slug) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(item => item.slug !== slug);
            console.log("Articolo rimosso:", slug, "Nuovo carrello:", newCart); // Log per debug
            if (newCart.length === 0) {
                localStorage.removeItem('cart');
            }
            return newCart;
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
                setVinyls({
                    state: "success",
                    vinyl_data: data
                });
            })
            .catch(err => {
                setVinyls({
                    state: "error",
                    message: `error type: ${err}`
                });
            });
    }, []);

    const clearCartAfterPayment = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
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
                clearCartAfterPayment,
                isCartOpen,
                setIsCartOpen,
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
