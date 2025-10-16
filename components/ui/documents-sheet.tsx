"use client"

import { useState, useEffect } from 'react'
import { FileText, Download, ExternalLink, File, Presentation, X } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from './sheet'
import { Button } from './button'

interface Document {
  title: string
  description: string
  url: string
  icon: 'pdf' | 'patent' | 'presentation'
  size?: string
}

const documents: Document[] = [
  {
    title: "Business Plan",
    description: "Comprehensive business plan with financial projections and market analysis",
    url: "https://drive.google.com/file/d/1QFMMJ_LAXzfLv2LZtK_YJ7yBC_Qt5_wo/view?usp=drive_link",
    icon: "pdf",
    size: "2.4 MB"
  },
  {
    title: "Patent Documentation",
    description: "Intellectual property protection and patent filing documentation",
    url: "https://drive.google.com/file/d/1pWlKJlYX-z3teTMGSp1pBfgyaoADzYB-/view?usp=drive_link",
    icon: "patent",
    size: "1.8 MB"
  },
  {
    title: "Investor Presentation",
    description: "Detailed pitch deck with vision, technology, and investment opportunity",
    url: "https://drive.google.com/file/d/10Un0MlTsY6HmFTAHK4G8BcpvV_12uPUj/view?usp=drive_link",
    icon: "presentation",
    size: "3.2 MB"
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return FileText
    case 'patent':
      return File
    case 'presentation':
      return Presentation
    default:
      return FileText
  }
}

interface DocumentsSheetProps {
  trigger?: React.ReactNode
}

export function DocumentsSheet({ trigger }: DocumentsSheetProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const navbar = document.querySelector('nav')
    if (!navbar) return

    if (open && window.innerWidth >= 768) {
      // Desktop: Esconder navbar com animação suave
      navbar.style.transition = 'transform 0.3s ease-in-out'
      navbar.style.transform = 'translateY(-100%)'
    } else {
      // Mostrar navbar
      navbar.style.transform = 'translateY(0)'
    }

    return () => {
      // Cleanup: garantir que navbar volta ao normal
      if (navbar) {
        navbar.style.transform = 'translateY(0)'
      }
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="default" className="rounded-full">
            View Documents
          </Button>
        )}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-white/95 backdrop-blur-xl border-none shadow-2xl overflow-y-auto p-0 z-[9999]"
        style={{
          zIndex: 9999
        }}
      >
        {/* Header com botão de fechar */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-10">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex-1">
              <h2 className="text-xl font-light text-[#044050] tracking-tight mb-1">
                Documents
              </h2>
              <p className="text-xs text-gray-500 font-light">
                Confidential materials
              </p>
            </div>
            <SheetClose asChild>
              <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </SheetClose>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-3">
          {documents.map((doc, index) => {
            const Icon = getIcon(doc.icon)
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#044050] to-[#033842] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-[#044050] tracking-tight leading-tight">
                      {doc.title}
                    </h3>
                    {doc.size && (
                      <p className="text-xs text-gray-400 font-light mt-0.5">
                        {doc.size}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 font-light leading-relaxed mb-4">
                  {doc.description}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => window.open(doc.url, '_blank')}
                  className="w-full group/btn bg-[#044050] hover:bg-[#5FA037] text-white rounded-xl h-9 text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Open Document</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer Warning */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4">
          <div className="flex items-start gap-2 bg-amber-50/50 border border-amber-200/50 rounded-xl p-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-amber-800 font-light leading-relaxed flex-1">
              <span className="font-medium">Confidential:</span> Do not share without authorization.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

