"use client"

import { createContext, useContext, useState } from "react"

const DarkModeContext = createContext<object>({ darkMode: false, setDarkMode: () => {} })

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