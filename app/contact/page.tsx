import { UnderConstruction } from '@/components/under-construction'
import { Mail } from 'lucide-react'

export const metadata = {
  title: 'Contato | GreenCheck',
  description: 'Página em construção - Fale conosco',
}

export default function ContactPage() {
  return (
    <UnderConstruction
      title="Fale Conosco"
      description="Estamos desenvolvendo um formulário de contato moderno e eficiente. Por enquanto, você pode nos contatar diretamente por email."
      icon={<Mail size={64} className="text-[#34C759]" strokeWidth={1.5} />}
    />
  )
}






