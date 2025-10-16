import { UnderConstruction } from '@/components/under-construction'
import { Award } from 'lucide-react'

export const metadata = {
  title: 'Licenças | GreenCheck',
  description: 'Página em construção - Licenças Open Source',
}

export default function LicensesPage() {
  return (
    <UnderConstruction
      title="Licenças"
      description="Informações sobre licenças de software open source utilizadas no projeto e atribuições estarão disponíveis em breve."
      icon={<Award size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}



