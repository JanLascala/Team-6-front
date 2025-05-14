import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "calc(100vh - var(--header-height) - 100px)" }}>

            <div className="bg-success text-white p-4 rounded-3 mb-4 text-center" style={{ maxWidth: "500px" }}>
                <i className="bi bi-check-circle-fill fs-1 mb-3"></i>
                <h2>Payment Successful!</h2>
                <p className="mb-0">Your order has been placed and will be processed shortly.</p>
            </div>

            <Link to="/" className="btn btn-primary btn-lg px-5">
                Return to Homepage
            </Link>
        </div>
    );
}