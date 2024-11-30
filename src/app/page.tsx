import Header from '@/components/header'
import Hero from '@/components/hero'
import FeaturedProducts from '@/components/featured-products'
import Categories from '@/components/categories'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'
import Cart from '@/components/cart'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16"> {/* Add padding-top to account for fixed header */}
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FeaturedProducts />
            </div>
            <div className="md:col-span-1">
              <Cart />
            </div>
          </div>
        </div>
        <Categories />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

