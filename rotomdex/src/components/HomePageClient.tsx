// components/HomePageClient.tsx
"use client";

import { useState, useTransition } from "react";
import PokemonCard from "@/components/PokemonCard";
import { getRandomTeam, type TeamData } from "@/utils/getRandomTeam";
import styles from "@/app/home/homePage.module.css";

export default function HomePageClient({ initialData }: { initialData: TeamData }) {
    const [data, setData] = useState<TeamData>(initialData);
    const [isPending, startTransition] = useTransition();

    function handleShuffle() {
        startTransition(async () => {
            const newData = await getRandomTeam();
            setData(newData);
        });
    }

    return (
        <div>
            <div className={styles.header}>
                <button
                    onClick={handleShuffle}
                    disabled={isPending}
                    className={styles.shuffleButton}
                >
                    {isPending ? "sorting" : "new team"}
                </button>
            </div>

            <div className={`${styles.grid} ${isPending ? styles.loading : ""}`}>
                {data.team.map((pokemon, i) => (
                    <div key={pokemon.id} className={styles.card}>
                        <PokemonCard pokemon={pokemon} />
                        <div className={styles.moves}>
                            <div className={styles.ability}>
                                <span>ABILITY</span>
                                {data.randomAbility[i]?.ability_name.replaceAll("-", " ")}
                            </div>
                            <div className={styles.movesLabel}>MOVES</div>
                            <ul>
                                {data.randomMoves[i].map(move => (
                                    <li key={move.move_id}>
                                        {move.move_name.replaceAll("-", " ")}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}