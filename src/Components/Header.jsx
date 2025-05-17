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

            <nav className="navbar navbar-expand-sm shadow-sm sticky-top bg-dark">
                <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

                    {/* Logo + Searchbar */}
                    <div className="d-flex align-items-center gap-3">
                        <Link className="navbar-brand fw-bold text-light" to="/">
                            <img src="../../public/vinylvibelogo.png" alt="VinylVibe logo" height={'70px'} /></Link>
                        {!isVinylsPage && (
                            <div className="d-none d-sm-flex align-items-center">
                                <VinylSearch />
                            </div>
                        )}
                    </div>

                    {/* Bottone per menu mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu navigazione collapsabile */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                            <li className="nav-item"><Link className="nav-link text-light" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to="/vinyls">Vinyls</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to="/about">About</Link></li>
                        </ul>
                    </div>

                    {/* Carrello - sempre visibile */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-link nav-link position-relative p-2 d-flex" onClick={toggleModal}>
                            <i className="bi bi-cart-plus fs-5 text-light"></i>
                            {cart.length > 0 && (
                                <div id="cart-quantity" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    {cart.length}
                                </div>
                            )}
                        </button>
                    </div>

                </div>
            </nav>



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



