'use client'

import * as React from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

export default function Header() {
  const { cart } = useCart()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              ShopNow
            </Link>
          </div>
          
          <div className="flex items-center">
           
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Sheet modal={false}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] h-full bg-white z-50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <SheetClose asChild>
                    {/* <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button> */}
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link href="/" className="text-lg hover:text-gray-600">Login</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/products" className="text-lg hover:text-gray-600">Sign up</Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
             <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Link href="/login" className="hover:text-gray-600">Login</Link></li>
             <li><Link href="/signup" className="hover:text-gray-600">Sign up</Link></li>
            </ul>
          </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

