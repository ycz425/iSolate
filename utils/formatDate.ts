export function formatForInput(str: string) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }).formatToParts(new Date(str))
    return `${parts[0].value}-${parts[2].value}-${parts[4].value}T${parts[6].value}:${parts[8].value}`
}

export function formatForPostgres(date: string) {

}