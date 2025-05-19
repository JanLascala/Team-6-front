import { useGlobalContext } from "../Contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import LoadingUi from "../Components/LoadingUi";
import ServerErrorPage from "./ServerErrorPage";
import AddToCartButton from "../Components/AddToCartButton";
import UseVinylsByGenre from "../hooks/UseVinylsByGenre"


export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    const { slug } = useParams();
    const [singleVinyl, setSingleVinyl] = useState({ state: 'loading' });
    const loadedSlugRef = useRef(null);

    useEffect(() => {
        if (loadedSlugRef.current === slug && singleVinyl.state === 'success') {
            return;
        }

        setSingleVinyl({ state: 'loading' });
        loadedSlugRef.current = slug;

        if (vinyls.state === 'success') {
            const existingVinyl = vinyls.vinyl_data.find(v => v.slug === slug);

            if (existingVinyl && Array.isArray(existingVinyl.tracks) && existingVinyl.tracks.length > 0) {
                setSingleVinyl({ state: 'success', vinyl_data: existingVinyl });
                return;
            }
        }

        fetch(`http://localhost:3000/api/vinyls/single-vinyl/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                if (!data) throw new Error('No data received');

                const currentVinyls = vinyls.state === 'success' ? vinyls.vinyl_data : [];
                const existingVinyl = currentVinyls.find(v => v.slug === slug);

                const mergedVinyl = existingVinyl
                    ? { ...existingVinyl, tracks: data.tracks }
                    : {
                        ...data,
                        tracks: Array.isArray(data.tracks) ? data.tracks : [],
                    };

                setSingleVinyl({ state: 'success', vinyl_data: mergedVinyl });
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setSingleVinyl({ state: 'error', message: err.message });
            });
    }, [slug]);

    useEffect(() => {
        if (singleVinyl.state === 'success' && vinyls.state === 'success') {
            const updatedVinyl = vinyls.vinyl_data.find(v => v.slug === slug);

            if (updatedVinyl) {
                setSingleVinyl(prev => ({
                    ...prev,
                    vinyl_data: {
                        ...prev.vinyl_data,
                        nAvailable: updatedVinyl.nAvailable
                    }
                }));
            }
        }
    }, [vinyls, slug]);

    switch (singleVinyl.state) {
        case 'loading':
            return <LoadingUi />;

        case 'success': {
            const data = singleVinyl.vinyl_data;

            const renderTrackList = () => {
                if (!data.tracks || data.tracks.length === 0) {
                    return <p>No tracks available</p>;
                }

                return (
                    <ol className="list-group list-group-numbered mt-3">
                        {data.tracks.map((track, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex flex-row justify-content-between align-items-center animate-track"
                            >
                                {track.name}
                                <span className="badge bg-primary rounded-pill">{track.length}</span>
                            </li>
                        ))}
                    </ol>
                );
            };

            return (
                <div className="container">
                    <div className="text-center mt-5">
                        <h1 className="display-4 mb-5 fw-bold text-uppercase">{data.title}</h1>
                        <img
                            src={data.vinylImg || 'http://localhost:3000/https://picsum.photos/300/200'}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'http://localhost:3000/https://picsum.photos/300/200';
                            }}
                            alt={data.title}
                            className="img-fluid rounded shadow-sm transition-img mb-4"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                        <div className="mt-3 d-flex flex-column align-items-center gap-2 my-2">
                            <AddToCartButton vinyl={data} />
                            <p className="fw-bold fs-5 my-2">€{data.price.toFixed(2)}</p>
                        </div>
                        <p>{data.nAvailable > 0 ? `${data.nAvailable} Vinyls available` : `Worn out`}</p>
                    </div>

                    <div className="row mb-5 details-container">
                        <div className="col-md-6 mt-3">
                            <h3 className="mt-2 mb-3 border-bottom pb-2">Details</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><strong>Genre:</strong> {data.genreName}</li>
                                <li className="list-group-item"><strong>Format:</strong> {data.formatName}</li>
                                <li className="list-group-item"><strong>Release Date:</strong> {data.releaseDate}</li>
                                <li className="list-group-item"><strong>Price:</strong> ${data.price}</li>
                                <li className="list-group-item"><strong>Available:</strong> {data.nAvailable} in stock</li>
                            </ul>
                        </div>

                        <div className="col-md-6 mt-3">
                            <h3 className="mt-2 mb-3 border-bottom pb-2">Author</h3>
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={data.authorImg || 'https://picsum.photos/300/200'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://picsum.photos/300/200';
                                    }}
                                    alt={data.authorName}
                                    className="rounded-circle border"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                                <div>
                                    <p className="mb-1"><strong>{data.authorName}</strong></p>
                                    <p className="text-muted">{data.authorDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <h3>Track List <span className="badge bg-secondary mb-2">{data.tracks?.length || 0} tracks</span></h3>
                        {renderTrackList()}
                    </div>
                    <UseVinylsByGenre genre={data.genreName} title={"We think you might like these!"} />
                </div>
            );
        }

        case 'error':
            return <ServerErrorPage error={singleVinyl.message} />;

        default:
            return <p>Unknown status</p>;
    }
}
