import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Jumbotron() {
    const imageStyle = {
        objectFit: 'cover',
        objectPosition: 'center',
        width: '100%',
        height: '100%',
    };

    const slideStyle = {
        height: '75vh',
        overflow: 'hidden',
        position: 'relative',
    };

    const captionStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        zIndex: 10,
    };

    const textClass = "fw-bold text-shadow fs-2 fs-md-1";

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div style={slideStyle}>
                        <img
                            src="https://www.qdnapoli.it/images/vinile.jpg"
                            className="d-block"
                            style={imageStyle}
                            alt="First slide"
                        />
                        <div style={captionStyle}>
                            <h1 className={textClass}>The future is digital.<br />The soul is vinyl.</h1>
                            <a
                                href="#carousels-first-title"
                                className="btn btn-dark mt-3 px-4 py-2 fs-6 fs-md-5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div style={slideStyle}>
                        <img
                            src="https://venditaviniliusati.it/wp-content/uploads/2017/09/Valutazione-dischi-vinile-usati.jpg"
                            className="d-block"
                            style={imageStyle}
                            alt="Second slide"
                        />
                        <div style={captionStyle}>
                            <h1 className={textClass}>The future is digital.<br />The soul is vinyl.</h1>
                            <a
                                href="#carousels-first-title"
                                className="btn btn-dark mt-3 px-4 py-2 fs-6 fs-md-5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <div style={slideStyle}>
                        <img
                            src="https://www.miraloop.com/upload/img/music-vintage-vinyl-favim.com-434847.jpg"
                            className="d-block"
                            style={imageStyle}
                            alt="Third slide"
                        />
                        <div style={captionStyle}>
                            <h1 className={textClass}>The future is digital.<br />The soul is vinyl.</h1>
                            <a
                                href="#carousels-first-title"
                                className="btn btn-dark mt-3 px-4 py-2 fs-6 fs-md-5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Jumbotron;
