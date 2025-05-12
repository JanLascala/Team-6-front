import { Link } from "react-router-dom";
import VinylSearch from "./VinylSearch";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useGlobalContext } from "../Contexts/GlobalContext";
import { useState, useEffect } from "react";
import Cart from '../Pages/Cart'

export default function Header() {
    const { cart } = useGlobalContext();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (cart.length === 0) {
            setShowModal(false);
        }
    }, [cart]);

    const toggleModal = () => {
        setShowModal(prev => !prev);
    };

    return (
        <>
            <nav id="headerNav" className="navbar navbar-expand-sm navbar-light bg-light shadow-sm sticky-top">
                <div className="container-fluid px-4">
                    <Link className="navbar-brand fw-bold" to="/">VinylStore</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto gap-3">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/vinyls">Vinyls</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        </ul>

                        <div className="d-flex align-items-center justify-content-between gap-2">
                            <div className="d-flex align-items-center w-100">
                                <VinylSearch />
                            </div>
                            <div className="navbar-nav">
                                <button className="nav-link btn btn-link position-relative p-2" onClick={toggleModal}>
                                    <i className="bi bi-cart-plus fs-5"></i>
                                    {cart.length > 0 && <div id="cart-quantity" className="bg-primary">{cart.length}</div>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {showModal && (
                <div className="side-modal-overlay" onClick={toggleModal}>
                    <div className="side-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={toggleModal}>✖</button>
                        <Cart onClose={toggleModal} />
                    </div>
                </div>
            )}
        </>
    );
}



