"use client"

import { createContext, useContext, useState } from "react"

const DarkModeContext = createContext({ darkMode: false, setDarkMode: (darkMode: boolean) => {} })

export const useDarkModeContext = () => {
    return useContext(DarkModeContext)
}

export default function DarkModeContextProvider({ children }: Readonly<{children: React.ReactNode}>) {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}