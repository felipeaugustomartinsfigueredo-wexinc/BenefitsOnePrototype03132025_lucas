import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Maximize Your HSA Benefits',
    description: 'Learn how to make the most of your Health Savings Account with our expert tips and strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Learn More',
    ctaUrl: '/hsa/account',
  },
  {
    id: '2',
    title: 'New Dental Coverage Options',
    description: 'Explore our enhanced dental coverage plans with better benefits and lower premiums.',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    ctaText: 'View Plans',
    ctaUrl: '/dental',
  },
  {
    id: '3',
    title: 'Family Coverage Made Easy',
    description: 'Managing your family\'s healthcare has never been simpler with our integrated platform.',
    imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Get Started',
    ctaUrl: '/dependents',
  },
  {
    id: '4',
    title: 'Vision Benefits Spotlight',
    description: 'Get comprehensive vision coverage including eye exams, glasses, and contact lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1577401132921-cb39bb0adcff?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Explore Coverage',
    ctaUrl: '/vision',
  },
  {
    id: '5',
    title: 'Life Insurance Protection',
    description: 'Secure your family\'s future with our comprehensive life insurance coverage options.',
    imageUrl: 'https://images.unsplash.com/photo-1511376868136-742c0de277e2?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Learn More',
    ctaUrl: '/life',
  },
  {
    id: '6',
    title: 'Disability Coverage',
    description: 'Protect your income with short-term and long-term disability insurance options.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    ctaText: 'View Benefits',
    ctaUrl: '/disability',
  }
];

export const MarketingCarousel: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden relative`}>
      <div 
        className="relative h-[200px] sm:h-[300px] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative w-full h-full flex-shrink-0"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-4 sm:p-8 max-w-lg">
                  <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                    {slide.description}
                  </p>
                  <a
                    href={slide.ctaUrl}
                    className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white text-sm sm:text-base transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: theme.colors.primary.teal }}
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};