export function hexToRgb(hex: string) {
    const normalized = hex.trim().replace(/^#/, "")
    const fullHex = normalized.length === 3
        ? normalized.split("").map((char) => char + char).join("")
        : normalized
    const r = parseInt(fullHex.slice(0, 2), 16)
    const g = parseInt(fullHex.slice(2, 4), 16)
    const b = parseInt(fullHex.slice(4, 6), 16)
    return `${r}, ${g}, ${b}`
}