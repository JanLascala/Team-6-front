import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Contexts/GlobalContext";

export default function VinylSearch() {
    const { slug } = useParams();
    const { vinyls } = useGlobalContext();

    if (vinyls?.state === "loading") {
        return <p>Loading...</p>;
    }

    if (vinyls?.state === "error") return <p>{vinyls.message}</p>

    const vinyl = vinyls.vinyls_data.find(v => v.slug === slug)

    if (!vinyl) return <p>Vinyl not found</p>

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-top">
                                <h1>{vinyl.title}</h1>
                                <p>Author: {vinyl.author}</p>
                                <p>Genre: {vinyl.genre}</p>
                                <p>Year: {vinyl.release_date}</p>
                                <p>Price: {vinyl.price}</p>
                            </div>
                            <div className="card-body">
                                <img src={vinyl.image_url} alt={vinyl.title} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}