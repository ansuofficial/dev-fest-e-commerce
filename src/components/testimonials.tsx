'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import Autoplay from 'embla-carousel-autoplay'
import { type CarouselApi } from '@/components/ui/carousel'

const testimonials = [
  { id: 1, name: 'John Doe', comment: 'Great products and excellent service!', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
  { id: 2, name: 'Jane Smith', comment: 'I love shopping here. Always find what I need.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 3, name: 'Mike Johnson', comment: 'Fast shipping and high-quality items.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
  { id: 4, name: 'Emily Brown', comment: 'The customer service is top-notch!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 5, name: 'Alex Lee', comment: 'Impressive range of products. Highly recommended!', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
]

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-8">What Our Customers Say</h2>
        <Carousel
          setApi={setApi}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-6xl mx-auto"
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
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full mb-4"
                    />
                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-center mt-4 space-x-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <div className="flex justify-center items-center space-x-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 p-0 rounded-full ${
                index === current ? 'bg-primary' : 'bg-primary/20'
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

