export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'grill' | 'sides' | 'soups' | 'drinks';
  emoji: string;
  imageUrl?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

export interface HighlightCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}
