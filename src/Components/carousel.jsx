import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function Carousel({ array = [] }) {
    const [page, setPage] = useState(0);

    const totalPages = array.length;

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const item = array[page];

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={page === 0}>
                    ‹
                </button>
                <span className="text-light fw-bold">Vinyl {page + 1} of {totalPages}</span>
                <button className="btn btn-outline-secondary" onClick={handleNext} disabled={page === totalPages - 1}>
                    ›
                </button>
            </div>

            {item && (
                <div className="card mx-auto vinyl-card text-center" style={{ maxWidth: '600px' }}>
                    <Link
                        to={`/products/${item.slug}`}
                        className="text-white d-flex flex-column align-items-center"
                    >
                        <img
                            src={item.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                            }}
                            alt={item.title}
                            className="card-img-top img-fluid"
                            style={{ objectFit: 'contain', height: '250px' }}
                        />
                        <div className="card-body text-start w-100">
                            <h5 className="card-title">{item.title}</h5>
                            <h4 className="card-text">{item.price} €</h4>
                            <p className="card-text">{item.releaseDate}</p>
                            <p className="card-text">{item.genreName}, {item.formatName}</p>
                            <p className="card-text">{item.authorName}, {item.publisherName}</p>
                        </div>
                    </Link>
                    <div className="p-2">
                        <AddToCartButton vinyl={item} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carousel;


