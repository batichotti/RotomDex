import type { PokemonMove } from "@/types/moves"

const METHOD_ORDER = ["level-up", "egg", "machine", "tutor"]

export default function PokemonMoves({ moves }: { moves: PokemonMove[] }) {
    const grouped = moves.reduce<Record<string, PokemonMove[]>>((acc, pm) => {
        const method = pm.move_learn_method
        if (!acc[method]) acc[method] = []
        acc[method].push(pm)
        return acc
    }, {})

    const methods = Object.keys(grouped).sort((a, b) => {
        const ia = METHOD_ORDER.indexOf(a)
        const ib = METHOD_ORDER.indexOf(b)
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
    })

    return (
        <div className="space-y-6">
            {methods.map((method) => {
                const list = [...grouped[method]].sort(
                    (a, b) => a.level_learned_at - b.level_learned_at
                )

                return (
                    <section key={method}>
                        <h3 className="mb-2 text-base font-semibold capitalize">
                            {method}
                        </h3>

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs uppercase text-gray-500">
                                    {method === "level-up" && <th className="py-1 pr-2">Nv.</th>}
                                    <th className="py-1 pr-2">Type</th>
                                    <th className="py-1 pr-2">Name</th>
                                    <th className="py-1 pr-2">Category</th>
                                    <th className="py-1 pr-2">PP</th>
                                    <th className="py-1 pr-2">Damage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((pm) => (
                                    <tr key={`${pm.move_id}-${pm.move_learn_method}`} className="border-t">
                                        {method === "level-up" && (
                                            <td className="py-1 pr-2">{pm.level_learned_at}</td>
                                        )}
                                        <td className="py-1 pr-2 capitalize">{pm.move.type}</td>
                                        <td className="py-1 pr-2 capitalize">{pm.move.name}</td>
                                        <td className="py-1 pr-2 capitalize">{pm.move.category ?? "-"}</td>
                                        <td className="py-1 pr-2">{pm.move.pp}</td>
                                        <td className="py-1 pr-2">{pm.move.power ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )
            })}
        </div>
    )
}