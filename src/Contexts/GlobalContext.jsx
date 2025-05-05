import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();

export default GlobalContext;
function GlobalProvider({ children }) {

    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>

    )
}

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}
export { GlobalProvider, useGlobalContext };