import { capitalize } from '@/utils/utils'
import Image from 'next/image'
import styles from './TypeIcon.module.css'
import { TYPE_COLORS } from '@/utils/TypeColors';

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