import { UnderConstruction } from '@/components/under-construction'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidade | GreenCheck',
  description: 'Página em construção - Política de Privacidade do GreenCheck',
}

export default function PrivacyPage() {
  return (
    <UnderConstruction
      title="Política de Privacidade"
      description="Estamos preparando nossa política de privacidade completa para garantir total transparência sobre como protegemos seus dados. GDPR compliant."
      icon={<Shield size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}



