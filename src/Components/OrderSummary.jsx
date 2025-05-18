import { useGlobalContext } from '../Contexts/GlobalContext';

export default function OrderSummary() {
    const { cart } = useGlobalContext();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 12;
    const total = subtotal + shippingCost;

    return (
        <div className="order-summary" style={{
            height: "calc(100vh - var(--header-height) - 40px)",
            position: "sticky",
            top: "var(--header-height)",
        }}>
            <h4 className="mb-4">Order Summary</h4>

            <div className="order-items overflow-auto flex-grow-1 mb-3" style={{ minHeight: "100px" }}>
                <ul className="list-group pe-1">
                    {cart.map(item => (
                        <li key={item.slug} className="list-group-item py-3 px-3 border-0 mb-2 bg-light"
                            style={{ borderRadius: '100px' }}>
                            <div className="d-flex align-items-center">
                                <img
                                    src={item.vinylImg || 'https://picsum.photos/300/200'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://picsum.photos/300/200';
                                    }}
                                    alt={item.title}
                                    className="me-3"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                />

                                <div className="flex-grow-1">
                                    <div className="row">
                                        <div className="col-7">
                                            <p className="mb-0 fw-bold text-truncate">{item.title}</p>
                                            <small className="order-summary-text" style={{ fontSize: "0.8rem" }}>{item.authorName}</small>
                                        </div>

                                        <div className="col-5 text-end">
                                            <p className="mb-0 fw-bold" style={{ fontSize: "0.95rem" }}>€{(item.price * item.quantity).toFixed(2)}</p>
                                            <small className="order-summary-text" style={{ fontSize: "0.8rem" }}>
                                                {item.quantity} × €{item.price.toFixed(2)}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto">
                <div className="d-flex justify-content-between my-3">
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

            {subtotal < 100 && subtotal > 0 && (
                <div className="mt-3 text-center text-muted">
                    <small>Free shipping on orders over €100</small>
                </div>
            )}
        </div>
    );
}
