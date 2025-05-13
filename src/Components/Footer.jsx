import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <footer className="bg-dark text-white text-center">
                <div>© 2025 Il tuo negozio di vinili</div>
                <div className="d-flex gap-3">
                    <Link to="/about" className="nav-link"><div className="text-white">About us</div></Link>
                    <Link to="/contact" className="nav-link"><div className="text-white">Contatti</div></Link>
                </div>
            </footer>
        </>
    )
}