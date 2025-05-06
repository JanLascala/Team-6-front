import { useGlobalContext } from "../Contexts/GlobalContext";
import Jumbotron from "../Components/dumb/Jumbotron";
import Carousel from "../Components/dumb/carousel";
import LoadingUi from "../Components/dumb/LoadingUi"
import ServerErrorPage from "../Components/dumb/ServerErrorUi";


export default function HomePage() {
    const { vinyls, isLoading } = useGlobalContext();

    switch (isLoading) {

        case 'loading':
            return <LoadingUi />

        case 'success':

            return (
                <>
                    <Jumbotron />
                    <Carousel array={vinyls} />
                </>
            )

        case 'error':
            return <ServerErrorPage error={"error"} />

        default:
            return <p>Unknown status</p>

    }

}