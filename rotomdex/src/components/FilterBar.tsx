import styles from './FilterBar.module.css'

export default function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.bar}>
      {children}
    </div>
  )
}