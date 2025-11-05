// Detailed property data
export interface Property {
  id: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: string
  image: string
  tag: string
  description: string
  longDescription: string
  features: string[]
  amenities: string[]
  gallery: string[]
  type: string
  yearBuilt: number
  status: 'Available' | 'Pending' | 'Sold'
  highlights: {
    icon: string
    title: string
    description: string
  }[]
}

export const properties: Property[] = [
  {
    id: 'belem-heritage-apartment',
    title: 'Belém Heritage Apartment',
    location: 'Lisbon',
    price: '€1,250,000',
    beds: 4,
    baths: 3,
    sqft: '2,650',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop&q=80',
    tag: 'Featured',
    type: 'Apartment',
    yearBuilt: 2020,
    status: 'Available',
    description: 'Stunning heritage apartment in the heart of Belém with river views',
    longDescription: 'This exceptional apartment seamlessly blends historic charm with contemporary luxury. Located in the prestigious Belém district, this residence offers breathtaking views of the Tagus River and easy access to Lisbon\'s most iconic monuments. The spacious layout features high ceilings, original architectural details, and modern finishes throughout. Floor-to-ceiling windows flood the space with natural light, while the open-plan living areas create an ideal environment for both relaxation and entertaining.',
    features: [
      'Panoramic river views',
      'Original 19th-century details',
      'High ceilings (3.5m)',
      'Renovated to modern standards',
      'Premium kitchen appliances',
      'En-suite master bedroom',
      'Private balcony',
      'Storage room'
    ],
    amenities: [
      '24/7 concierge service',
      'Private parking (2 spaces)',
      'Fitness center',
      'Rooftop terrace',
      'Elevator',
      'Secure entry system',
      'Bike storage',
      'Common gardens'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop&q=80'
    ],
    highlights: [
      {
        icon: 'MapPin',
        title: 'Prime Location',
        description: 'Walking distance to UNESCO World Heritage sites and waterfront'
      },
      {
        icon: 'Sparkle',
        title: 'Luxury Finishes',
        description: 'Premium materials and meticulous attention to detail throughout'
      },
      {
        icon: 'TrendUp',
        title: 'Investment Potential',
        description: 'High rental demand in one of Lisbon\'s most sought-after neighborhoods'
      }
    ]
  },
  {
    id: 'ericeira-seaside-villa',
    title: 'Ericeira Seaside Villa',
    location: 'Ericeira',
    price: '€2,800,000',
    beds: 5,
    baths: 4,
    sqft: '3,200',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1000&fit=crop&q=80',
    tag: 'New',
    type: 'Villa',
    yearBuilt: 2023,
    status: 'Available',
    description: 'Modern beachfront villa with stunning ocean views and direct beach access',
    longDescription: 'Experience coastal luxury at its finest in this newly constructed villa overlooking the Atlantic Ocean. This architectural masterpiece features expansive glass walls that frame spectacular ocean views, while the open-concept design creates a seamless flow between indoor and outdoor living spaces. The property includes a infinity pool, landscaped gardens, and private beach access, offering the ultimate seaside lifestyle just minutes from Ericeira\'s world-renowned surf breaks.',
    features: [
      'Direct ocean views',
      'Infinity swimming pool',
      'Private beach access',
      'Floor-to-ceiling windows',
      'Gourmet kitchen',
      'Home automation system',
      'Wine cellar',
      'Guest house',
      'Landscaped gardens'
    ],
    amenities: [
      'Heated pool',
      'Outdoor shower',
      'BBQ area',
      'Parking for 4 cars',
      'Solar panels',
      'Electric gate',
      'Security system',
      'Irrigation system'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=1000&fit=crop&q=80'
    ],
    highlights: [
      {
        icon: 'Waves',
        title: 'Beachfront Living',
        description: 'Steps away from pristine beaches and world-class surf spots'
      },
      {
        icon: 'House',
        title: 'Contemporary Design',
        description: 'Award-winning architecture with sustainable features'
      },
      {
        icon: 'Sun',
        title: 'Outdoor Paradise',
        description: 'Expansive terraces and gardens perfect for coastal lifestyle'
      }
    ]
  },
  {
    id: 'comporta-beach-estate',
    title: 'Comporta Beach Estate',
    location: 'Comporta',
    price: '€4,500,000',
    beds: 6,
    baths: 5,
    sqft: '4,800',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&q=80',
    tag: 'Luxury',
    type: 'Estate',
    yearBuilt: 2021,
    status: 'Available',
    description: 'Exclusive beachfront estate in Portugal\'s most prestigious coastal destination',
    longDescription: 'Nestled in the pristine natural beauty of Comporta, this exceptional estate offers unparalleled luxury and privacy. The property spans multiple pavilions connected by covered walkways, each designed to maximize views of the surrounding rice fields and Atlantic Ocean. With its own private beach access and extensive grounds, this residence epitomizes the relaxed sophistication that Comporta is famous for. The main house features a stunning open-plan living area, while guest pavilions ensure privacy for visitors.',
    features: [
      'Multiple pavilions',
      'Private beach access',
      'Heated infinity pool',
      'Cinema room',
      'Spa and sauna',
      'Professional kitchen',
      'Staff quarters',
      'Horse stables',
      'Tennis court',
      '5 hectares of land'
    ],
    amenities: [
      'Private gate entry',
      'Golf cart included',
      'Outdoor kitchen',
      'Pool house',
      'Garage for 6 cars',
      'Helipad approved',
      'Smart home system',
      'Backup generator'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=1000&fit=crop&q=80'
    ],
    highlights: [
      {
        icon: 'Crown',
        title: 'Ultimate Privacy',
        description: 'Secluded estate with maximum privacy and security'
      },
      {
        icon: 'Leaf',
        title: 'Natural Setting',
        description: 'Surrounded by protected dunes and pristine nature'
      },
      {
        icon: 'Users',
        title: 'Perfect for Entertaining',
        description: 'Multiple pavilions and outdoor spaces for large gatherings'
      }
    ]
  },
  {
    id: 'algarve-cliffside-residence',
    title: 'Algarve Cliffside Residence',
    location: 'Algarve',
    price: '€3,200,000',
    beds: 5,
    baths: 4,
    sqft: '3,650',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop&q=80',
    tag: 'Premium',
    type: 'Villa',
    yearBuilt: 2022,
    status: 'Available',
    description: 'Spectacular clifftop villa with panoramic ocean views and resort amenities',
    longDescription: 'Perched dramatically on the golden cliffs of the Algarve, this contemporary villa offers breathtaking 180-degree ocean views. The property showcases cutting-edge architecture with clean lines and expansive glass surfaces that blur the boundaries between indoor and outdoor spaces. Every room has been carefully positioned to capture the stunning views and natural light. The infinity pool appears to merge with the ocean horizon, creating an unforgettable visual experience. Located within a prestigious resort community, residents enjoy access to world-class golf courses, tennis facilities, and spa services.',
    features: [
      'Panoramic ocean views',
      'Infinity edge pool',
      'Home cinema',
      'Gym and spa room',
      'Chef\'s kitchen',
      'Master suite with terrace',
      'Office with ocean view',
      'Covered outdoor dining',
      'Fire pit lounge'
    ],
    amenities: [
      'Resort club access',
      'Golf cart garage',
      'Private lift',
      'Wine storage',
      'Laundry room',
      'Triple car garage',
      'Solar heating',
      'Rainwater collection'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=1000&fit=crop&q=80'
    ],
    highlights: [
      {
        icon: 'Sun',
        title: 'Year-Round Sunshine',
        description: '300 days of sunshine with mild winters and warm summers'
      },
      {
        icon: 'Golf',
        title: 'Golf Paradise',
        description: 'Direct access to championship golf courses'
      },
      {
        icon: 'Plane',
        title: 'Easy Access',
        description: 'Just 30 minutes from Faro International Airport'
      }
    ]
  },
  {
    id: 'lisbon-penthouse',
    title: 'Lisbon Penthouse',
    location: 'Lisbon',
    price: '€1,800,000',
    beds: 3,
    baths: 3,
    sqft: '2,200',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1000&fit=crop&q=80',
    tag: 'Featured',
    type: 'Penthouse',
    yearBuilt: 2023,
    status: 'Available',
    description: 'Ultra-modern penthouse with private rooftop terrace in central Lisbon',
    longDescription: 'This extraordinary penthouse represents the pinnacle of urban luxury living in Lisbon. Occupying the entire top floor of a boutique building in the heart of the city, this residence offers a rare combination of space, light, and outdoor living. The crowning jewel is the expansive private rooftop terrace with 360-degree views encompassing the Tagus River, São Jorge Castle, and the city\'s iconic seven hills. The interior features an open-plan design with museum-quality finishes, a chef\'s kitchen with top-tier appliances, and a master suite that rivals five-star hotels.',
    features: [
      'Private rooftop terrace (200m²)',
      '360-degree city views',
      'Smart home automation',
      'Premium appliances',
      'Custom lighting design',
      'Walk-in closets',
      'Spa-like bathrooms',
      'Private elevator access',
      'Fireplace'
    ],
    amenities: [
      'Building concierge',
      'Private parking (2 spaces)',
      'Storage unit',
      'Bike room',
      'Package room',
      'Electric car charging',
      'High-speed fiber internet',
      'Video security'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80'
    ],
    highlights: [
      {
        icon: 'Buildings',
        title: 'Prime Urban Location',
        description: 'Walking distance to restaurants, shops, and cultural attractions'
      },
      {
        icon: 'Sparkle',
        title: 'Turnkey Luxury',
        description: 'Fully furnished with designer pieces available'
      },
      {
        icon: 'ChartLine',
        title: 'Strong Appreciation',
        description: 'Located in one of Europe\'s fastest-growing property markets'
      }
    ]
  },
  {
    id: 'douro-valley-retreat',
    title: 'Douro Valley Retreat',
    location: 'Douro',
    price: '€1,950,000',
    beds: 4,
    baths: 3,
    sqft: '2,850',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=1000&fit=crop&q=80',
    tag: 'New',
    type: 'Estate',
    yearBuilt: 2022,
    status: 'Available',
    description: 'Restored wine estate with vineyard in UNESCO World Heritage region',
    longDescription: 'Discover the timeless beauty of the Douro Valley in this meticulously restored 19th-century wine estate. Set among terraced vineyards with sweeping views of the Douro River, this property seamlessly combines historic character with modern comfort. The main house features original stone walls, traditional Portuguese tiles, and wooden beam ceilings, while contemporary additions include a state-of-the-art kitchen, spa facilities, and a temperature-controlled wine cellar. The estate includes producing vineyards, making it an ideal investment for wine enthusiasts or those seeking a luxury retreat in one of Portugal\'s most beautiful regions.',
    features: [
      'Historic wine estate',
      'Producing vineyard (2 hectares)',
      'River views',
      'Original architectural features',
      'Modern wine cellar',
      'Outdoor pool',
      'Guest cottage',
      'Tasting room',
      'Landscaped gardens'
    ],
    amenities: [
      'Wine production facilities',
      'Olive grove',
      'Fruit orchards',
      'Covered terraces',
      'Outdoor dining areas',
      'Parking for 6 cars',
      'Tool shed',
      'Irrigation system'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=1000&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=1000&fit=crop&q=80'
    ],
    highlights: [
      {
        icon: 'GrapeIcon',
        title: 'Wine Production',
        description: 'Established vineyard with annual wine production'
      },
      {
        icon: 'Mountain',
        title: 'UNESCO Heritage',
        description: 'Located in a protected World Heritage landscape'
      },
      {
        icon: 'Heart',
        title: 'Authentic Character',
        description: 'Beautifully restored with original period features preserved'
      }
    ]
  }
]

