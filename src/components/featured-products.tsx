'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/contexts/CartContext'
import { Plus, Minus } from 'lucide-react'

const products = [
  { id: 1, name: 'Wireless Headphones', price: '129.99', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 2, name: 'Smart Watch', price: '199.99', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80' },
  { id: 3, name: 'Digital Camera', price: '449.99', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80' },
  { id: 4, name: 'Laptop', price: '999.99', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
]

export default function FeaturedProducts() {
  const { addToCart, updateQuantity, getItemQuantity } = useCart()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  const handleAddToCart = (product: typeof products[0]) => {
    const currentQuantity = getItemQuantity(product.id)
    if (currentQuantity === 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    } else {
      updateQuantity(product.id, currentQuantity + 1)
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6">
          {products.map((product) => {
            const quantity = getItemQuantity(product.id)
            return (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover mb-4 rounded-t-lg"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  {quantity === 0 ? (
                    <Button className="w-full" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product.id, quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

