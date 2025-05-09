import { useGlobalContext } from "../Contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingUi from "../Components/LoadingUi";
import ServerErrorPage from "./ServerErrorPage";
import Carousel from "../Components/carousel";
import AddToCartButton from "../Components/AddToCartButton";
import filterByText from "../functions/filterByText";

export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    console.log(vinyls)
    const { slug } = useParams();
    const [singleVinyl, setSingleVinyl] = useState({ state: 'loading' });

    useEffect(() => {
        fetch(`http://localhost:3000/api/vinyls/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);
                setSingleVinyl({ state: "success", vinyl_data: data });
            })
            .catch((err) => {
                //console.error(err);
                setSingleVinyl({ state: 'error', message: `error type: ${err}` });
            });
    }, [slug]);

    switch (singleVinyl.state) {

        case 'loading':
            return <LoadingUi />;

        case 'success': {
            const data = singleVinyl.vinyl_data;

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
                        <AddToCartButton vinyl={data} />
                        <p>{data.nAvailable > 0 ? `${data.nAvailable} Vinyls available` : `Worn out`}</p>
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

                    <h1 style={{ paddingTop: "1rem" }}>We think you might like these!</h1>

                    {/* did this to avoid sometimes vinyls not fetching fast enough and causing the page to crash as there was no array to map on */}
                    {vinyls.state === "success" ? <Carousel array={filterByText(vinyls, data.genreName, "genre")} /> : <h6>Loading...</h6>}

                </div>
            );
        }

        case 'error':
            return <ServerErrorPage error={singleVinyl.message} />;

        default:
            return <p>Unknown status</p>;
    }
}
