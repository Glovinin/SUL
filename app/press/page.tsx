import { UnderConstruction } from '@/components/under-construction'
import { Newspaper } from 'lucide-react'

export const metadata = {
  title: 'Imprensa | GreenCheck',
  description: 'Página em construção - Material para Imprensa',
}

export default function PressPage() {
  return (
    <UnderConstruction
      title="Imprensa"
      description="Kit de imprensa, comunicados e material para mídia estarão disponíveis em breve. Jornalistas podem nos contatar diretamente."
      icon={<Newspaper size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}







