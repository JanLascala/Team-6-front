import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="container py-4">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <h1 className="display-4 mb-3">About VinylStore</h1>
                    <div className="d-flex justify-content-center">
                        <div className="divider bg-dark" style={{ height: "3px", width: "80px" }}></div>
                    </div>
                    <p className="lead mt-4">Bringing analog sound to the digital age since 2010</p>
                </div>
            </div>

            <div className="row align-items-center mb-5">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img
                        src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
                        alt="Vinyl record shop"
                        className="img-fluid rounded shadow-sm"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">Our Story</h2>
                    <p>VinylStore began as a small passion project in a basement apartment in Rome. What started as a personal collection quickly grew into a curated selection of both classic and contemporary vinyl records.</p>
                    <p>As digital streaming became the norm, we recognized the growing desire for the authentic, tangible music experience that only vinyl can provide. Our mission became clear: to preserve and promote the rich, warm sound of analog music in the digital age.</p>
                    <p>Today, we pride ourselves on offering a carefully selected catalog of records spanning all genres and eras, from jazz classics and rock anthems to today's chart-toppers.</p>
                </div>
            </div>

            <div className="row bg-dark text-light p-4 rounded-3 mb-5">
                <div className="col-12 text-center">
                    <h2 className="mb-4">Why Vinyl?</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card h-100 bg-transparent text-light border-light">
                                <div className="card-body text-center">
                                    <i className="bi bi-music-note-beamed fs-1 mb-3"></i>
                                    <h5 className="card-title">Superior Sound</h5>
                                    <p className="card-text">Experience music as it was meant to be heard, with the warm, rich tones that only vinyl can deliver.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 bg-transparent text-light border-light">
                                <div className="card-body text-center">
                                    <i className="bi bi-disc fs-1 mb-3"></i>
                                    <h5 className="card-title">Tangible Art</h5>
                                    <p className="card-text">Album covers and inserts are works of art that deserve to be displayed and appreciated, not hidden in a digital library.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 bg-transparent text-light border-light">
                                <div className="card-body text-center">
                                    <i className="bi bi-heart fs-1 mb-3"></i>
                                    <h5 className="card-title">Ritual Experience</h5>
                                    <p className="card-text">The ritual of selecting a record, placing it on the turntable, and listening from start to finish creates a deeper connection with music.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="mb-4">Visit Our Store</h2>
                    <p>We'd love to meet you in person! Visit our physical store in Rome, where you can browse our collection, listen to records, and talk music with our passionate staff.</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Link to="/vinyls" className="btn btn-dark px-3" style={{ backgroundColor: "var(--highlight-color)", borderColor: "var(--highlight-color)" }}>
                            Browse Our Collection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}