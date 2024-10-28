"use client"

import { createContext, useContext, useState } from "react"

const DarkModeContext = createContext({ darkMode: false, toggleDarkMode: () => {} })

export const useDarkModeContext = () => {
    return useContext(DarkModeContext)
}

export default function DarkModeContextProvider({ children }: Readonly<{children: React.ReactNode}>) {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}