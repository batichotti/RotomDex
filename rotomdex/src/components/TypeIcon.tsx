import { capitalize } from '@/utils/utils'
import Image from 'next/image'
import styles from './TypeIcon.module.css'

const TYPE_COLORS = {
    'normal': '#A0A3A0',
    'water': '#3393DD',
    'fire': '#DA2C33',
    'grass': '#02913A',
    'electric': '#FBD200',
    'ground': '#E97333',
    'rock': '#C9B787',
    'dark': '#5B5366',
    'steel': '#5A8FA3',
    'ice': '#4BD2C1',
    'fighting': '#E12C6A',
    'poison': '#B667CF',
    'ghost': '#594593',
    'psychic': '#FF6676',
    'fairy': '#FB8AEC',
    'dragon': '#006FC9',
    'flying': '#89AAE3',
    'bug': '#82C200',
} as const;

export default function TypeIcon({ primary_type, secondary_type }: { primary_type: string; secondary_type?: string }) {
    const hasSecondary = secondary_type && secondary_type !== 'None';

    return (
        <div className={styles.container}>
            <div style={{
                backgroundColor: TYPE_COLORS[primary_type as keyof typeof TYPE_COLORS],
                minHeight: hasSecondary ? '44px' : '90px',
            }} className={`${styles.typeSection} ${styles.primaryType}`}>
                <Image
                    src={`/assets/types/.svg/${capitalize(primary_type)} Type Icon.svg`}
                    alt={capitalize(primary_type)}
                    width={28}
                    height={28}
                    className={styles.image}
                    loading="eager"
                />
            </div>
            {hasSecondary && (
                <div style={{
                    backgroundColor: TYPE_COLORS[secondary_type as keyof typeof TYPE_COLORS],
                }} className={`${styles.typeSection} ${styles.secondaryType}`}>
                    <Image
                        src={`/assets/types/.svg/${capitalize(secondary_type)} Type Icon.svg`}
                        alt={capitalize(secondary_type)}
                        width={28}
                        height={28}
                        className={styles.image}
                        loading="eager"
                    />
                </div>
            )}
        </div>
    );
}