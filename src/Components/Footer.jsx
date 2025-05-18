import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="w-100 bg-dark text-white mt-auto py-3">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
                        <span>© 2025 VinylStore</span>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex gap-3 justify-content-center justify-content-md-end">
                            <Link to="/about" className="nav-link text-white">About us</Link>
                            <Link to="/contact" className="nav-link text-white">Contacts</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}