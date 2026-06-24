import { capitalize } from "@/utils/utils"
import { TYPE_COLORS } from "@/utils/TypeColors"
import styles from "./PokemonMoves.module.css"
import Image from "next/image"
import { hexToRgb } from "../utils/hexToGgb"

export function TypeIconBadge({
    type,
    width,
    height
}: {
    type: string
    width: number
    height: number
}) {
    const color = TYPE_COLORS[type as keyof typeof TYPE_COLORS]

    return (
        <span
            className={styles.typeIcon}
            style={{
                backgroundColor: `rgba(${hexToRgb(color)}, 0.6)`,
                width,
                height
            }}
            title={capitalize(type)}
        >
            <Image
                src={`/assets/types/.svg/${capitalize(type)} Type Icon.svg`}
                alt={capitalize(type)}
                width={width * 0.6}
                height={height * 0.6}
                className={styles.typeIconImg}
                loading="eager"
            />
        </span>
    )
}