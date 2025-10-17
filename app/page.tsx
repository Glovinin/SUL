import { Button } from '../components/ui/button'
import { ArrowRight, Shield, Globe, Cpu, TrendingUp, Leaf, CheckCircle2, Upload, BarChart3, Users, Zap, FileText } from 'lucide-react'
import { Navbar } from '../components/navbar'
import Footer from '@/components/ui/footer'
import Image from 'next/image'
import ClientWrapper from '@/components/client-wrapper'
import HeroSection from '@/components/homepage/hero-section'

// Main GreenCheck features - Static content for SEO
const features = [
  {
    title: "Advanced Artificial Intelligence",
    description: "Specialized OCR and NLP with 98.5% accuracy in ESG data extraction",
    icon: <Cpu className="w-6 h-6" />
  },
  {
    title: "Automated Scientific Validation",
    description: "Integrated APIs with recognized scientific institutions for real-time validation",
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "Blockchain Certification",
    description: "Immutable NFTs on Polygon network with embedded scientific metadata",
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    title: "Carbon Marketplace",
    description: "AI-powered offset recommendations with satellite monitoring",
    icon: <Leaf className="w-6 h-6" />
  }
]

// GreenCheck statistics and impact - Static content for SEO
const impactStats = [
  {
    value: "2.4M",
    label: "European SMEs",
    description: "Companies requiring CSRD certification by 2025",
    icon: <Users className="w-8 h-8" />
  },
  {
    value: "€8.5B",
    label: "Annual Market",
    description: "Opportunity in European ESG certification market",
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    value: "98.5%",
    label: "AI Accuracy",
    description: "Accuracy rate in ESG data extraction",
    icon: <Cpu className="w-8 h-8" />
  },
  {
    value: "4x",
    label: "Faster",
    description: "Compared to traditional certification methods",
    icon: <Zap className="w-8 h-8" />
  }
]

const certificationPartners = [
  {
    name: "Plantarum Botanical Garden",
    role: "Scientific Validation",
    description: "Partnership for environmental data validation via institutional APIs from Rio de Janeiro"
  },
  {
    name: "Polygon Network",
    role: "Blockchain Certificate",
    description: "Immutable NFTs with embedded scientific metadata"
  },
  {
    name: "Sentinel-2 Satellite",
    role: "Orbital Monitoring",
    description: "Carbon offset verification via satellite data"
  }
]

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      
      {/* Hero Section - Client-side interactive */}
      <ClientWrapper>
        <HeroSection />
      </ClientWrapper>

      {/* Content Container - Scrolls over fixed hero (All devices) */}
      <main className="relative z-10 mt-[100vh]">
      
      {/* O Que Fazemos - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-white rounded-t-[48px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              What We Do
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-[#044050]">Sustainability</span>
              <br />
              <span className="font-normal text-[#5FA037]">without complexity</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 font-light leading-relaxed">
              Integrated platform for ESG certification and carbon neutralization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: CheckCircle2,
                title: "Automated Certification",
                description: "98.5% accuracy with AI"
              },
              {
                icon: Shield,
                title: "Immutable Blockchain",
                description: "NFTs on Polygon network"
              },
              {
                icon: Leaf,
                title: "Scientific Validation",
                description: "Recognized partners"
              },
              {
                icon: Globe,
                title: "100% Digital",
                description: "Simple and intuitive"
              }
            ].map((item, index) => {
              const ItemIcon = item.icon
              return (
                <div key={index} className="group text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#044050] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#5FA037]">
                      <ItemIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-[#044050] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Learn More Button */}
          <div className="flex justify-center mt-16">
            <Button
              className="px-10 h-12 bg-[#044050] text-white hover:bg-[#5FA037] rounded-full transition-all duration-300 font-normal tracking-wide group"
            >
              <span className="flex items-center justify-center">
                Learn More About GreenCheck
                <ArrowRight className="ml-3 w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Coluna Esquerda - Texto */}
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-6">
                Technology
              </p>
              <h2 className="text-4xl lg:text-5xl font-light mb-8 tracking-tight leading-[1.15]">
                <span className="font-extralight text-[#044050]">The power of</span>
                <br />
                <span className="font-medium text-[#5FA037]">innovation</span>
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Cutting-edge technology for accurate and reliable ESG certification
              </p>
            </div>

            {/* Coluna Direita - Stack Tecnológico */}
            <div className="space-y-8">
              {/* AI */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-[#044050]">Artificial Intelligence</h3>
                </div>
                <ul className="space-y-2 text-gray-600 font-light ml-16">
                  <li>• Automatic data extraction</li>
                  <li>• Carbon emission calculation</li>
                  <li>• Multi-standard compliance</li>
                </ul>
              </div>

              {/* Blockchain */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-[#044050]">Blockchain</h3>
                </div>
                <ul className="space-y-2 text-gray-600 font-light ml-16">
                  <li>• NFT certificates on Polygon</li>
                  <li>• Cost &lt; €0.01 per transaction</li>
                  <li>• Instant QR verification</li>
                </ul>
              </div>

              {/* Scientific */}
              <div className="pb-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#044050] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-[#044050]">Scientific Validation</h3>
                </div>
                <ul className="space-y-2 text-gray-600 font-light ml-16">
                  <li>• Botanical garden partnership</li>
                  <li>• International methodologies</li>
                  <li>• Continuous monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preços - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Pricing
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-[#044050]">Simple pricing</span>
              <br />
              <span className="font-normal text-[#5FA037]">for everyone</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 font-light">
              From individuals to large enterprises
            </p>
          </div>
          
          {/* Plans Grid - Minimal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'SMEs', title: 'ESG Certificate', price: '€35', unit: 'per tCO₂e', desc: 'For small businesses' },
              { label: 'People', title: 'Subscription', price: '€9.99', unit: 'per month', desc: 'For individuals' },
              { label: 'Corporate', title: 'Enterprise', price: '€2,500', unit: 'per month', desc: 'Custom solutions' },
              { label: 'All', title: 'Marketplace', price: '8%', unit: 'commission', desc: 'Carbon credits' }
            ].map((plan, index) => (
              <div key={index} className="group">
                <div className="border border-gray-200 rounded-3xl p-8 hover:border-[#5FA037] transition-colors duration-300">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-8">{plan.label}</p>
                  <h3 className="text-2xl font-medium text-[#044050] mb-2">{plan.title}</h3>
                  <p className="text-sm text-gray-500 font-light mb-8">{plan.desc}</p>
                  <div className="mb-8">
                    <div className="text-4xl font-light text-black mb-1">{plan.price}</div>
                    <div className="text-sm text-gray-500 font-light">{plan.unit}</div>
                  </div>
                  <Button 
                    className="w-full h-11 bg-[#5FA037] hover:bg-[#4d8c2d] text-white rounded-full transition-all duration-300 font-normal"
                  >
                    {index === 2 ? 'Contact' : index === 3 ? 'Explore' : 'Start'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Why Choose Us
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-[#044050]">Better, faster</span>
              <br />
              <span className="font-normal text-[#5FA037]">more affordable</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 font-light">
              Measurable advantages over traditional solutions
            </p>
          </div>
          
          {/* Simple Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {[
              { value: '40%', label: 'Cheaper' },
              { value: '4×', label: 'Faster' },
              { value: '98.5%', label: 'Accuracy' },
              { value: '100%', label: 'Transparent' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl lg:text-6xl font-extralight text-[#5FA037] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 font-light uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Partners
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-[#044050]">Scientific</span>
              <br />
              <span className="font-normal text-[#5FA037]">validation</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 font-light">
              Working with leading institutions for certification credibility
            </p>
          </div>
          
          {/* Partners List - Minimal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {certificationPartners.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-[#044050] flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-[#5FA037]">
                  {index === 0 && <Leaf className="w-8 h-8 text-white" />}
                  {index === 1 && <Shield className="w-8 h-8 text-white" />}
                  {index === 2 && <Globe className="w-8 h-8 text-white" />}
                </div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{partner.role}</p>
                <h3 className="text-xl font-medium text-[#044050] mb-3">{partner.name}</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact & SDGs - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Social Impact
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-[#044050]">Contributing to</span>
              <br />
              <span className="font-normal text-[#5FA037]">global goals</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 font-light leading-relaxed mb-12">
              Aligned with 6 United Nations Sustainable Development Goals
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: '2M+', label: 'tCO₂e Target', sublabel: 'by 2031', icon: Leaf },
              { value: '8+', label: 'Countries', sublabel: 'Presence', icon: Globe },
              { value: '95', label: 'Team Members', sublabel: 'Goal', icon: Users },
              { value: '€1B+', label: 'Valuation', sublabel: 'Target', icon: TrendingUp }
            ].map((metric, index) => {
              const MetricIcon = metric.icon
              return (
                <div key={index} className="text-center group">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#044050]">
                      <MetricIcon className="w-6 h-6 text-[#5FA037] transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  <div className="text-5xl font-extralight text-[#044050] mb-1 tracking-tight">{metric.value}</div>
                  <p className="text-sm font-medium text-gray-600 mb-0.5">{metric.label}</p>
                  <p className="text-xs font-light text-gray-400">{metric.sublabel}</p>
                </div>
              )
            })}
          </div>

          {/* SDGs Grid */}
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.25em] mb-6">
              Real Impact
            </p>
            <h3 className="text-3xl md:text-4xl font-light text-[#044050] mb-3 tracking-tight">
              <span className="font-light">Aligned with </span>
              <span className="text-[#5FA037] font-light">UN SDGs</span>
            </h3>
          </div>

          {/* Grid de SDGs - Design Criativo e Impactante */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                number: '13', 
                name: 'Climate Action',
                image: '/assets/SDG LOGO/E_SDG_PRINT-13.jpg',
                color: '#4E7A47'
              },
              { 
                number: '15', 
                name: 'Life on Land',
                image: '/assets/SDG LOGO/E_SDG_PRINT-15.jpg',
                color: '#3DAE4A'
              },
              { 
                number: '8', 
                name: 'Decent Work & Economic Growth',
                image: '/assets/SDG LOGO/E_SDG_PRINT-08.jpg',
                color: '#972E47'
              },
              { 
                number: '9', 
                name: 'Industry, Innovation & Infrastructure',
                image: '/assets/SDG LOGO/E_SDG_PRINT-09.jpg',
                color: '#F16E25'
              },
              { 
                number: '12', 
                name: 'Responsible Consumption & Production',
                image: '/assets/SDG LOGO/E_SDG_PRINT-12.jpg',
                color: '#CD8C2E'
              },
              { 
                number: '17', 
                name: 'Partnerships for the Goals',
                image: '/assets/SDG LOGO/E_SDG_PRINT-17.jpg',
                color: '#28426E'
              }
            ].map((sdg, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg border border-gray-50/50 h-[360px] relative overflow-hidden group">
                  
                  {/* JPG do SDG - Tamanho fixo para evitar layout shift */}
                  <div className="w-40 h-40 mb-4 flex-shrink-0 relative">
                    <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={sdg.image}
                        alt={`SDG ${sdg.number} - ${sdg.name}`}
                        width={160}
                        height={160}
                        className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Conteúdo minimalista - Tipografia otimizada */}
                  <div className="text-center flex flex-col items-center justify-center relative w-full px-2">
                    {/* Número do SDG - Tamanho otimizado para mobile */}
                    <span className="text-5xl font-thin text-[#044050] mb-1 tracking-[-0.03em] leading-none">
                      {sdg.number}
                    </span>
                    
                    {/* Nome do SDG - Compacto para mobile */}
                    <span className="text-xs font-light text-gray-600 uppercase tracking-[0.08em] text-center leading-[1.1] w-full">
                      {sdg.name}
                    </span>
                  </div>
                  
                  {/* Hover indicator simples */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#5FA037] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency & Commitment - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em] mb-4">
              Transparency & Governance
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-[#044050]">Built on</span>
              <br />
              <span className="font-normal text-[#5FA037]">trust & accountability</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 font-light leading-relaxed mb-12">
              Our commitment to transparency isn't just a value — it's embedded in every layer of our technology and governance
            </p>
          </div>

          {/* Anti-Greenwashing Pledge */}
          <div className="bg-[#044050] rounded-3xl p-10 mb-12 text-white text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-[#5FA037]" />
            <h3 className="text-2xl font-light mb-4 tracking-tight">Anti-Greenwashing Pledge</h3>
            <p className="text-base font-light opacity-90 leading-relaxed max-w-3xl mx-auto">
              We pledge to combat greenwashing through scientific validation, blockchain transparency, and independent audits. 
              Every certificate we issue is backed by verifiable data and third-party scientific institutions.
            </p>
          </div>

          {/* Governance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: 'Independent Audits',
                description: 'Annual audits by recognized third-party institutions',
                items: ['Financial transparency', 'Impact verification', 'Technical validation']
              },
              {
                icon: BarChart3,
                title: 'Public Dashboard',
                description: 'Real-time metrics accessible to all stakeholders',
                items: ['CO₂ offset tracking', 'Certificate issuance', 'Impact metrics']
              },
              {
                icon: Shield,
                title: 'Impact Advisory Board',
                description: 'Independent experts ensuring technical excellence',
                items: ['Scientific rigor', 'Methodology review', 'Anti-greenwashing']
              },
              {
                icon: FileText,
                title: 'Annual Reports',
                description: 'Comprehensive socio-environmental impact reports',
                items: ['ESG performance', 'Financial results', 'Sustainability goals']
              }
            ].map((item, index) => {
              const ItemIcon = item.icon
              return (
                <div key={index} className="group">
                  <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#5FA037]">
                      <ItemIcon className="w-7 h-7 text-[#5FA037] transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-[#044050] mb-2 tracking-tight text-center">{item.title}</h3>
                  <p className="text-sm font-light text-gray-500 mb-4 text-center">{item.description}</p>
                  <div className="space-y-2">
                    {item.items.map((subitem, i) => (
                      <div key={i} className="flex items-center gap-2 justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#5FA037]"></div>
                        <p className="text-xs font-light text-gray-500">{subitem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Blockchain Transparency Note */}
          <div className="mt-12 bg-slate-50 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-[#5FA037]" />
              <h4 className="text-lg font-light text-[#044050]">Immutable Blockchain Records</h4>
            </div>
            <p className="text-sm font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Every certificate is registered on Polygon blockchain as an NFT with embedded scientific metadata, 
              ensuring permanent, tamper-proof verification accessible to anyone via public blockchain explorers
            </p>
          </div>
        </div>
      </section>

      {/* Investor CTA - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-gradient-to-br from-[#044050] to-[#033842]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-white/70 uppercase tracking-[0.2em] mb-6">
              For Investors
            </p>
            <h2 className="text-5xl lg:text-6xl font-light mb-12 tracking-tight leading-[1.1] text-white">
              <span className="font-extralight">Join the future</span>
              <br />
              <span className="font-normal">of ESG certification</span>
            </h2>
            
            <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto mb-12">
              <p className="text-xl text-white/80 font-light leading-relaxed">
                €8.5B market opportunity · 2.4M target companies · First-mover advantage
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto mb-12">
              {[
                { value: '€8.5B', label: 'Market Size' },
                { value: '2.4M', label: 'Target SMEs' },
                { value: '23%', label: 'CAGR' },
                { value: '4×', label: 'ROI Potential' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-extralight text-[#E5FFBA] mb-2">{stat.value}</div>
                  <div className="text-xs text-white/60 font-light uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="group min-w-[240px] h-[56px] text-lg rounded-full transition-all duration-500 bg-[#5FA037] text-white hover:bg-[#4d8c2d] font-normal tracking-tight shadow-lg hover:shadow-xl hover:shadow-[#5FA037]/25 border-0 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              
              <span className="relative flex items-center justify-center gap-2.5">
                <span className="font-medium">View Investment Opportunity</span>
                <TrendingUp className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105" />
              </span>
            </Button>

            <p className="mt-8 text-sm text-white/50 font-light">
              Seeking strategic investors for Series A · Confidential deck available
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean Minimal - STATIC CONTENT FOR SEO */}
      <section className="py-24 relative bg-[#044050] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-block mb-6">
              <div className="text-sm font-medium tracking-[0.2em] uppercase text-white/80 bg-white/10 border border-white/20 px-6 py-3 rounded-full backdrop-blur-xl">
                Start Today
              </div>
            </div>

            {/* Title */}
            <h3 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-[1.1]">
              <span className="font-extralight text-white">Ready to</span>
              <br />
              <span className="font-normal">transform ESG?</span>
            </h3>

            {/* Description */}
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Our mission is to democratize ESG certification, making sustainability <span className="font-medium text-[#5FA037]">accessible</span>, <span className="font-medium text-[#5FA037]">transparent</span>, and <span className="font-medium text-[#5FA037]">verifiable</span> for companies and individuals worldwide.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-extralight text-[#5FA037] mb-1">98.5%</div>
                <div className="text-sm text-white/70 uppercase tracking-wider font-medium">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extralight text-[#5FA037] mb-1">3 weeks</div>
                <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extralight text-[#5FA037] mb-1">100%</div>
                <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Transparent</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extralight text-[#5FA037] mb-1">&lt;€0.01</div>
                <div className="text-sm text-white/70 uppercase tracking-wider font-medium">Per Certificate</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button 
                className="px-10 h-12 bg-[#5FA037] text-white hover:bg-[#4d8c2d] rounded-full transition-all duration-300 font-normal tracking-wide group"
              >
                <span className="flex items-center justify-center">
                  Start Free Validation
                  <ArrowRight className="ml-3 w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button 
                variant="ghost"
                className="px-10 h-12 text-white hover:bg-white/10 border border-white/30 hover:border-white/50 rounded-full transition-all duration-300 font-normal tracking-wide backdrop-blur-xl"
              >
                <span className="flex items-center justify-center">
                  Schedule Demo
                  <div className="ml-3 w-2 h-2 rounded-full bg-[#5FA037] transition-all duration-300 group-hover:bg-white"></div>
                </span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col md:flex-row gap-8 items-center justify-center text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5FA037]" />
                <span className="text-sm font-light">No commitment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5FA037]" />
                <span className="text-sm font-light">5 minute setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#5FA037]" />
                <span className="text-sm font-light">Specialized support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Clean Minimal */}
      <Footer />
      </main>
    </div>
  )
}
