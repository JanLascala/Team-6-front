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
                <>
                    <Jumbotron />

                    <UseVinylsRecent title={"Recent Releases"} />

                    <UseVinylsByGenre genre={"classical"} title={"Our Classics!"} />

                    <UseVinylsByGenre genre={"hip hop"} title={"Hip Hop Hits!"} />

                    <UseVinylsByFormat format={"gatefold"} title={"Our Gatefolds!"} />

                </>
            )

        case 'error':
            return <ServerErrorPage error={vinyls.message} />

        default:
            return <p>Unknown status</p>

    }

}