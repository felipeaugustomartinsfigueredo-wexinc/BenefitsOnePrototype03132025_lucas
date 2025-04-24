import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useTranslation } from 'react-i18next';

interface Slide {
  id: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  ctaTextKey: string;
  ctaUrl: string;
}

const slides: Slide[] = [
  {
    id: '1',
    titleKey: 'carousel.slides.hsa.title',
    descriptionKey: 'carousel.slides.hsa.description',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80',
    ctaTextKey: 'common.learnMore',
    ctaUrl: '/hsa/account',
  },
  {
    id: '2',
    titleKey: 'carousel.slides.dental.title',
    descriptionKey: 'carousel.slides.dental.description',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    ctaTextKey: 'carousel.cta.viewPlans',
    ctaUrl: '/dental',
  },
  {
    id: '3',
    titleKey: 'carousel.slides.family.title',
    descriptionKey: 'carousel.slides.family.description',
    imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&auto=format&fit=crop&q=80',
    ctaTextKey: 'common.getStarted',
    ctaUrl: '/dependents',
  },
  {
    id: '4',
    titleKey: 'carousel.slides.vision.title',
    descriptionKey: 'carousel.slides.vision.description',
    imageUrl: 'https://images.unsplash.com/photo-1577401132921-cb39bb0adcff?w=800&auto=format&fit=crop&q=80',
    ctaTextKey: 'carousel.cta.exploreCoverage',
    ctaUrl: '/vision',
  },
];

export const MarketingCarousel: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden relative`}>
      <div 
        className="relative h-[300px] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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
                alt={t(slide.titleKey)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-8 max-w-lg">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {t(slide.titleKey)}
                  </h2>
                  <p className="text-gray-200 mb-6">
                    {t(slide.descriptionKey)}
                  </p>
                  <a
                    href={slide.ctaUrl}
                    className="inline-block px-6 py-3 rounded-lg text-white transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: theme.colors.primary.teal }}
                  >
                    {t(slide.ctaTextKey)}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};