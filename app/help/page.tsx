import { UnderConstruction } from '@/components/under-construction'
import { HelpCircle } from 'lucide-react'

export const metadata = {
  title: 'Central de Ajuda | GreenCheck',
  description: 'Página em construção - Central de Ajuda',
}

export default function HelpPage() {
  return (
    <UnderConstruction
      title="Central de Ajuda"
      description="Nossa base de conhecimento e FAQ estão sendo preparadas para ajudá-lo a aproveitar ao máximo a plataforma GreenCheck."
      icon={<HelpCircle size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}



