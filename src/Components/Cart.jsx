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
            <div className="text-dark" style={{ padding: "40px 0 0 0" }}>
                <h4>Your cart is empty</h4>
            </div>
        );
    }

    return (
        <div id="cart-container" className="m-0 p-0 position-absolute bottom-0 text-dark" style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            maxHeight: "80vh"
        }}>
            <h4 className="mb-0">Cart</h4>

            <div style={{ flexGrow: 1, overflowY: "auto" }}>
                <ul className="list-group mb-0">
                    {cart.map(item => (
                        <li key={item.slug} className="list-group-item py-2">
                            <div className="d-flex align-items-center gap-2">
                                <img
                                    src={item.vinylImg || 'https://picsum.photos/300/200'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://picsum.photos/300/200';
                                    }}
                                    alt={item.title}
                                    className="img-fluid"
                                    style={{ objectFit: 'cover', height: '60px', width: '60px' }}
                                />

                                <div className="flex-grow-1">
                                    <h6 className="mb-0">{item.title}</h6>
                                    <small className="text-muted">{item.authorName}</small>
                                    <div className="d-flex align-items-center mt-1 gap-3">
                                        <div className="me-auto">€ {item.price.toFixed(2)}</div>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => item.quantity > 0 ? decrementQuantity(item.slug) : removeFromCart(item.slug)}
                                            >
                                                <i className="bi bi-dash"></i>
                                            </button>

                                            <span className="btn btn-outline-dark disabled px-2">{item.quantity}</span>

                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => incrementQuantity(item.slug)}
                                                disabled={item.quantity >= item.nAvailable}
                                            >
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
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
            </div>

            <div className="p-3 pt-2 mt-auto border-top">
                <h5>Subtotal: € {total.toFixed(2)}</h5>
                <button className="btn btn-checkout w-100 mt-2" onClick={handleCheckout}>
                    Go to Checkout →
                </button>
            </div>
        </div>
    );
}
