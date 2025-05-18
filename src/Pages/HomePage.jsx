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
                <div className="homepage d-flex flex-column p-0 m-0">
                    <div className="w-100 p-0 m-0">
                        <Jumbotron />
                    </div>

                    <div className="container-fluid px-2 px-md-4 pt-0 pb-3">
                        <div className="row mb-4 mt-0">
                            <div className="col-12">
                                <UseVinylsRecent title={"Recent Releases"} />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-12">
                                <UseVinylsByGenre genre={"classical"} title={"Our Classics!"} />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-12">
                                <UseVinylsByGenre genre={"hip hop"} title={"Hip Hop Hits!"} />
                            </div>
                        </div>

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