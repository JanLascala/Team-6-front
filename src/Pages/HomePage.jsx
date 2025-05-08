import { useGlobalContext } from "../Contexts/GlobalContext";
import Jumbotron from "../Components/dumb/Jumbotron";
import Carousel from "../Components/dumb/Carousel";
import LoadingUi from "../Components/dumb/LoadingUi"
import ServerErrorPage from "../Components/dumb/ServerErrorUi";
import filterByText from "../functions/filterByText";
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
                    {/* for possible sorts check the sortBy and filterByText functions */}
                    <h1>Recent Releases</h1>
                    <Carousel array={sortBy("recent", vinyls.vinyl_data)} />
                    <h1>Our Classics!</h1>
                    <Carousel array={filterByText(vinyls, "classical", "genre")} />
                    <h1>Hip Hop Hits!</h1>
                    <Carousel array={filterByText(vinyls, "hip hop", "genre")} />
                </>
            )

        case 'error':
            return <ServerErrorPage error={vinyls.message} />

        default:
            return <p>Unknown status</p>

    }

}