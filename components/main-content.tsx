"use client"

import { ReactNode } from 'react'
import { useLoading } from '../contexts/loading-context'

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const { isInitialLoading } = useLoading()

  // Renderizar sempre o conteúdo para permitir que o vídeo toque no fundo (InitialLoading fica por cima)
  // if (isInitialLoading) {
  //   return null
  // }

  return <>{children}</>
}
