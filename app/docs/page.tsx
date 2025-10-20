import { UnderConstruction } from '@/components/under-construction'
import { FileText } from 'lucide-react'

export const metadata = {
  title: 'Documentação | GreenCheck',
  description: 'Página em construção - Documentação da API',
}

export default function DocsPage() {
  return (
    <UnderConstruction
      title="Documentação"
      description="Estamos preparando documentação completa da API e guias de integração para desenvolvedores utilizarem nosso sistema de certificação ESG."
      icon={<FileText size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}








