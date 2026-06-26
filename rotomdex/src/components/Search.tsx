"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Search.module.css";

export default function Search() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return;
        router.push(`/pokemon/${trimmed}`);
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch(e as any)}
                placeholder="search pokémon..."
                className={styles.input}
            />
            <button onClick={handleSearch} className={styles.button}>
                search
            </button>
        </div>
    );
}