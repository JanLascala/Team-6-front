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

    const badgeStyle = {
        position: 'absolute',
        top: '17%',
        right: '20%',
        transform: 'translateX(50%)',
        fontSize: '0.65rem',
        padding: '0.25em 0.5em'
    };

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark shadow-sm fixed-top bg-dark" id="main-header" style={{ zIndex: 1030 }}>
                <div className="container-fluid px-2 px-sm-4">

                    <Link className="navbar-brand fw-bold text-light me-2 d-flex align-items-center" to="/">
                        <img src="../../public/vinylvibelogo.png" alt="VinylVibe logo"
                            style={{
                                height: 'auto',
                                maxHeight: '70px',
                                width: 'auto',
                                maxWidth: '100%',
                                marginTop: '-5px',
                                marginBottom: '-5px'
                            }} />
                    </Link>

                    {!isVinylsPage && (
                        <div className="d-none d-md-flex align-items-center flex-grow-1 mx-3">
                            <VinylSearch />
                        </div>
                    )}

                    <div className="d-md-none d-flex ms-auto me-2">
                        <button className="btn btn-link nav-link position-relative p-2 d-flex" onClick={toggleModal}>
                            <i className="bi bi-cart-plus fs-5 text-light"></i>
                            {cart.length > 0 && (
                                <div id="cart-quantity" className="badge rounded-pill bg-primary text-white" style={badgeStyle}>
                                    {cart.length}
                                </div>
                            )}
                        </button>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarContent" aria-controls="navbarContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse mt-2 mt-md-0" id="navbarContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0 gap-2 align-items-center">
                            <li className="nav-item"><Link className="nav-link text-light" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to="/vinyls">Vinyls</Link></li>
                            <li className="nav-item"><Link className="nav-link text-light" to="/about">About</Link></li>
                            <li className="nav-item d-none d-md-block">
                                <button className="btn btn-link nav-link position-relative p-2 d-flex" onClick={toggleModal}>
                                    <i className="bi bi-cart-plus fs-5 text-light"></i>
                                    {cart.length > 0 && (
                                        <div id="cart-quantity" className="badge rounded-pill bg-primary text-white" style={badgeStyle}>
                                            {cart.length}
                                        </div>
                                    )}
                                </button>
                            </li>
                        </ul>

                        {!isVinylsPage && (
                            <div className="d-md-none mt-3 mb-2 w-100 search-bar-mobile">
                                <VinylSearch />
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {isCartOpen && (
                <div className="side-modal-overlay" onClick={toggleModal}>
                    <div className="side-modal-content" onClick={e => e.stopPropagation()}>
                        <button id="close-cart-button" className="btn btn-outline-secondary mb-3 w-100" onClick={toggleModal}>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <i className="bi bi-arrow-left"></i>
                                <span>Close cart</span>
                            </div>
                        </button>
                        <Cart onClose={toggleModal} />
                    </div>
                </div>
            )}
        </>
    );
}



