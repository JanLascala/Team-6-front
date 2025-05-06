import { useGlobalContext } from "../Contexts/GlobalContext"

export default function Vinyls() {
    const { vinyls } = useGlobalContext()

    return (
        <>
            <h1 className="mb-4">Vinyls</h1>
            <ul>
                {
                    vinyls.map(vinyl => (
                        <li key={vinyl.id}>{vinyl.title} {vinyl.authorName}</li>
                    ))
                }
            </ul>
        </>
    )
}