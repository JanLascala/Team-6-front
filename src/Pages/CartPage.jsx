import { useState, useEffect } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ onClose }) {
    const {
        cart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        getVinylAvailability
    } = useGlobalContext();
    const navigate = useNavigate();
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

    // Calcola il totale solo per gli item ancora disponibili
    const availableItems = cart.filter(item => getVinylAvailability(item.slug) > 0);
    const total = availableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Funzione per ottenere la disponibilità aggiornata
    const getCurrentAvailability = (slug) => getVinylAvailability(slug);

    const checkAvailability = async () => {
        setIsCheckingAvailability(true);
        try {
            const response = await fetch("http://localhost:3000/api/vinyls");
            const freshVinyls = await response.json();

            const outOfStockItems = cart.filter(cartItem => {
                const freshItem = freshVinyls.find(v => v.slug === cartItem.slug);
                return !freshItem || freshItem.nAvailable === 0;
            });

            if (outOfStockItems.length > 0) {
                outOfStockItems.forEach(item => removeFromCart(item.slug));
            }

            return outOfStockItems.length === 0;
        } catch (error) {
            console.error("Errore nel controllo disponibilità:", error);
            return true;
        } finally {
            setIsCheckingAvailability(false);
        }
    };

    const handleCheckout = async () => {
        const allAvailable = await checkAvailability();

        if (allAvailable && cart.length > 0) {
            onClose();
            navigate('/checkout');
        } else if (cart.length === 0) {
            alert("Il tuo carrello è vuoto!");
        } else {
            alert("Alcuni articoli nel carrello non sono più disponibili. Sono stati rimossi automaticamente.");
        }
    };

    useEffect(() => {
        const timer = setInterval(async () => {
            await checkAvailability();
        }, 30000);
        return () => clearInterval(timer);
    }, [cart]);

    useEffect(() => {
        const outOfStockItems = cart.filter(item => getVinylAvailability(item.slug) === 0);
        if (outOfStockItems.length > 0) {
            outOfStockItems.forEach(item => removeFromCart(item.slug));
            alert(`${outOfStockItems.length} articolo/i esaurito/i è stato rimosso automaticamente dal carrello`);
        }
    }, [cart]);

    return (
        <div id="cart-container">
            <h4>Cart</h4>
            {availableItems.length === 0 ? (
                <p>Il tuo carrello è vuoto</p>
            ) : (
                <>
                    <ul className="cart-items-container">
                        {availableItems.map(item => {
                            const currentAvailable = getCurrentAvailability(item.slug);

                            return (
                                <li key={item.slug} className="list-group">
                                    <div className="d-flex gap-3">
                                        <img
                                            src={item.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                                            }}
                                            alt={item.title}
                                            className="card-img-top img-fluid"
                                            style={{ objectFit: 'contain', height: '200px' }}
                                        />

                                        <div className="flex-grow-1">
                                            <h5>{item.title}</h5>
                                            <p>{item.authorName}</p>
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => decrementQuantity(item.slug)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <i className="bi bi-dash-lg"></i>
                                                </button>

                                                <span className="px-2">{item.quantity}</span>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => incrementQuantity(item.slug)}
                                                    disabled={item.quantity >= currentAvailable}
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                </button>

                                                <button
                                                    className="btn btn-outline-danger btn-sm ms-2"
                                                    onClick={() => removeFromCart(item.slug)}
                                                    title="Rimuovi dal carrello"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                            <p>
                                                {getVinylAvailability(item.slug) > 0
                                                    ? `${getVinylAvailability(item.slug)} disponibili`
                                                    : "Esaurito"}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="modal-footer">
                        <h5>otal: € {total.toFixed(2)}</h5>
                        <button
                            className="btn btn-success w-100 mt-2"
                            onClick={handleCheckout}
                            disabled={isCheckingAvailability || availableItems.length === 0}
                        >
                            {isCheckingAvailability ? 'Verifica disponibilità...' : 'Go to Checkout →'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}