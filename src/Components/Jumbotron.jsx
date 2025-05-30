import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Jumbotron() {
    const carouselStyle = {
        height: 'auto',
        margin: 0,
        padding: 0,
        width: '100%',
        maxWidth: '100vw',
        borderRadius: 0,
        position: 'relative',
        overflow: 'hidden'
    };

    const imageContainerStyle = {
        height: 'calc(100vh - var(--header-height))',
        width: '100%',
        maxWidth: '100%',
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
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: 'clamp(1.5rem, 5vw, 4rem)',
        fontWeight: '800',
        fontFamily: "'Arial Black', Gadget, sans-serif",
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
        textAlign: 'center',
        padding: '0 20px',
        userSelect: 'none',
        whiteSpace: 'pre-line',
        zIndex: 10,
        width: '100%',
        maxWidth: '90%'
    };

    const buttonStyle = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 'clamp(0.3rem, 1.5vw, 0.6rem) clamp(0.8rem, 3vw, 1.5rem)',
        fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)',
        backgroundColor: 'var(--highlight-color)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap'
    };

    const controlStyle = {
        zIndex: 20,
        width: '10%',
        opacity: 0.8
    };

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={carouselStyle}>
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
                            Discover the vinyl sound
                        </div>
                        <a
                            href="#carousels-first-title"
                            style={buttonStyle}
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
                            Collect the classics
                        </div>
                        <a
                            href="#carousels-first-title"
                            style={buttonStyle}
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
                            Spin your passion
                        </div>
                        <a
                            href="#carousels-first-title"
                            style={buttonStyle}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={controlStyle}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={controlStyle}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Jumbotron;