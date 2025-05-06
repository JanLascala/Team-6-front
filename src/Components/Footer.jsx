import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <footer className="footer py-4 bg-dark text-white text-center">
                <p>© 2025 Il tuo negozio di vinili  <Link to="/about" className="text-white nav-link">About us</Link>  <Link to="/contact" className="text-white nav-link">Contatti</Link></p>
            </footer>
        </>
    )
}