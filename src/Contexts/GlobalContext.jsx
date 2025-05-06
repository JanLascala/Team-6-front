import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

export default GlobalContext;
function GlobalProvider({ children }) {

    const url = `http://localhost:3000/api/vinyls`
    const [vinyls, setVinyls] = useState([])

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
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                vinyls
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