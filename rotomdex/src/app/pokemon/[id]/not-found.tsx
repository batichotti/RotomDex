import styles from './page.module.css';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1>pokemon not found</h1>
            <p>change the name or id and try again</p>
            <Link href="/pokemon">back to pokedex</Link>
        </div>
    );
}