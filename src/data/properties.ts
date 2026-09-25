import { Property } from '@/types';

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'prop-01',
    slug: 'azure-heights',
    name: 'Azure Heights',
    location: 'Avinashi Road, Coimbatore',
    areaName: 'Avinashi Road',
    city: 'Coimbatore',
    price: '₹85 Lakh onwards',
    numericPrice: 8500000,
    type: 'Apartments',
    configuration: '2 & 3 BHK',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,450 – 2,100 sq.ft.',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Azure Heights represents contemporary luxury living along Coimbatore’s premier commercial and residential corridor. Featuring floor-to-ceiling glass facets, expansive cross-ventilated living rooms, and private balconies overlooking mountain silhouettes.',
    features: [
      'Infinity Rooftop Pool & Lounge',
      'Double-Height Grand Entrance Lobby',
      'Fully Equipped Fitness Studio & Yoga Pavilion',
      'EV Charging Bays for Every Apartment',
      'Smart Home Automation Ready',
      '24/7 Multi-Tiered Security with Biometric Access'
    ],
    amenities: ['Pool', 'Gym', 'Clubhouse', 'Power Backup', 'Security', 'Landscaped Gardens'],
    reraNumber: 'TN/11/Building/0142/2023 (Fictional Demo)',
    featured: true
  },
  {
    id: 'prop-02',
    slug: 'aranya-villas',
    name: 'The Aranya Villas',
    location: 'Kovaipudur, Coimbatore',
    areaName: 'Kovaipudur',
    city: 'Coimbatore',
    price: '₹1.85 Cr onwards',
    numericPrice: 18500000,
    type: 'Luxury Villas',
    configuration: '3 & 4 BHK',
    bedrooms: 4,
    bathrooms: 4,
    area: '2,850 – 4,200 sq.ft.',
    status: 'Limited Residences',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b541334c4?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Nestled in the gentle breeze of the Western Ghats foothill at Kovaipudur, The Aranya Villas offer independent sanctuary living. Designed around private courtyards, teak accents, and open sky terraces.',
    features: [
      'Private Landscaped Plunge Pool',
      'Double Courtyard Architectural Blueprint',
      'Private Solar Energy Grid Integration',
      'Custom Imported Italian Marble Flooring',
      'Private Dedicated Terrace Garden',
      'Covered Parking for 3 Vehicles'
    ],
    amenities: ['Private Pool', 'Courtyard', 'Solar Microgrid', 'Clubhouse', '24/7 Security'],
    reraNumber: 'TN/11/Layout/0088/2024 (Fictional Demo)',
    featured: true
  },
  {
    id: 'prop-03',
    slug: 'vistara-one',
    name: 'Vistara One',
    location: 'RS Puram, Coimbatore',
    areaName: 'RS Puram',
    city: 'Coimbatore',
    price: '₹1.20 Cr onwards',
    numericPrice: 12000000,
    type: 'Apartments',
    configuration: '3 BHK',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,980 – 2,450 sq.ft.',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Situated in the refined heart of RS Puram, Vistara One bridges timeless neighborhood heritage with minimalist architectural geometry. Only two residences per floor provide uncompromised privacy.',
    features: [
      'Only 2 Residences Per Floor',
      '3-Side Open Ventilation Concept',
      'Sound-Insulated Acoustic Double Glazing',
      'Private Elevator Access Code',
      'Exclusive Resident Reading Salon',
      'Rainwater Harvesting & Zero-Discharge Sewage Plant'
    ],
    amenities: ['Private Lift', 'Reading Lounge', 'Electric Backup', 'Rainwater Harvesting'],
    reraNumber: 'TN/11/Building/0391/2024 (Fictional Demo)',
    featured: true
  },
  {
    id: 'prop-04',
    slug: 'cedar-grove',
    name: 'Cedar Grove',
    location: 'Saibaba Colony, Coimbatore',
    areaName: 'Saibaba Colony',
    city: 'Coimbatore',
    price: '₹72 Lakh onwards',
    numericPrice: 7200000,
    type: 'Boutique Residences',
    configuration: '2 & 3 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,280 – 1,850 sq.ft.',
    status: 'New Launch',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'A boutique collection of 24 sanctuary apartments surrounded by mature mahogany and cedar trees. Cedar Grove focuses on intimate community living and sustainable materials.',
    features: [
      'Intimate Community of 24 Families',
      'Lush Central Tree Canopy Court',
      'Children’s Outdoor Play & Sensory Park',
      'Co-Working Pods & High-Speed WiFi Commons',
      'Terrace Organic Herb Garden',
      'Low Density Land Allocation'
    ],
    amenities: ['Tree Court', 'Co-working Pods', 'Children Play Zone', 'Terrace Garden'],
    reraNumber: 'TN/11/Building/0512/2025 (Fictional Demo)',
    featured: true
  },
  {
    id: 'prop-05',
    slug: 'oakridge-horizon',
    name: 'Oakridge Horizon',
    location: 'ECR Boulevard, Chennai',
    areaName: 'East Coast Road',
    city: 'Chennai',
    price: '₹2.40 Cr onwards',
    numericPrice: 24000000,
    type: 'Penthouse',
    configuration: '4 BHK',
    bedrooms: 4,
    bathrooms: 5,
    area: '3,200 – 4,500 sq.ft.',
    status: 'New Launch',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Coastal architectural brilliance overlooking the Bay of Bengal coastline. Sky-villas with expansive sea decks and private lap pools.',
    features: [
      'Panoramic Oceanfront Decks',
      'Private Horizon Plunge Pool',
      'Concierge & Valet Service',
      'Private Elevator Landing'
    ],
    amenities: ['Sea View', 'Private Pool', 'Concierge', 'Valet'],
    reraNumber: 'TN/01/Building/0911/2025 (Fictional Demo)',
    featured: false
  },
  {
    id: 'prop-06',
    slug: 'solitaire-enclave',
    name: 'Solitaire Enclave',
    location: 'Indiranagar, Bengaluru',
    areaName: 'Indiranagar',
    city: 'Bengaluru',
    price: '₹1.95 Cr onwards',
    numericPrice: 19500000,
    type: 'Apartments',
    configuration: '3 & 4 BHK',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,200 – 3,100 sq.ft.',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Urban luxury tucked away in peaceful leafy lanes of Indiranagar. Designed for discerning executives seeking rapid city connectivity.',
    features: [
      'Soundproof Triple Glazed Windows',
      'Rooftop Sky Lounge & Barbecue Terrace',
      'Automated Underground Stack Parking'
    ],
    amenities: ['Sky Lounge', 'Stack Parking', 'Gym', 'Security'],
    reraNumber: 'KA/PRM/KA/RERA/1251/2024 (Fictional Demo)',
    featured: false
  }
];
