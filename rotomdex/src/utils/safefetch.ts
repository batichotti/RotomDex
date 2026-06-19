export async function safeFetch<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url)

        if (!res.ok) {
            console.error(`Erro ${res.status} ao buscar ${url}`)
            return null
        }

        return await res.json()
    } catch (error) {
        console.error(`Erro ao buscar ${url}:`, error)
        return null
    }
}
