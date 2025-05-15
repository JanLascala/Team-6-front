import { useGlobalContext } from "../Contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingUi from "../Components/LoadingUi";
import ServerErrorPage from "./ServerErrorPage";
import AddToCartButton from "../Components/AddToCartButton";
import UseVinylsByGenre from "../hooks/UseVinylsByGenre"


export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    const { slug } = useParams();
    const [singleVinyl, setSingleVinyl] = useState({ state: 'loading' });

    useEffect(() => {
        if (vinyls.state === "success") {
            const existingVinyl = vinyls.vinyl_data.find(v => v.slug === slug);
            if (existingVinyl) {
                setSingleVinyl({ state: "success", vinyl_data: existingVinyl });
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

                const safeData = {
                    ...data,
                    tracks: Array.isArray(data.tracks) ? data.tracks : []
                };

                setSingleVinyl({ state: "success", vinyl_data: safeData });
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setSingleVinyl({ state: 'error', message: err.message });
            });
    }, [slug, vinyls]);

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
                <div className="container my-5">
                    <div className="text-center mb-4 mt-5">
                        <h1 className="display-4 mb-4 fw-bold text-uppercase">{data.title}</h1>
                        <img
                            src={data.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                            }}
                            alt={data.title}
                            className="img-fluid rounded shadow-sm transition-img"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                        <div className="mt-3 d-flex flex-column align-items-center gap-2">
                            <AddToCartButton vinyl={data} />
                            <p className="fw-bold fs-5 mb-0">${data.price.toFixed(2)}</p>
                        </div>
                        <p>{data.nAvailable > 0 ? `${data.nAvailable} Vinyls available` : `Worn out`}</p>
                    </div>

                    <div className="row mb-5 details-container">
                        <div className="col-md-6 mt-5">
                            <h3 className="mt-5 mb-3 border-bottom pb-2">Details</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><strong>Genre:</strong> {data.genreName}</li>
                                <li className="list-group-item"><strong>Format:</strong> {data.formatName}</li>
                                <li className="list-group-item"><strong>Release Date:</strong> {data.releaseDate}</li>
                                <li className="list-group-item"><strong>Price:</strong> ${data.price}</li>
                                <li className="list-group-item mt-2"><strong>Available:</strong> {data.nAvailable} in stock</li>
                            </ul>
                        </div>

                        <div className="col-md-6 mt-5">
                            <h3 className="mt-5 mb-3 border-bottom pb-2">Author</h3>
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={data.authorImg || 'http://localhost:3000/author_placeholder.png'}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'http://localhost:3000/author_placeholder.png';
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
                        <h3 className="mb-3 border-bottom pb-2">Track List <span className="badge bg-secondary ms-2">{data.tracks?.length || 0} tracks</span></h3>
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
