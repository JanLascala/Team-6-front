import { useParams } from "react-router-dom";
import LoadingUi from "../Components/dumb/LoadingUi";
import ServerErrorPage from "../Components/dumb/ServerErrorUi";
import { useState, useEffect } from "react";

export default function VinylSearch() {
    const { slug } = useParams();
    const [vinyl, setVinyl] = useState({ state: 'loading' });

    useEffect(() => {
        fetch(`http://localhost:3000/api/vinyls/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVinyl({ state: "success", vinyl_data: data });
            })
            .catch((err) => {
                console.error(err);
                setVinyl({ state: 'error', message: `error type: ${err}` });
            });
    }, [slug]);

    switch (vinyl.state) {

        case 'loading':
            return <LoadingUi />;

        case 'success': {
            const data = vinyl.vinyl_data;

            return (
                <div className="container my-5">
                    <div className="text-center mb-4">
                        <h1 className="display-4">{data.title}</h1>
                        <img
                            src={data.vinylImg || 'http://localhost:3000/vinyl_placeholder.png'}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'http://localhost:3000/vinyl_placeholder.png';
                            }}
                            alt={data.title}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6">
                            <h3>Details</h3>
                            <ul className="list-group">
                                <li className="list-group-item"><strong>Genre:</strong> {data.genreName}</li>
                                <li className="list-group-item"><strong>Format:</strong> {data.formatName}</li>
                                <li className="list-group-item"><strong>Release Date:</strong> {data.releaseDate}</li>
                                <li className="list-group-item"><strong>Price:</strong> ${data.price}</li>
                                <li className="list-group-item"><strong>Available:</strong> {data.nAvailable} in stock</li>
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <h3>Author</h3>
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
                        <h3>Publisher</h3>
                        <p><strong>{data.publisherName}</strong></p>
                        <p className="text-muted">{data.publisherDescription}</p>
                    </div>

                    <div>
                        <h3>Track List <span className="badge bg-secondary">{data.tracksNumber} tracks</span></h3>
                        <ol className="list-group list-group-numbered mt-3">
                            {data.tracks.map((track, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {track.name}
                                    <span className="badge bg-primary rounded-pill">{track.length}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            );
        }

        case 'error':
            return <ServerErrorPage error={vinyl.message} />;

        default:
            return <p>Unknown status</p>;
    }
}
