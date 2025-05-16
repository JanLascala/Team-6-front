import { Link, useLocation } from "react-router-dom";
import VinylSearch from "./VinylSearch";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useGlobalContext } from "../Contexts/GlobalContext";
import Cart from '../Components/Cart'

export default function Header() {
    const { cart, isCartOpen, setIsCartOpen } = useGlobalContext();
    const location = useLocation();
    const isVinylsPage = location.pathname === "/vinyls";

    const toggleModal = () => {
        setIsCartOpen(prev => !prev);
    };

    return (
        <>

            <nav id="headerNav" className="navbar navbar-expand-sm shadow-sm sticky-top">
                <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <Link className="navbar-brand fw-bold text-light" to="/">VinylStore</Link>
                        {!isVinylsPage && (
                            <div className="d-flex align-items-center">
                                <VinylSearch />
                            </div>
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav me-auto gap-3">
                                <li className="nav-item"><Link className="nav-link text-light" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link text-light" to="/vinyls">Vinyls</Link></li>
                                <li className="nav-item"><Link className="nav-link text-light" to="/about">About</Link></li>
                            </ul>
                        </div>

                        <div className="navbar-nav">
                            <button className="nav-link btn btn-link position-relative p-2 d-flex" onClick={toggleModal}>
                                <i className="bi bi-cart-plus fs-5 text-light"></i>
                                {cart.length > 0 && <div id="cart-quantity" className="bg-primary">{cart.length}</div>}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


            {isCartOpen && (
                <div className="side-modal-overlay" onClick={toggleModal}>
                    <div className="side-modal-content" onClick={e => e.stopPropagation()}>
                        <button id="close-cart-button" className="btn btn-sm btn-light text-secondary position-absolute top-0 start-0 m-3" onClick={toggleModal}>✖</button>
                        <Cart onClose={toggleModal} />
                    </div>
                </div>
            )}
        </>
    );
}



