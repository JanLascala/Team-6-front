import React, { useRef, useState, useEffect } from 'react';

function Carousel({ array }) {
    const [index, setIndex] = useState(0);
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1);
    };

    const handleNext = () => {
        if (carouselRef.current) {
            const maxIndex = Math.ceil(
                array.length - carouselRef.current.offsetWidth / 300
            );
            if (index < maxIndex) setIndex(index + 1);
        }
    };

    useEffect(() => {
        const container = carouselRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth * index;
            container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }, [index]);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX || e.touches[0].pageX;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX.current) * 1.2; // scroll speed
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <button onClick={handlePrev} className="btn btn-outline-secondary">
                    ‹
                </button>
                <button onClick={handleNext} className="btn btn-outline-secondary">
                    ›
                </button>
            </div>

            <div
                ref={carouselRef}
                className="overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                style={{
                    scrollBehavior: 'smooth',
                    cursor: isDragging.current ? 'grabbing' : 'grab',
                }}
            >
                <div className="d-flex flex-nowrap">
                    {array.map((vinyl, i) => (
                        <div
                            key={i}
                            className="card mx-2"
                            style={{
                                minWidth: '250px',
                                flex: '0 0 auto',
                            }}
                        >
                            <img
                                src={vinyl.image}
                                className="card-img-top"
                                alt={vinyl.title}
                            />
                            <div className="card-body text-center">
                                <p className="card-text">{vinyl.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
