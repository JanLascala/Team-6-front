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
            <nav className="navbar navbar-expand-md shadow-sm sticky-top bg-dark">
                <div className="container-fluid px-2 px-sm-4">

                    {/* Logo - sempre visibile */}
                    <Link className="navbar-brand fw-bold text-light me-2" to="/">
                        <img src="../../public/vinylvibelogo.png" alt="VinylVibe logo"
                            style={{ height: 'auto', maxHeight: '60px', width: 'auto', maxWidth: '100%' }} />
                    </Link>

                    {/* Barra di ricerca - visibile su schermi medi+ tranne nella pagina vinili */}
                    {!isVinylsPage && (
                        <div className="d-none d-md-flex align-items-center flex-grow-1 mx-3">
                            <VinylSearch />
                        </div>
                    )}

                    {/* Carrello - visibile solo su mobile fuori dal menu */}
                    <div className="d-md-none d-flex ms-auto me-2">
                        <button className="btn btn-link nav-link position-relative p-2 d-flex" onClick={toggleModal}>
                            <i className="bi bi-cart-plus fs-5 text-light"></i>
                            {cart.length > 0 && (
                                <div id="cart-quantity" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    {cart.length}
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Pulsante hamburger per menu mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarContent" aria-controls="navbarContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu di navigazione collassabile */}
                    <div className="collapse navbar-collapse mt-2 mt-md-0" id="navbarContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0 gap-2 align-items-center">
                            <li className="nav-item"><Link className="nav-link text-light" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to="/vinyls">Vinyls</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to="/about">About</Link></li>
                            {/* Carrello - nel menu desktop e mobile */}
                            <li className="nav-item d-none d-md-block">
                                <button className="btn btn-link nav-link position-relative p-2 d-flex" onClick={toggleModal}>
                                    <i className="bi bi-cart-plus fs-5 text-light"></i>
                                    {cart.length > 0 && (
                                        <div id="cart-quantity" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                            {cart.length}
                                        </div>
                                    )}
                                </button>
                            </li>
                        </ul>

                        {/* Barra di ricerca - visibile solo su mobile quando il menu è aperto */}
                        {!isVinylsPage && (
                            <div className="d-md-none mt-3 mb-2 w-100">
                                <VinylSearch />
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Modal del carrello */}
            {isCartOpen && (
                <div className="side-modal-overlay" onClick={toggleModal}>
                    <div className="side-modal-content" onClick={e => e.stopPropagation()}>
                        <button id="close-cart-button" className="btn btn-sm btn-light text-secondary position-absolute top-0 start-0" onClick={toggleModal}>✖</button>
                        <Cart onClose={toggleModal} />
                    </div>
                </div>
            )}
        </>
    );
}



