import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        image: '/images/slider/slide1.png',
        alt: 'Students Collaborating on Code',
        title: 'Collaborate & Innovate',
        description: 'Work together on real-world projects.',
    },
    {
        image: '/images/slider/slide2.png',
        alt: 'Project Presentation',
        title: 'Present with Confidence',
        description: 'Master your project defence with our resources.',
    },
    {
        image: '/images/slider/slide3.png',
        alt: 'Robotics Lab',
        title: 'Build the Future',
        description: 'Hardware and robotics projects at your fingertips.',
    },
    {
        image: '/images/slider/slide4.png',
        alt: 'Graduation Celebration',
        title: 'Achieve Your Dreams',
        description: 'Join thousands of successful graduates.',
    },
    {
        image: '/images/slider/slide5.png',
        alt: 'Hackathon Event',
        title: 'Hack Your Way to Success',
        description: 'Participate in events and grow your skills.',
    },
    {
        image: '/images/slider/slide6.png',
        alt: 'Award Ceremony',
        title: 'Get Recognized',
        description: 'Win awards and build your portfolio.',
    },
];

const HeroSlider = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
        Autoplay({ delay: 4000, stopOnInteraction: false }),
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative group w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="embla overflow-hidden h-full" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {slides.map((slide, index) => (
                        <div className="embla__slide flex-[0_0_100%] min-w-0 relative h-full" key={index}>
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
                                <div className="max-w-xl text-left animate-slide-up">
                                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 shadow-sm">
                                        {slide.title}
                                    </h3>
                                    <p className="text-white/90 text-sm md:text-lg font-medium shadow-sm">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={scrollPrev}
            >
                <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={scrollNext}
            >
                <ChevronRight className="w-6 h-6" />
            </Button>
        </div>
    );
};

export default HeroSlider;
