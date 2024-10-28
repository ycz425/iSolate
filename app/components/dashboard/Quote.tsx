"use client"

import quotesData from "@/app/data/quotes.json"
import clsx from "clsx"
import { useEffect, useState } from "react"

export default function Quote() {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
        const randIndex = Math.floor(Math.random() * quotesData.quotes.length)
        setQuote(quotesData.quotes[randIndex].quote)
        setAuthor(quotesData.quotes[randIndex].author)

        const transitionInterval = setInterval(() => {
            setShow(false)
            clearInterval(transitionInterval)
        }, 28000)

        const quoteInterval = setInterval(() => {
            const randIndex = Math.floor(Math.random() * quotesData.quotes.length)
            setQuote(quotesData.quotes[randIndex].quote)
            setAuthor(quotesData.quotes[randIndex].author)
            setShow(true)

            const transitionInterval = setInterval(() => {
                setShow(false)
                clearInterval(transitionInterval)
            }, 28000)
            
        }, 30000)

        return () => {
            clearInterval(quoteInterval)
            
        }
    }, [])

    return (
        <div className={clsx("absolute left-1/2 text-center -translate-x-1/2 top-[10%] font-extralight flex flex-col items-center gap-3 transition-all duration-1000", {"opacity-0": !show})}>
            <p className="text-neutral-500 text-md italic">{quote}</p>
            <p className="text-neutral-500 text-sm">{`– ${author}`}</p>
        </div>
    )
}