import { useGlobalContext } from "../Contexts/GlobalContext";

export default function CartSummary() {
    const { cart } = useGlobalContext();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal >= 100 ? 0 : 12;
    const total = subtotal + shippingCost;

    return (
        <div id="order-summary" className="p-3">
            <h4 className="mb-3">Order Summary</h4>

            <ul className="list-group mb-3">
                {cart.map(item => (
                    <li key={item.slug} className="list-group-item py-2 px-0 border-0 border-bottom">
                        <div className="d-flex align-items-center">
                            <img
                                src={item.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                                }}
                                alt={item.title}
                                className="me-2"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />

                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="mb-0 fw-bold text-truncate" style={{ maxWidth: "150px" }}>{item.title}</p>
                                        <small className="text-muted">{item.authorName}</small>
                                    </div>

                                    <div className="text-end">
                                        <p className="mb-0 fw-bold">€{(item.price * item.quantity).toFixed(2)}</p>
                                        <small className="text-muted">
                                            {item.quantity} × €{item.price.toFixed(2)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div>
                <div className="d-flex justify-content-between mb-2">
                    <h6>Subtotal:</h6>
                    <h6>€ {subtotal.toFixed(2)}</h6>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <h6>Shipping:</h6>
                    <h6>{shippingCost === 0 ? "Free" : `€ ${shippingCost.toFixed(2)}`}</h6>
                </div>

                <hr className="my-2" />

                <div className="d-flex justify-content-between">
                    <h5>Total:</h5>
                    <h5>€ {total.toFixed(2)}</h5>
                </div>
            </div>
        </div>
    );
}
