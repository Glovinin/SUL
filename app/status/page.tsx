import { UnderConstruction } from '@/components/under-construction'
import { Activity } from 'lucide-react'

export const metadata = {
  title: 'Status do Sistema | GreenCheck',
  description: 'Página em construção - Status e Monitoramento',
}

export default function StatusPage() {
  return (
    <UnderConstruction
      title="Status do Sistema"
      description="Painel de monitoramento em tempo real da plataforma estará disponível em breve. Todos os sistemas operacionais! ✅"
      icon={<Activity size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}








