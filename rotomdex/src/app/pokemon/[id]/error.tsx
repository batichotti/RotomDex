'use client' // Error components precisam ser client components

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Aqui você vai finalmente ver o erro que estava escondido!
    console.error("O erro que causou a tela branca:", error)
  }, [error])

  return (
    <div>
      <h2>Algo deu errado na renderização!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Tentar novamente</button>
    </div>
  )
}