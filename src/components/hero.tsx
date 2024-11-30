'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80",
    title: "Welcome to ShopNow",
    description: "Discover amazing products at unbeatable prices. Shop now and elevate your lifestyle!",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1920&q=80",
    title: "New Arrivals",
    description: "Check out our latest collection of trendy products!",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=1920&q=80",
    title: "Special Offers",
    description: "Don't miss out on our limited-time deals and discounts!",
  },
]

export default function Hero() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleDotClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <section className="relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[600px] flex items-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="max-w-3xl mx-auto text-center text-white">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mt-6 text-xl">
                      {slide.description}
                    </p>
                    <div className="mt-10">
                      <Button size="lg" variant="secondary">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
        {heroSlides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 p-0 rounded-full ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
