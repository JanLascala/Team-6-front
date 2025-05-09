import { useGlobalContext } from "../Contexts/GlobalContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useGlobalContext();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const canIncrement = (item) => {
        return item.quantity < item.nAvailable;
    };

    if (cart.length === 0) {
        return (
            <div className="container py-5">
                <h2>Your cart is empty.</h2>
                <Link to="/" className="btn btn-primary mt-3">Torna ai prodotti</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2>Cart</h2>
            <ul className="list-group mb-3">
                {cart.map(item => (
                    <li key={item.slug} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column flex-md-row gap-3 w-100">
                            <div style={{ width: '200px', flexShrink: 0 }}>
                                <img
                                    src={item.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                                    }}
                                    alt={item.title}
                                    className="img-fluid rounded"
                                    style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                                />
                            </div>

                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5>{item.title}</h5>
                                        <p className="text-muted">{item.authorName}</p>
                                    </div>
                                    <div className="text-end">
                                        <span className="fs-5">€ {(item.price * item.quantity).toFixed(2)}</span>
                                        <p className="small text-muted mb-0">€ {item.price.toFixed(2)} each</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3 mt-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => decrementQuantity(item.slug)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <i className="bi bi-dash-lg"></i>
                                        </button>

                                        <span className="px-2">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => incrementQuantity(item.slug)}
                                            disabled={!canIncrement(item)}
                                        >
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-dark ms-3"
                                        onClick={() => removeFromCart(item.slug)}
                                    >
                                        <i className="bi bi-trash"></i> Rimuovi
                                    </button>
                                </div>

                                {canIncrement(item) ? (
                                    <p className="small mt-2 mb-0">
                                        Available: {item.nAvailable - item.quantity}
                                    </p>
                                ) : (
                                    <p className="text-warning small mt-2 mb-0">
                                        You have reached the maximum quantity available
                                    </p>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">Total:</h4>
                        <h4 className="mb-0">€ {total.toFixed(2)}</h4>
                    </div>
                    <Link to='/checkout'>
                        <button className="btn btn-success btn-sm w-100 mt-4">
                            Go to Checkout <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}