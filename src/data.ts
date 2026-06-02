import { MenuItem, Testimonial, HighlightCard, GalleryItem } from './types';

export const HIGHLIGHT_CARDS: HighlightCard[] = [
  {
    id: '1',
    title: 'Authentic Monrovia Grill',
    description: 'Freshly prepared daily on open wood fire with authentic local seasonings and our house-secret spicy pepper glaze.',
    iconName: 'Flame'
  },
  {
    id: '2',
    title: 'Live Music & Local DJs',
    description: 'Immerse yourself in vibrant West African beats, Afrobeat, and slow lounge jazz on our cozy stage.',
    iconName: 'Music'
  },
  {
    id: '3',
    title: 'Premium Handcrafted Bar',
    description: 'Specialty Liberian cocktails, imported spirits, and vintage wines mixed by Monrovia’s top mixologists.',
    iconName: 'GlassWater'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Pepper Chicken',
    description: 'Signature Liberian chicken seasoned with local country spice, slow-grilled over charcoal, and slathered in our famous fire-roasted habanero sauce.',
    price: '$12',
    category: 'grill',
    emoji: '🍗',
    imageUrl: '/src/assets/images/vibes_pepper_chicken_1780402199120.png',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Jollof Rice & Grilled Beef',
    description: 'Vibrant, slow-cooked smoky tomatoes and rice, served with tender marinated grilled beef skewers and traditional fried plantains (banana-fried).',
    price: '$15',
    category: 'grill',
    emoji: '🍛',
    imageUrl: '/src/assets/images/vibes_jollof_rich_beef_1780402218062.png',
    badge: 'Highly Recommended'
  },
  {
    id: '3',
    name: 'Liberian Palm Butter Soup',
    description: 'Luxurious palm cream soup simmered with smoked fish, crab feet, tender beef, and local greens, served with hot soft fufu or rice.',
    price: '$18',
    category: 'soups',
    emoji: '🥣',
    imageUrl: 'https://picsum.photos/seed/palmbutter/800/600',
    badge: 'Traditional'
  },
  {
    id: '4',
    name: 'Fresh Atlantic Seafood Platter',
    description: 'A stellar selection of Monrovia’s catch of the day: jumbo lobsters, garlic prawns, and calamari rings grilled with lemon gold butter and cassava chips.',
    price: '$28',
    category: 'grill',
    emoji: '🦞',
    imageUrl: 'https://picsum.photos/seed/seafood/800/600',
    badge: 'Premium Feast'
  },
  {
    id: '5',
    name: 'Grill Master’s Tilapia Special',
    description: 'Whole Fresh Tilapia, stuffed with sweet peppers, onions, and local Liberian herbs, charcoal-grilled to juicy perfection and served with side attieke.',
    price: '$16',
    category: 'grill',
    emoji: '🐟',
    imageUrl: 'https://picsum.photos/seed/tilapia/800/600',
    badge: 'Chef’s Special'
  },
  {
    id: '6',
    name: 'Vibes Signature Sunset Cocktail',
    description: 'A striking blend of premium matured dark rum, fresh passionfruit pulp, lime juice, Liberian wild ginger syrup, finished with a fresh mint bouquet.',
    price: '$8',
    category: 'drinks',
    emoji: '🍹',
    imageUrl: 'https://picsum.photos/seed/loungecocktail/800/600',
    badge: 'Popular Cocktail'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Friday Night Afrobeat Vibe',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g2',
    title: 'The Sizzling Grill Fire',
    category: 'Our Grill',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g3',
    title: 'Our Signature Gold Cocktail',
    category: 'Cocktail Bar',
    imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g4',
    title: 'VIP Lounge Interior Styling',
    category: 'Ambiance',
    imageUrl: '/src/assets/images/vibes_lounge_hero_1780402180321.png'
  },
  {
    id: 'g5',
    title: 'Sunday Live Band Acoustic',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g6',
    title: 'Gourmet Grilled Seafood Spread',
    category: 'Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Kollie Mensah',
    role: 'Monrovia Regular',
    location: 'Sinkor, Monrovia',
    quote: 'Nobody in Monrovia beats their Pepper Chicken. It has the perfect dry country spice heat that reminds me of home. The vibes on Friday nights with the live DJ make it the absolute best lounge in the country!',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: 't2',
    name: 'Sarah Cooper',
    role: 'International Food Blogger',
    location: 'Congo Town, Liberia',
    quote: 'The Jollof and grilled beef skewers are cooked to perfection—smoky, spiced, and incredibly juicy. The service is incredibly polite, and the gold-and-black decor is absolutely gorgeous. A must-visit luxury spot!',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 't3',
    name: 'Emmanuel Massaquoi',
    role: 'Weekend Music Lover',
    location: 'Paynesville, Liberia',
    quote: 'The cocktails here are pure art. Every Sunday live band is a movie! Vibes Lounge is my favorite spot to grab cold club beers and delicious grilled whole tilapia on the weekends. Highly recommend!',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=12'
  }
];
