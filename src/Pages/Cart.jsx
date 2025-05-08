import { useGlobalContext } from "../Contexts/GlobalContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, incrementQuantity, decrementQuantity } = useGlobalContext();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                        <div>
                            <h5>{item.title}</h5>
                            <p>{item.author}</p>
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-dash-square" role="button" onClick={() => decrementQuantity(item.slug)}></i>
                                <span>{item.quantity}</span>
                                <i className="bi bi-plus-square" role="button" onClick={() => incrementQuantity(item.slug)}></i>
                            </div>
                        </div>
                        <div>
                            <span>€ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <h4>Totale: € {total.toFixed(2)}</h4>
            <button className="btn btn-success mt-3">Go to Checkout</button>
        </div>
    );
}
