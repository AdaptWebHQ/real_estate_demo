export type PropertyType = 'Apartments' | 'Luxury Villas' | 'Boutique Residences' | 'Penthouse' | 'Commercial';

export type PropertyStatus = 'Ready to Move' | 'Limited Residences' | 'Under Construction' | 'New Launch';

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  areaName: string;
  city: string;
  price: string;
  numericPrice: number; // For filtering
  type: PropertyType;
  configuration: string; // e.g. "2 & 3 BHK"
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g. "1,450 – 2,100 sq.ft."
  status: PropertyStatus;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  amenities: string[];
  reraNumber: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  tag: string;
  headline: string;
  description: string;
  startingPrice: string;
  totalResidences: number;
  configuration: string;
  possessionDate: string;
  mainImage: string;
  galleryImages: string[];
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  purchasedProperty: string;
  location: string;
  review: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Buying Guide' | 'Property Insights' | 'Architecture' | 'Market Perspective';
  date: string;
  readTime: string;
  summary: string;
  image: string;
  author: string;
}

export interface LocationPoint {
  id: string;
  name: string;
  area: string;
  travelTime: string;
  category: 'Shopping' | 'Transit' | 'Healthcare' | 'Business' | 'Education';
  distanceKm: string;
  xPercent: number; // for custom visual interactive map UI
  yPercent: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior architecture' | 'Living room' | 'Kitchen' | 'Master bedroom' | 'Landscape' | 'Pool' | 'Balcony' | 'Entrance lobby';
  image: string;
  location: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
}
