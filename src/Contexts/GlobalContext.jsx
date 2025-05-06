import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

export default GlobalContext;
function GlobalProvider({ children }) {

    const url = `http://localhost:3000/api/vinyls`
    const [vinyls, setVinyls] = useState([])
    const [isLoading, setIsLoading] = useState('loading')

    useEffect(() => {

        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setVinyls(data)
                setIsLoading('success')
            })
            .catch(err => {
                console.error(err)
                setIsLoading('error')
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                vinyls,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobalContext };