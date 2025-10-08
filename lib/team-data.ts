// Team data configuration - Updated with real team information
// To update individual LinkedIn profiles, replace "https://linkedin.com" with specific profile URLs
// Example: "https://linkedin.com/in/diego-rocha"

export interface TeamMember {
  name: string
  role: string
  avatar: string // Path to image in public/images/team/ or external URL
  link?: string
  description?: string
}

export const teamMembers: TeamMember[] = [
  {
    name: "Diego Rocha",
    role: "Director of Innovation and Strategic Initiatives",
    avatar: "/images/team/Diego Rocha.png",
    link: "https://linkedin.com",
    description: "Strategic leader driving innovation initiatives and technological advancement in ESG certification."
  },
  {
    name: "Fernanda Ortolan",
    role: "Director of Legal and Compliance",
    avatar: "/images/team/Fernanda Ortolan.png",
    link: "https://linkedin.com",
    description: "Legal expert ensuring CSRD compliance and regulatory alignment across all certification processes."
  },
  {
    name: "Marcos Rocha",
    role: "Administrative and Financial Director",
    avatar: "/images/team/Marcos Rocha.png",
    link: "https://linkedin.com",
    description: "Financial strategist managing operations and driving sustainable business growth."
  },
  {
    name: "Paola Lagosta",
    role: "Project Engineer",
    avatar: "/images/team/Paola Lagosta.png",
    link: "https://linkedin.com",
    description: "Engineering specialist coordinating complex ESG certification projects and technical implementations."
  },
  {
    name: "Pedro de Almeida",
    role: "Software Engineer — Web & Mobile",
    avatar: "/images/team/Pedro de almeida.png",
    link: "https://linkedin.com",
    description: "Full-stack developer creating robust web and mobile solutions for the GreenCheck platform."
  },
  {
    name: "Harry Lorenzi",
    role: "Scientific Director and Botanical Validation",
    avatar: "/images/team/Harry Lorenzi.png",
    link: "https://linkedin.com",
    description: "Renowned botanist providing scientific validation and expertise for environmental certifications."
  },
  {
    name: "Marcia Martins",
    role: "Director of Cultural Affairs and Sustainable Innovation",
    avatar: "/images/team/Marcia Martins.png",
    link: "https://linkedin.com",
    description: "Cultural affairs leader promoting sustainable innovation and environmental awareness initiatives."
  },
  {
    name: "Valdinei Cintra",
    role: "Operations Director",
    avatar: "/images/team/Valdinei Cintra.png",
    link: "https://linkedin.com",
    description: "Operations expert ensuring efficient processes and seamless platform performance."
  },
  {
    name: "Marcia Bernardes",
    role: "Director of Marketing and Communications",
    avatar: "/images/team/Marcia Bernardes.png",
    link: "https://linkedin.com",
    description: "Marketing strategist driving brand awareness and communication strategies for sustainable solutions."
  },
  {
    name: "Mayara Barbosa",
    role: "Accounting Analyst",
    avatar: "/images/team/Mayara Barbosa.png",
    link: "https://linkedin.com",
    description: "Financial analyst managing accounting processes and ensuring fiscal compliance."
  },
  {
    name: "Giulia Veiga",
    role: "Legal Associate",
    avatar: "/images/team/Giulia Veiga.png",
    link: "https://linkedin.com",
    description: "Legal professional supporting compliance initiatives and regulatory documentation."
  },
  {
    name: "Juliana Rocha",
    role: "Director of Sustainability and Environmental Affairs",
    avatar: "/images/team/Juliana Rocha.png",
    link: "https://linkedin.com",
    description: "Sustainability expert leading environmental initiatives and ESG strategy development."
  },
  {
    name: "Marina Diomedea",
    role: "Social Work Professional",
    avatar: "/images/team/Marina Diomedea.png",
    link: "https://linkedin.com",
    description: "Social work specialist focusing on community impact and social sustainability initiatives."
  }
]