"use client"

import { createContext, useState } from "react"

export default function DarkModeContextProvider({ children }: Readonly<{children: React.ReactNode}>) {
    const [darkMode, setDarkMode] = useState(false)
    const DarkModeContext = createContext({ darkMode, setDarkMode })

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}