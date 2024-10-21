export function formatForInput(str: string) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date(str))
    return `${parts[0].value}-${parts[2].value}-${parts[4].value}`
}