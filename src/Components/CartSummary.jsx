import { useGlobalContext } from "../Contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ onClose }) {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useGlobalContext();
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        onClose();
        navigate("/checkout");
    };

    if (cart.length === 0) {
        return (
            <div style={{ padding: "20px" }}>
                <h4>Your cart is empty</h4>
            </div>
        );
    }

    return (
        <div id="cart-container" style={{ padding: "0px", overflowY: "auto" }}>
            <h4>Cart</h4>
            <ul className="list-group mb-3">
                {cart.map(item => (
                    <li key={item.slug} className="list-group-item">
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
                                        className="btn btn-outline-secondary"
                                        onClick={() => decrementQuantity(item.slug)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <i className="bi bi-dash-lg"></i>
                                    </button>

                                    <span className="px-2">{item.quantity}</span>

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => incrementQuantity(item.slug)}
                                        disabled={item.quantity >= item.nAvailable}
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
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div>
                <h5>Total: € {total.toFixed(2)}</h5>
                <button className="btn btn-success w-100 mt-2" onClick={handleCheckout}>
                    Go to Checkout →
                </button>
            </div>
        </div>
    );
}
