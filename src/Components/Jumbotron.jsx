import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Jumbotron() {
    const carouselStyle = {
        height: '600px',
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
        height: '600px',
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
                        <img className="d-block carousel-img" src="https://www.qdnapoli.it/images/vinile.jpg" alt="First slide" style={imageStyle} />
                        <a href="#shop-section" className="btn btn-dark position-absolute top-50 start-50 translate-middle">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="carousel-item">
                    <div style={imageContainerStyle}>
                        <img className="d-block carousel-img" src="https://venditaviniliusati.it/wp-content/uploads/2017/09/Valutazione-dischi-vinile-usati.jpg" alt="Second slide" style={imageStyle} />
                        <a href="#shop-section" className="btn btn-dark position-absolute top-50 start-50 translate-middle">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="carousel-item">
                    <div style={imageContainerStyle}>
                        <img className="d-block carousel-img" src="https://www.miraloop.com/upload/img/music-vintage-vinyl-favim.com-434847.jpg" alt="Third slide" style={imageStyle} />
                        <a href="#shop-section" className="btn btn-dark position-absolute top-50 start-50 translate-middle">
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