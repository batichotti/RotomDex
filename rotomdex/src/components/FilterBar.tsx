import styles from './FilterBar.module.css' // Importar estilo da FilterBar

// Função FilterBar
export default function FilterBar({ children }: { children: React.ReactNode }) {
  // HTML
  return (
    <div className={styles.bar}>
      {children}
    </div>
  )
}