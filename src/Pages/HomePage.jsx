import { useGlobalContext } from "../Contexts/GlobalContext"

export default function HomePage() {
    const { vinyls } = useGlobalContext()

    return (
        <>
            <h1 className="mb-4">This is home page</h1>
            <ul>
                {
                    vinyls.map(vinyl => (
                        <li key={vinyl.id}>{vinyl.title} {vinyl.publisherName}</li>
                    ))
                }
            </ul>
        </>
    )
}