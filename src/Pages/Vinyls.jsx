import VinylSearch from "../Components/VinylSearch";
import { useGlobalContext } from "../Contexts/GlobalContext"

export default function Vinyls() {
    const { vinyls, isLoading } = useGlobalContext();

    const renderList = () => {
        switch (isLoading) {

            case 'loading':
                return <p>Loading...</p>

            case 'success':
                return (
                    <VinylSearch />
                )

            case 'error':
                return <p>Fetching error</p>

            default:
                return <p>Unknown status</p>

        }
    }

    return (
        <>
            <h1 className="mb-4">Vinyls</h1>
            {renderList()}
        </>
    )
}