import { UnderConstruction } from '@/components/under-construction'
import { Briefcase } from 'lucide-react'

export const metadata = {
  title: 'Carreiras | GreenCheck',
  description: 'Página em construção - Trabalhe Conosco',
}

export default function CareersPage() {
  return (
    <UnderConstruction
      title="Carreiras"
      description="Estamos montando nosso time! Em breve teremos vagas abertas para desenvolvedores, cientistas de dados e especialistas em ESG. Acompanhe."
      icon={<Briefcase size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}



