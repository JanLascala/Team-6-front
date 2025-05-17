import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';


function Carousel({ array = [] }) {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    // Update items per page based on window width
    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 576) {
                setItemsPerPage(1); // Mobile
            } else if (width < 768) {
                setItemsPerPage(2); // Small tablets
            } else if (width < 992) {
                setItemsPerPage(3); // Tablets / small desktops
            } else {
                setItemsPerPage(4); // Desktops and up
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

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
                <button className="btn btn-outline-secondary me-3" onClick={handlePrev} disabled={page === 0}>
                    ‹
                </button>

                <div className="row w-100 justify-content-left">
                    {visibleItems.map((item) => (
                        <div
                            className={`mb-3 col-${12 / itemsPerPage}`}
                            key={item.slug}
                        >
                            <div className="vinyl-card card h-100 text-center d-flex flex-column">
                                <Link
                                    to={`/products/${item.slug}`}
                                    className="text-white flex-grow-1 d-flex flex-column"
                                >
                                    <img
                                        src={item.vinylImg || 'http://localhost:3000/https://picsum.photos/300/200'}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'http://localhost:3000/https://picsum.photos/300/200';
                                        }}
                                        alt={item.title}
                                        className="card-img-top img-fluid"
                                        style={{ objectFit: 'contain', height: '200px' }}
                                    />
                                    <div className="card-body d-flex flex-column flex-grow-1 align-items-start px-5">
                                        <h5 className="card-title text-start">{item.title}</h5>
                                        <h4 className="card-text">{item.price} €</h4>
                                        <p className="card-text">{item.releaseDate}</p>
                                        <p className="card-text">{item.genreName}, {item.formatName}</p>
                                        <p className="card-text">{item.authorName}</p>
                                    </div>
                                </Link>
                                <div className="p-2 d-flex px-5">
                                    <AddToCartButton vinyl={item} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn btn-outline-secondary ms-3" onClick={handleNext} disabled={page === totalPages - 1}>
                    ›
                </button>
            </div>

            <div className="text-center text-muted mt-2">
                Page {page + 1} of {totalPages}
            </div>
        </div>
    );
}

export default Carousel;
