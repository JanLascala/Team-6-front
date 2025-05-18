import { useGlobalContext } from "../Contexts/GlobalContext";
import Jumbotron from "../Components/Jumbotron";
import LoadingUi from "../Components/LoadingUi"
import ServerErrorPage from "./ServerErrorPage";
import UseVinylsRecent from "../hooks/UseVinylsRecent"
import UseVinylsByGenre from "../hooks/UseVinylsByGenre"
import UseVinylsByFormat from "../hooks/UseVinylsByFormat"

export default function HomePage() {
    const { vinyls } = useGlobalContext();

    switch (vinyls.state) {
        case 'loading':
            return <LoadingUi />

        case 'success':
            return (
                <div className="homepage d-flex flex-column">
                    {/* Jumbotron a larghezza piena */}
                    <div className="w-100 mb-5">
                        <Jumbotron />
                    </div>

                    {/* Contenitore principale con spaziatura responsive */}
                    <div className="container-fluid px-2 px-md-4 py-3 mt-2">
                        {/* Sezione Nuovi Arrivi */}
                        <div className="row mb-5">
                            <div className="col-12">
                                <UseVinylsRecent title={"Recent Releases"} />
                            </div>
                        </div>

                        {/* Sezione Classici */}
                        <div className="row mb-5">
                            <div className="col-12">
                                <UseVinylsByGenre genre={"classical"} title={"Our Classics!"} />
                            </div>
                        </div>

                        {/* Sezione Hip Hop */}
                        <div className="row mb-5">
                            <div className="col-12">
                                <UseVinylsByGenre genre={"hip hop"} title={"Hip Hop Hits!"} />
                            </div>
                        </div>

                        {/* Sezione per formato */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <UseVinylsByFormat format={"gatefold"} title={"Our Gatefolds!"} />
                            </div>
                        </div>
                    </div>
                </div>
            )

        case 'error':
            return <ServerErrorPage error={vinyls.message} />

        default:
            return <p>Unknown status</p>
    }
}