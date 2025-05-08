import { useGlobalContext } from "../Contexts/GlobalContext";
import Jumbotron from "../Components/dumb/Jumbotron";
import Carousel from "../Components/dumb/Carousel";
import LoadingUi from "../Components/dumb/LoadingUi"
import ServerErrorPage from "../Components/dumb/ServerErrorUi";
import sortBy from "../functions/sortBy";


export default function HomePage() {
    const { vinyls } = useGlobalContext();

    switch (vinyls.state) {

        case 'loading':
            return <LoadingUi />

        case 'success':


            return (
                <>
                    <Jumbotron />
                    <Carousel array={sortBy("recent", vinyls.vinyl_data)} />
                    <Carousel array={sortBy("A-Z", vinyls.vinyl_data)} />
                </>
            )

        case 'error':
            return <ServerErrorPage error={vinyls.message} />

        default:
            return <p>Unknown status</p>

    }

}