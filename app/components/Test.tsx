"use client"

export default function Tester() {
    async function handleClick() {
        await fetch("/api/tasks", { method: "GET" })
    }

    return (
        <button onClick={handleClick}>
            API Tester
        </button>
    )
}