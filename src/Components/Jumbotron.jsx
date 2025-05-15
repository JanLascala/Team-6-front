import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Jumbotron() {
    const carouselStyle = {
        height: '700px',
        marginBottom: '30px',
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
        width: '100%',
        maxWidth: '100%',
        borderRadius: 0,
    };

    const imageContainerStyle = {
        height: 'calc(100vh - var(--header-height)',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
    };
    const captionStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '4rem',
        fontWeight: '800',
        fontFamily: "'Arial Black', Gadget, sans-serif",
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
        textAlign: 'center',
        padding: '0 20px',
        userSelect: 'none',
        whiteSpace: 'pre-line',
        zIndex: 10
    };


    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" /* style={carouselStyle} */>
            <ol className="carousel-indicators">
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div style={imageContainerStyle}>
                        <img
                            className="d-block carousel-img"
                            src="https://www.qdnapoli.it/images/vinile.jpg"
                            alt="First slide"
                            style={imageStyle}
                        />
                        <div style={captionStyle}>
                            The future is digital.<br />The soul is vinyl.
                        </div>
                        <a
                            href="#shop-section"
                            className="btn btn-dark carousel-button shop-now-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="carousel-item">
                    <div style={imageContainerStyle}>
                        <img
                            className="d-block carousel-img"
                            src="https://venditaviniliusati.it/wp-content/uploads/2017/09/Valutazione-dischi-vinile-usati.jpg"
                            alt="Second slide"
                            style={imageStyle}
                        />
                        <div style={captionStyle}>
                            The future is digital.<br />The soul is vinyl.
                        </div>
                        <a
                            href="#shop-section"
                            className="btn btn-dark carousel-button shop-now-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="carousel-item">
                    <div style={imageContainerStyle}>
                        <img
                            className="d-block carousel-img"
                            src="https://www.miraloop.com/upload/img/music-vintage-vinyl-favim.com-434847.jpg"
                            alt="Third slide"
                            style={imageStyle}
                        />
                        <div style={captionStyle}>
                            The future is digital.<br />The soul is vinyl.
                        </div>
                        <a
                            href="#shop-section"
                            className="btn btn-dark carousel-button shop-now-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Shop Now
                        </a>
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