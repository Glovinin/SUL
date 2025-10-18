import { UnderConstruction } from '@/components/under-construction'
import { Code } from 'lucide-react'

export const metadata = {
  title: 'API | GreenCheck',
  description: 'Página em construção - API de Integração',
}

export default function ApiPage() {
  return (
    <UnderConstruction
      title="API GreenCheck"
      description="Documentação completa da API REST e exemplos de integração para desenvolvedores estarão disponíveis em breve."
      icon={<Code size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}







