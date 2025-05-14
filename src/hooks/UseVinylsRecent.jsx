import { useEffect, useState } from 'react';
import Carousel from '../Components/Carousel';
import LoadingUi from '../Components/LoadingUi';
import ServerErrorPage from '../Pages/ServerErrorPage';

export default function VinylsRecent({ title }) {
    const [carouselVinyls, setCarouselVinyls] = useState({ state: "loading" });

    useEffect(() => {
        fetch('http://localhost:3000/api/vinyls/recent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
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
                    <h2 className='carousel-title'>{title}</h2>
                    <Carousel array={carouselVinyls.vinyl_data} />
                </>
            );
        case 'error':
            return <ServerErrorPage error={carouselVinyls.error} />;
        default:
            return <p>Unknown state</p>;
    }
}
