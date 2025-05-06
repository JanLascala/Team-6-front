import { useGlobalContext } from "../Contexts/GlobalContext";
import Carousel from "../Components/dumb/carousel";
export default function HomePage() {
    const { vinyls, isLoading } = useGlobalContext();

    const renderList = () => {
        switch (isLoading) {

            case 'loading':
                return <p>Loading...</p>

            case 'success':
                // return (
                //     <ul>
                //         {vinyls.map(vinyl => (
                //             <li key={vinyl.id}>{vinyl.authorName}</li>
                //         ))}
                //     </ul>
                // )

                return (
                    <Carousel array={vinyls} />
                )

            case 'error':
                return <p>Fetching error</p>

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