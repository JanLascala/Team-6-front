import 'bootstrap-icons/font/bootstrap-icons.css';
import VinylSearch from '../VinylSearch';
import { Link } from 'react-router-dom';

export default function Header() {


    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light py-2">
            <div className="container-fluid px-3 d-flex justify-content-between align-items-center">
                <ul className="navbar-nav gap-3 me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/vinyls">Vinyls</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About us</Link>
                    </li>
                </ul>

                <div className="d-flex align-items-center gap-3">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Log in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="bi bi-cart-plus"></i>
                            </Link>
                        </li>
                    </ul>

                    <div style={{ minWidth: "200px" }}>
                        <VinylSearch />
                    </div>
                </div>
            </div>
        </nav>
    );
}