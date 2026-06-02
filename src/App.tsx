import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Music, 
  GlassWater, 
  Menu, 
  X, 
  Calendar, 
  Users, 
  Clock, 
  Phone, 
  MapPin, 
  Mail, 
  Instagram, 
  Star, 
  ArrowRight, 
  Check, 
  Compass, 
  Utensils, 
  ChevronRight,
  Smile,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HIGHLIGHT_CARDS, MENU_ITEMS, GALLERY_ITEMS, TESTIMONIALS } from './data';
import { MenuItem, ReservationData } from './types';

export default function App() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gallery Filters State
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Reservation Form State
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: 2,
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{ reference: string; details: ReservationData } | null>(null);

  // Listen to Window scroll to change Navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Gallery
  const filteredGallery = activeGalleryFilter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeGalleryFilter);

  // Gallery unique categories list
  const galleryCategories = ['All', 'Events', 'Our Grill', 'Cocktail Bar', 'Ambiance', 'Kitchen'];

  // Form Validation and Submission
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 2 : value
    }));
    // Clear validation error on change
    if (formErrors[name as keyof ReservationData]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof ReservationData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Kindly enter your phone number so we can text details.';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.date) {
      errors.date = 'Please pick a date for your visit.';
    }
    if (!formData.time) {
      errors.time = 'Please select your reservation time.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Process Form (Mock Submit with Beautiful Modal Feedback)
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `VIBES-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingSuccess({
        reference: generatedRef,
        details: { ...formData }
      });
      setIsSubmitting(false);
      // Reset form variables
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '19:30',
        guests: 2,
        specialRequests: ''
      });
    }, 1200);
  };

  // Helper mapping for render-safe dynamic icons
  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-8 h-8 text-gold" />;
      case 'Music': return <Music className="w-8 h-8 text-gold" />;
      case 'GlassWater': return <GlassWater className="w-8 h-8 text-gold" />;
      default: return <Utensils className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <div className="min-h-screen text-gray-200 selection:bg-gold selection:text-black">
      
      {/* HEADER & STICKY NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-dark-pitch/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-xl' 
            : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center space-x-3 group">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-gold transition-colors duration-300">
              VIBES <span className="text-gold font-light">Lounge & Grill</span>
            </span>
          </a>

          {/* Desktop Navigation Link Entries */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-200">Home</a>
            <a href="#about" className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-200">About</a>
            <a href="#menu" className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-200">Menu Menu</a>
            <a href="#gallery" className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-200">Gallery</a>
            <a href="#reservations" className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-200">Reservations</a>
            <a href="#contact" className="text-sm font-medium tracking-wide text-gray-300 hover:text-gold transition-colors duration-200">Contact</a>
          </nav>

          {/* CTA Button: Reserve Table (Header Desktop) */}
          <div className="hidden md:block">
            <a 
              href="#reservations" 
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 shadow-md hover:shadow-gold/20"
            >
              Book a Table
            </a>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            type="button"
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Open State */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden w-full bg-dark-pitch border-b border-white/5 overflow-hidden shadow-inner px-6 py-4"
            >
              <div className="flex flex-col space-y-4 pt-2">
                <a 
                  href="#home" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-gold py-1"
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-gold py-1"
                >
                  About
                </a>
                <a 
                  href="#menu" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-gold py-1"
                >
                  Menu
                </a>
                <a 
                  href="#gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-gold py-1"
                >
                  Gallery
                </a>
                <a 
                  href="#reservations" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-gold py-1"
                >
                  Reservations
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-300 hover:text-gold py-1"
                >
                  Contact
                </a>
                <a 
                  href="#reservations" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-gold text-black font-semibold py-3 rounded-xl mt-2 flex items-center justify-center space-x-2"
                >
                  <span>Book Table Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
        
        {/* Background Artwork - Blur overlay, generated ambient lounge photo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/vibes_lounge_hero_1780402180321.png" 
            alt="Vibes Lounge & Grill Luxury Atmosphere" 
            className="w-full h-full object-cover scale-105 filter brightness-45 contrast-110"
            referrerPolicy="no-referrer"
          />
          {/* Crimson & Pitch-Black Dramatic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-pitch via-dark-pitch/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-pitch/90 via-transparent to-dark-pitch/60"></div>
          {/* Subtle deep reddish ambient light glow top left */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-burgundy/25 blur-[120px]"></div>
          {/* Subtle warm gold ambient light glow bottom right */}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/15 blur-[120px]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-8 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-burgundy/45 to-gold/30 border border-gold/40 backdrop-blur-md mb-6"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-gold uppercase font-mono">Liberia's Culinary Crown Jewel</span>
          </motion.div>

          {/* Primary High-converting Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-black tracking-tight text-white mb-6 leading-[1.1]"
          >
            Where Good Food <br />
            Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold bg-[length:200%_auto] font-serif italic">Good Vibes</span>
          </motion.h1>

          {/* Subheadline copy */}
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed font-light mb-10"
          >
            Liberia’s premier afro-urban dining & lounge experience. Authentic recipes, wood-fired smoking, and Monrovia's most vibrant night soundscapes.
          </motion.p>

          {/* Two high-impact Call To Action action buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <a 
              href="#reservations" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase bg-gold hover:bg-gold-hover text-black shadow-lg shadow-gold/20 hover:scale-103 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Reserve a Table</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
            
            <a 
              href="#menu" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase border-2 border-white/20 text-white hover:border-gold hover:bg-white/5 hover:scale-103 transition-all duration-300 flex items-center justify-center"
            >
              View Food Menu
            </a>
          </motion.div>

          {/* Soft-scroller cue anchor */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center cursor-pointer"
            onClick={() => {
              const el = document.getElementById('about');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] uppercase tracking-widest font-mono text-gray-400 mb-2">Scroll to Discover</span>
            <div className="w-5 h-8 border-2 border-gray-400 rounded-full p-1 flex justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-dark-pitch relative overflow-hidden">
        
        {/* Artistic details */}
        <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-burgundy/10 blur-[100px] z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Text Frame (Left Side 6 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">Our Liberian Heritage</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  Crafting Moments and Unforgettable Flavors
                </h2>
                <div className="h-1.5 w-20 bg-burgundy rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Born out of a passion for high-luxury culinary craftsmanship and vibrant Afro beat culture, 
                  <strong className="text-white font-medium"> Vibes Lounge & Grill</strong> is where elegance meets the heart of Monrovia. 
                  We have combined raw culinary arts with top-shelf mixology to establish an oasis for the culture.
                </p>
                <p>
                  From our charcoal grill cooking of freshly caught Atlantic ocean tilapia and delicious native pepper wings, 
                  to our slow-stewed, authentic local palm butter pots, our goal is simple: to make every meal a celebration of 
                  Liberian richness. This is hospitality redefined, centered in a space where old block rhythms meet futuristic energy.
                </p>
              </div>

              {/* Founder quote / sign-off badge */}
              <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-gold bg-gradient-to-r from-white/5 to-transparent">
                <p className="italic text-gray-300 text-sm md:text-base">
                  "At Vibes, we don’t just serve recipes—we craft a sensory narrative of Monrovia. Every grill flare, custom bitters blend, and DJ set is tuned to perfection so you feel relaxed, celebrated, and deeply satisfied."
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-gold rounded-full"></div>
                  <span className="text-xs uppercase font-mono tracking-wider font-semibold text-white">The Vibes Founders Team</span>
                </div>
              </div>
            </div>

            {/* Layout Grid Highlight Cards (Right Side 5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xs font-mono uppercase text-gray-400 tracking-wider">The Vibes Trinity Pillars</h3>
              
              <div className="space-y-4">
                {HIGHLIGHT_CARDS.map((card, idx) => (
                  <motion.div 
                    key={card.id}
                    whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-6 rounded-2xl bg-dark-card border border-white/5 transition-all duration-300 flex items-start space-x-5"
                  >
                    <div className="p-3 bg-burgundy/20 rounded-xl border border-burgundy/30 flex-shrink-0">
                      {getHighlightIcon(card.iconName)}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1.5">{card.title}</h4>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">{card.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS SECTION */}
      <section id="menu" className="py-24 bg-dark-card border-y border-white/5 relative">
        <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Menu Title Blocks */}
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">Fresh From Our Flame Cookers</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight">What We're Renowned For</h2>
            <p className="text-gray-400 font-light text-sm md:text-base">
              Explore client favorites, made-to-order with indigenous Monrovia spices and premium ocean and farm ingredients.
            </p>
            <div className="h-1.5 w-24 bg-burgundy mx-auto rounded-full mt-4"></div>
          </div>

          {/* Grid Layout of 6 Premium Custom Menu Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -8 }}
                className="group flex flex-col h-full bg-dark-pitch rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 shadow-lg"
              >
                {/* Fixed Image Container with Hover zoom */}
                <div className="relative h-56 w-full overflow-hidden bg-white/5">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-700 brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                      <span className="text-5xl">{item.emoji}</span>
                    </div>
                  )}
                  
                  {/* Floating category / item status badge */}
                  {item.badge && (
                    <span className="absolute top-4 left-4 inline-flex px-3  py-1 text-[10px] font-semibold tracking-wider font-mono uppercase bg-burgundy border border-burgundy/30 text-white rounded-full shadow-md">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Card description Details */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-serif font-bold text-white group-hover:text-gold transition-colors duration-300">
                        {item.emoji} {item.name}
                      </h3>
                      <span className="text-lg font-mono font-semibold text-gold bg-gold/10 px-3 py-0.5 rounded-lg border border-gold/20">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500 uppercase tracking-widest">{item.category}</span>
                    <a 
                      href="#reservations" 
                      className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1.5 hover:underline"
                    >
                      <span>Book to Taste</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Interactive Menu Link / Notice */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 font-light mb-4">
              * Dining groups of 6 or more receive a custom 10% discount on grill specialties.
            </p>
            <a 
              href="#reservations" 
              className="inline-flex items-center space-x-2.5 text-gold hover:text-gold-hover font-semibold tracking-wide text-sm transition-colors duration-300 border-b border-gold/40 hover:border-gold pb-1"
            >
              <span>Click to Reserve Dining Spot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* EXPERIENCE / WHY US SECTION */}
      <section className="py-24 bg-gradient-to-b from-dark-pitch to-black relative overflow-hidden">
        
        {/* Abstract design nodes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-burgundy/5 blur-[200px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Grid Column Left */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gold/10 -rotate-3 rounded-3xl transform scale-102"></div>
              {/* Premium curated composition of a cocktail at table */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video lg:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200" 
                  alt="Vibes Lounge Cocktails Crafting" 
                  className="w-full h-full object-cover grayscale-15 brightness-90 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Experience counter badge */}
                <div className="absolute bottom-6 left-6 p-6 rounded-2xl bg-black/95 backdrop-blur-xl border border-gold/20 flex items-center space-x-4 shadow-xl">
                  <span className="text-4xl font-serif font-black text-gold">4.9</span>
                  <div className="font-mono text-left">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 block">Based on 1.2k+ Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Structural Copy Column Right */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-3">
                <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">The Vibes Standard</span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight">Sophistication In Every Single Detail</h2>
                <div className="h-1.5 w-20 bg-burgundy rounded-full"></div>
              </div>

              <p className="text-gray-300 font-light leading-relaxed text-base md:text-lg">
                We believe dining is an emotional journey. Every guest at Vibes is welcomed like family, handled like royalty, and served like a connoisseur. 
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-1 rounded-full bg-gold/10 text-gold mt-1 border border-gold/20">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base">Unmatched High-Class Vibe</h4>
                    <p className="text-sm text-gray-400 font-light mt-1">
                      Sophisticated gold-trimmed velvet bars, luxurious mood illumination, and private booths tailored for date nights, elite panels, or birthday parties.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-1 rounded-full bg-gold/10 text-gold mt-1 border border-gold/20">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base">Elite West African Gastronomy</h4>
                    <p className="text-sm text-gray-400 font-light mt-1">
                      Prepared by premium chefs who understand traditional methods of wood fires and local spice curing, elevated with modern global plating arts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-1 rounded-full bg-gold/10 text-gold mt-1 border border-gold/20">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base">Curated Entertainment Calendars</h4>
                    <p className="text-sm text-gray-400 font-light mt-1">
                      No boring nights. Acoustic jazz lounges on Thursdays, top-tier African DJs spinning classic Afrobeat on weekends, and special themed VIP events.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="#contact" 
                  className="inline-flex items-center space-x-3 text-gold hover:text-gold-hover text-sm font-semibold tracking-wider uppercase font-mono group"
                >
                  <span>Learn About Private Booking Events</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-dark-pitch border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Gallery Titles */}
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">The Vibes Scene</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight">The Vibes Speak For Themselves</h2>
            <div className="h-1.5 w-20 bg-burgundy mx-auto rounded-full mt-4"></div>
          </div>

          {/* Gallery Category Filter Toggles */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {galleryCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveGalleryFilter(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300 ${
                  activeGalleryFilter === category 
                    ? 'bg-gold text-black shadow-md shadow-gold/25 scale-103' 
                    : 'bg-dark-card text-gray-400 border border-white/5 hover:border-gold/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Interactive Responsive Grid Photos with Overlay Lightbox Hooks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setLightboxImage({ url: item.imageUrl, title: item.title })}
                  className="group relative h-72 rounded-2xl overflow-hidden bg-dark-card border border-white/5 cursor-pointer"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 group-hover:blur-[2px]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Elegant Golden and Jet-black Gradient Hover Cover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-1.5">{item.category}</span>
                    <h4 className="text-white text-base font-serif font-bold tracking-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h4>
                    <p className="text-[11px] text-gray-400 font-mono mt-1.5 flex items-center space-x-1">
                      <span>Click to enlarge view</span>
                      <span>✦</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* GALLERY PHOTO ENLARGED LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 backdrop-blur-md"
          >
            <button 
              type="button" 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl w-full max-h-[80vh] flex flex-col space-y-4" onClick={(e) => e.stopPropagation()}>
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.title} 
                className="w-full h-auto max-h-[70vh] rounded-2xl object-contain border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="text-center">
                <h4 className="text-lg font-serif font-semibold text-white">{lightboxImage.title}</h4>
                <p className="text-xs text-gold uppercase mt-1 tracking-widest font-mono">Vibes Lounge Exclusive Selection</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESERVATIONS SECTION */}
      <section id="reservations" className="py-24 bg-dark-card border-t border-white/5 relative overflow-hidden">
        
        {/* Soft Background Radial Lighting */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-burgundy/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Callout Info Panel (Left Side 5 Columns) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">Book Your Dining Spot</span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight">Reserve A Table</h2>
                <div className="h-1.5 w-16 bg-burgundy rounded-full"></div>
              </div>

              <div className="space-y-6 text-gray-300 font-light leading-relaxed">
                <p>
                  Experience Monrovia’s highest-demand lounge gastronomy. Book your table instantly for fine food, top-shelf cocktails, and soulful background music.
                </p>
                <p>
                  For reservations larger than <strong className="text-white">10 guests</strong>, customized menu boards, or private terrace takeovers, kindly reach our group dining desk via Whatsapp or call directly.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center space-x-3.5">
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="text-sm tracking-wide text-gray-300 font-mono">+231 (0) 777-622-444</span>
                </div>
                <div className="flex items-center space-x-3.5">
                  <Mail className="w-5 h-5 text-gold" />
                  <span className="text-sm tracking-wide text-gray-300 font-mono">reservations@vibesliberia.com</span>
                </div>
                <div className="flex items-center space-x-3.5">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-sm tracking-wide text-[13px] text-gray-300 font-sans">Opposite Beach side, Sinkor, Monrovia, Liberia</span>
                </div>
              </div>
            </div>

            {/* Substantial Interactive Form Board (Right Side 7 Columns) */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-10 rounded-3xl bg-dark-pitch/90 backdrop-blur-2xl border border-white/10 shadow-2xl relative">
                
                {/* Visual state change indicator for bookings */}
                <AnimatePresence mode="wait">
                  {!bookingSuccess ? (
                    <motion.form 
                      key="reservation-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleReservationSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name Field */}
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider font-mono text-gray-300">Name</label>
                          <input 
                            id="name"
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Samuel Keneh"
                            className={`w-full px-4 py-3.5 bg-dark-card border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                              formErrors.name 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                                : 'border-white/10 focus:border-gold focus:ring-gold/30'
                            }`}
                          />
                          {formErrors.name && (
                            <p className="text-xs text-red-400 font-mono mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone Number Field */}
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider font-mono text-gray-300">Phone Number</label>
                          <input 
                            id="phone"
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +231 886-555-212"
                            className={`w-full px-4 py-3.5 bg-dark-card border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                              formErrors.phone 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                                : 'border-white/10 focus:border-gold focus:ring-gold/30'
                            }`}
                          />
                          {formErrors.phone && (
                            <p className="text-xs text-red-400 font-mono mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                            </p>
                          )}
                        </div>

                        {/* Date Field */}
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider font-mono text-gray-300">Date</label>
                          <div className="relative">
                            <input 
                              id="date"
                              type="date" 
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3.5 bg-dark-card border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all text-slate-100 ${
                                formErrors.date 
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
                                  : 'border-white/10 focus:border-gold focus:ring-gold/30'
                              }`}
                            />
                          </div>
                          {formErrors.date && (
                            <p className="text-xs text-red-400 font-mono mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {formErrors.date}
                            </p>
                          )}
                        </div>

                        {/* Time Select */}
                        <div className="space-y-2">
                          <label htmlFor="time" className="text-xs font-semibold uppercase tracking-wider font-mono text-gray-300">Preferred Time</label>
                          <select 
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 bg-dark-card border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all text-slate-100"
                          >
                            <option value="12:00">12:00 PM (Lunch)</option>
                            <option value="13:30">1:30 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:30">6:30 PM (Dinner)</option>
                            <option value="19:30">7:30 PM</option>
                            <option value="20:30">8:30 PM</option>
                            <option value="22:00">10:00 PM (Late Lounge)</option>
                          </select>
                        </div>

                        {/* Guests Selector */}
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wider font-mono text-gray-300">Number of Guests</label>
                          <div className="grid grid-cols-5 md:grid-cols-8 gap-2">
                            {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, guests: num }))}
                                className={`py-3 rounded-xl text-xs font-semibold text-center transition-all ${
                                  formData.guests === num 
                                    ? 'bg-gold text-black border border-gold font-bold shadow-md shadow-gold/20' 
                                    : 'bg-dark-card text-gray-300 border border-white/5 hover:border-gold/30'
                                }`}
                              >
                                {num === 10 ? '10+' : num}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="specialRequests" className="text-xs font-semibold uppercase tracking-wider font-mono text-gray-300">Special Request (Optional)</label>
                          <textarea 
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Let us know if it's a birthday, anniversary, or if you prefer a quiet patio corner..."
                            className="w-full px-4 py-3 bg-dark-card border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-gray-600"
                          ></textarea>
                        </div>

                      </div>

                      {/* Reserve Button submission */}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase bg-gold hover:bg-gold-hover text-black shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Checking Table Schedules...</span>
                          </div>
                        ) : (
                          <>
                            <span>Reserve Table Now</span>
                            <ArrowRight className="w-4 h-4 text-black" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    // Outstanding Interactive Success confirmation view
                    <motion.div 
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
                        <Check className="w-12 h-12" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-black text-white">Table Reservaton Confirmed!</h3>
                        <p className="text-gray-400 text-sm">We are thrilled to serve you at Vibes Lounge & Grill.</p>
                      </div>

                      {/* Display Reference Box details */}
                      <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-xs uppercase font-mono text-gray-400">Booking Reference</span>
                          <span className="text-sm font-mono font-bold text-gold">{bookingSuccess.reference}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">Name</span>
                          <span className="text-white text-right font-medium">{bookingSuccess.details.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">Guests</span>
                          <span className="text-white font-medium">{bookingSuccess.details.guests} People</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">Date</span>
                          <span className="text-white font-medium">{bookingSuccess.details.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">Time</span>
                          <span className="text-white font-medium">{bookingSuccess.details.time}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                        * A validation message and booking reminder code has been logged to your phone {bookingSuccess.details.phone}. No prepayment is required.
                      </p>

                      <button 
                        type="button" 
                        onClick={() => setBookingSuccess(null)}
                        className="inline-flex px-6 py-2.5 rounded-xl border border-white/20 text-white hover:border-gold hover:text-gold transition-colors text-xs font-semibold tracking-wider uppercase font-mono"
                      >
                        Book Another Spot
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-dark-pitch border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">Monrovia Reviews</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight">The Vibes Love Is Real</h2>
            <div className="h-1.5 w-20 bg-burgundy mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review) => (
              <motion.div 
                key={review.id}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-dark-card border border-white/5 flex flex-col justify-between h-full space-y-6"
              >
                {/* Review Text */}
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex space-x-1 text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 font-light leading-relaxed italic text-sm md:text-base">
                    "{review.quote}"
                  </p>
                </div>

                {/* Profile card */}
                <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/40">
                    <img 
                      src={review.avatarUrl} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{review.name}</h4>
                    <span className="text-[11px] font-mono tracking-wide text-gold block">{review.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & LOCATION SECTION */}
      <section id="contact" className="py-24 bg-dark-card border-t border-white/5 relative overflow-hidden">
        
        {/* Soft Gold accent top right */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hour details & Info (Left Side 5 Columns) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-sm font-semibold tracking-widest font-mono text-gold uppercase block">Locate Us</span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight">Hours & Address</h2>
                <div className="h-1.5 w-16 bg-burgundy rounded-full animate-pulse"></div>
              </div>

              {/* Hour breakdown */}
              <div className="p-6 rounded-2xl bg-dark-pitch/50 border border-white/5 space-y-4">
                <h3 className="text-sm font-mono text-gold uppercase tracking-wider font-semibold">Opening Hours</h3>
                
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Monday - Thursday</span>
                    <span className="text-white">11:00 AM - 01:00 AM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Friday - Saturday</span>
                    <span className="text-gold font-bold">11:00 AM - 03:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white">11:00 AM - 02:00 AM</span>
                  </div>
                </div>
              </div>

              {/* Hot actions buttons (Whatsapp / Call) */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest text-gray-400">Instant Contact Desk</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href="tel:+231777622444" 
                    className="p-4 rounded-xl bg-dark-pitch border border-white/10 text-white hover:border-gold transition-all duration-300 flex items-center justify-center space-x-3 text-sm font-semibold font-mono"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    <span>Call Now Desk</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/231777622444" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/30 text-white hover:border-emerald-500 transition-all duration-300 flex items-center justify-center space-x-3 text-sm font-semibold font-mono"
                  >
                    {/* Standard Message Icon representing Whatsapp */}
                    <Smile className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Custom Styled Map Frame Placeholder (Right Side 7 Columns) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[400px] w-full bg-dark-pitch">
                
                {/* Styled Map Background Grid using CSS Lines representing roads */}
                <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
                  <div className="w-full h-full bg-[radial-gradient(#C9A84C_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                  {/* Road lines mock */}
                  <div className="absolute top-1/4 left-0 right-0 h-10 bg-white/20 transform rotate-6 border-y border-white/10"></div>
                  <div className="absolute top-0 bottom-0 left-1/3 w-16 bg-white/15 transform -rotate-12 border-x border-white/10"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-[100px] bg-sky-950/30 border-y border-white/10 flex items-center justify-center">
                    <span className="text-xs uppercase font-mono text-sky-400">TUBMAN BOULEVARD MONROVIA</span>
                  </div>
                </div>

                {/* Styled overlay mapping pin with a glowing ripple effect */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  
                  {/* Glowing core and ripple */}
                  <div className="relative mb-4 flex items-center justify-center">
                    <span className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-gold/30 opacity-75"></span>
                    <span className="relative flex items-center justify-center p-3.5 rounded-full bg-gold text-black border-2 border-black shadow-lg">
                      <MapPin className="w-6 h-6 stroke-[3]" />
                    </span>
                  </div>

                  {/* Informative Floating Map Card */}
                  <div className="p-5 max-w-sm rounded-2xl bg-black/95 backdrop-blur-xl border border-gold/30 shadow-2xl space-y-2 text-center">
                    <h4 className="text-sm font-serif font-black text-white">Vibes Lounge & Grill Spot</h4>
                    <p className="text-xs text-gray-300">Tubman Boulevard (opposite the beach road), Sinkor, Monrovia, Liberia</p>
                    <span className="inline-block mt-1 text-[10px] font-mono uppercase bg-gold/15 text-gold border border-gold/30 px-2.5 py-0.5 rounded-full">
                      Free Valet Parking Available
                    </span>
                  </div>
                </div>

                {/* Open in Map Link tagger in corner */}
                <div className="absolute bottom-4 right-4 z-20">
                  <a 
                    href="https://maps.google.com/?q=Sinkor,Monrovia,Liberia" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 bg-black/90 border border-white/5 hover:border-gold text-white text-xs font-mono rounded-lg flex items-center space-x-2 shadow-lg transition-all"
                  >
                    <span>View on Google Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-pitch border-t border-white/5 relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-10">
            
            {/* Logo Column */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                VIBES <span className="text-gold font-light">Lounge & Grill</span>
              </span>
              <p className="text-sm text-gray-400 font-light max-w-xs leading-relaxed">
                Good Food. Good Music. Good Vibes. West Africa's leading Afro-urban gastronomy oasis.
              </p>
              
              {/* Instagram link & Socials */}
              <div className="flex items-center space-x-4 pt-2">
                <a 
                  href="https://instagram.com/vibesloungegrill" 
                  aria-label="Vibes Lounge Instagram profile"
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-gold hover:bg-white/10 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:hello@vibesliberia.com" 
                  aria-label="Vibes Lounge Email desk"
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-gold hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3.5 font-mono text-xs">
              <h4 className="text-gray-300 font-semibold tracking-wider uppercase text-[10px]">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-gold transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#menu" className="text-gray-400 hover:text-gold transition-colors">Taste Menu</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-gold transition-colors">Vibes Gallery</a></li>
              </ul>
            </div>

            {/* In Liberia Support note */}
            <div className="space-y-3.5 font-sans text-xs font-light">
              <h4 className="text-gray-300 font-semibold tracking-wider font-mono uppercase text-[10px]">Reservations Desk</h4>
              <p className="text-gray-400 leading-relaxed">
                Book early for weekend slots as DJ tables fill quickly. We accept local currency, USD, and major card networks.
              </p>
              <div className="pt-1 flex items-center space-x-1.5 text-[10px] font-mono text-gold uppercase tracking-widest font-bold">
                <span>📍 SINKOR, MONROVIA</span>
              </div>
            </div>

          </div>

          {/* Copy disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
            <span>© 2026 Vibes Lounge & Grill. All Rights Reserved.</span>
            <span>Proudly Liberian 🇱🇮</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
