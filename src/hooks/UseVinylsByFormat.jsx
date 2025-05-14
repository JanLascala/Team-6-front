import { useEffect, useState } from 'react';
import Carousel from '../Components/Carousel';
import LoadingUi from '../Components/LoadingUi';
import ServerErrorPage from '../Pages/ServerErrorPage';

export default function VinylsByFormat({ format, title }) {
    const [carouselVinyls, setCarouselVinyls] = useState({ state: "loading" });

    useEffect(() => {
        fetch('http://localhost:3000/api/vinyls/by_format', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ format }),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server responded with status ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setCarouselVinyls({
                    vinyl_data: data,
                    state: "success"
                });
            })
            .catch(err => {
                setCarouselVinyls({
                    error: `error type: ${err}`,
                    state: "error"
                });
            });
    }, []);

    switch (carouselVinyls.state) {
        case 'loading':
            return <LoadingUi />;
        case 'success':
            return (
                <>
                    <h1 id="shop-section" className="mb-4 text-center">{title}</h1>
                    <Carousel array={carouselVinyls.vinyl_data} />
                </>
            );
        case 'error':
            return <ServerErrorPage error={carouselVinyls.error} />;
        default:
            return <p>Unknown state</p>;
    }
}
