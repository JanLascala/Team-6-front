import { useGlobalContext } from "../Contexts/GlobalContext";
import Carousel from "../Components/dumb/carousel";
import LoadingUi from "../Components/dumb/LoadingUi"
import ServerErrorPage from "../Components/dumb/ServerErrorUi";
export default function HomePage() {
    const { vinyls, isLoading } = useGlobalContext();

    const renderList = () => {
        switch (isLoading) {

            case 'loading':
                return <LoadingUi />

            case 'success':


                return (
                    <Carousel array={vinyls} />
                )

            case 'error':
                return <ServerErrorPage error={"error"} />

            default:
                return <p>Unknown status</p>

        }
    }

    return (
        <>
            <h1 className="mb-4">Home page</h1>
            {renderList()}
        </>
    )
}