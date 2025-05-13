import { useGlobalContext } from "../Contexts/GlobalContext";

export default function CartSummary() {
    const { cart } = useGlobalContext();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal >= 100 ? 0 : 12;
    const total = subtotal + shippingCost;

    return (
        <div id="order-summary" style={{ padding: "0px", overflowY: "auto" }}>
            <h4>Order Summary</h4>
            <ul id="order-summary-list" className="list-group">
                {cart.map(item => (
                    <li key={item.slug} className="list-group-item border-0">
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
                                    <span className="px-2">Quantity: {item.quantity}</span>
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
