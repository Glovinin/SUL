import { UnderConstruction } from '@/components/under-construction'
import { Cookie } from 'lucide-react'

export const metadata = {
  title: 'Política de Cookies | GreenCheck',
  description: 'Página em construção - Política de Cookies do GreenCheck',
}

export default function CookiesPage() {
  return (
    <UnderConstruction
      title="Política de Cookies"
      description="Nossa política de cookies está sendo desenvolvida para explicar como utilizamos cookies para melhorar sua experiência na plataforma."
      icon={<Cookie size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}






