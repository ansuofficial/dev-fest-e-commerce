import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { id: 2, name: 'Clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80' },
  { id: 3, name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80' },
  { id: 4, name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80' },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={`/category/${category.id}`} key={category.id} className="block">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="font-semibold text-lg text-white">{category.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

