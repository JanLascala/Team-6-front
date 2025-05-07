import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Carousel({ array = [], itemsPerPage = 3 }) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(array.length / itemsPerPage);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const startIndex = page * itemsPerPage;
    const visibleItems = array.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={page === 0}>
                    ‹
                </button>
                <button className="btn btn-outline-secondary" onClick={handleNext} disabled={page === totalPages - 1}>
                    ›
                </button>
            </div>

            <div className="row">
                {visibleItems.map((item, i) => (

                    <div className="col-md-4 mb-3" key={item.slug} >
                        <Link to={`/products/${item.slug}`} className="text-decoration-none text-dark">
                            <div className="card h-100 text-center">
                                <img
                                    src={item.vinylImg ? item.vinylImg : 'http://localhost:3000/vinyl_placeholder.png'}
                                    alt={item.title}
                                    className="card-img-top img-fluid"
                                    style={{ objectFit: 'contain', height: '200px' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <h4 className="card-text">{item.price} €</h4>
                                    <p className="card-text">{item.releaseDate}</p>
                                    <p className="card-text">{item.genre}, {item.format}</p>
                                    <p className="card-text">{item.publisherName}, {item.authorName}</p>




                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>

            <div className="text-center text-muted">
                Page {page + 1} of {totalPages}
            </div>
        </div>
    );
}

export default Carousel;
