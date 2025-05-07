import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Contexts/GlobalContext";
import LoadingUi from "../Components/dumb/LoadingUi";
import ServerErrorPage from "../Components/dumb/ServerErrorUi";

export default function VinylSearch() {
    const { slug } = useParams();
    const { vinyls } = useGlobalContext();


    switch (vinyls.state) {

        case 'loading':
            return <LoadingUi />

        case 'success':

            const vinyl = vinyls.vinyl_data.find(v => v.slug === slug)
            return (
                <>
                    <>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-top">
                                            <h1>{vinyl.title}</h1>
                                            <p>Author: {vinyl.author}</p>
                                            <p>Genre: {vinyl.genre}</p>
                                            <p>Year: {vinyl.releaseDate}</p>
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
                </>
            )

        case 'error':
            return <ServerErrorPage error={vinyls.message} />

        default:
            return <p>Unknown status</p>

    }

    // if (vinyls?.state === "loading") {
    //     return <p>Loading...</p>;
    // }

    // if (vinyls?.state === "error") return <p>{vinyls.message}</p>



    // if (!vinyl) return <p>Vinyl not found</p>

    // return (

    // )
}
