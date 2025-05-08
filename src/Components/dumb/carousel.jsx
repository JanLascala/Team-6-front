import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton';

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
            <div className="d-flex align-items-center justify-content-around">

                <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={page === 0}>
                    ‹
                </button>
                <div className="row">

                    {visibleItems.map((item, i) => (

                        <div className="col-md-4 mb-3" key={item.slug}>
                            <div className="card h-100 d-flex flex-column text-center" style={{ minHeight: '100%' }}>
                                <Link to={`/products/${item.slug}`} className="text-decoration-none text-dark flex-grow-1 d-flex flex-column">
                                    <img
                                        src={item.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                                        }}
                                        alt={item.title}
                                        className="card-img-top img-fluid"
                                        style={{ objectFit: 'contain', height: '200px' }}
                                    />

                                    <div className="card-body d-flex flex-column flex-grow-1">
                                        <h5 className="card-title">{item.title}</h5>
                                        <h4 className="card-text">{item.price} €</h4>
                                        <p className="card-text">{item.releaseDate}</p>
                                        <p className="card-text">{item.genreName}, {item.formatName}</p>
                                        <p className="card-text">{item.authorName}, {item.publisherName}</p>
                                    </div>
                                </Link>

                                <div className="p-2 border-top">
                                    <AddToCartButton vinyl={item} />
                                </div>
                            </div>
                        </div>


                    ))}

                </div>
                <button className="btn btn-outline-secondary" onClick={handleNext} disabled={page === totalPages - 1}>
                    ›
                </button>
            </div>

            <div className="text-center text-muted">
                Page {page + 1} of {totalPages}
            </div>
        </div>
    );
}

export default Carousel;
