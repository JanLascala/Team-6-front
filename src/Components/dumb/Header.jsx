import { Link } from "react-router-dom";
import VinylSearch from "../VinylSearch";
export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container-fluid px-4">
                <Link className="navbar-brand fw-bold" to="/">VinylStore</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto gap-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vinyls">Vinyls</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <VinylSearch />
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="bi bi-cart-plus"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}



