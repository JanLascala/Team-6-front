import { useGlobalContext } from "../Contexts/GlobalContext"

export default function Vinyls() {
    const { vinyls, isLoading } = useGlobalContext();

    const renderList = () => {
        switch (isLoading) {

            case 'loading':
                return <p>Loading...</p>

            case 'success':
                return (
                    <ul>
                        {vinyls.map(vinyl => (
                            <li key={vinyl.id}>{vinyl.title}</li>
                        ))}
                    </ul>
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