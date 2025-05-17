// pages/grocery.tsx
import Footer from '@/components/Footer'
import Header from '../components/Header'
import { ShoppingCart } from 'lucide-react'

export default function GroceryPage() {

  return (
    <>
    <Header/>
  <div className="min-h-screen bg-orange-50 dark:bg-gray-900">
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="h-8 w-8 text-accent-500" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Grocery Delivery</h1>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Order groceries and essentials from your favorite stores, delivered to your doorstep.
            </p>
            
            <div className="bg-accent-50 dark:bg-accent-900/20 p-4 rounded-lg border border-accent-100 dark:border-accent-800">
              <p className="text-accent-800 dark:text-accent-300 font-medium">
                Get 20% off your first grocery order with code: <span className="font-bold">FRESH20</span>
              </p>
            </div>
          </div>
          
          {/* Categories section placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {['Fruits & Vegetables', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Beverages', 'Household'].map((category) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-medium text-gray-800 dark:text-white">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  )
}
