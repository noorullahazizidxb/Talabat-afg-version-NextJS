import React from 'react'
import CorporateNavbar from '@/components/navbar/CorporateNavbar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Sample menu categories and items
const menuCategories = [
  {
    id: 'popular',
    name: 'Popular Items',
    items: [
      {
        id: 'burger1',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and our special sauce',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: 'pizza1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: 'salad1',
        name: 'Mediterranean Salad',
        description: 'Fresh greens with feta, olives, tomatoes, and our house dressing',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    items: [
      {
        id: 'steak1',
        name: 'Grilled Ribeye Steak',
        description: 'Prime cut ribeye grilled to perfection with roasted vegetables',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: 'pasta1',
        name: 'Creamy Alfredo Pasta',
        description: 'Fettuccine pasta in a rich and creamy Alfredo sauce with grilled chicken',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882a?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: 'fish1',
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet grilled with herbs and served with seasonal vegetables',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 'cake1',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: 'tiramisu1',
        name: 'Classic Tiramisu',
        description: 'Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: 'cheesecake1',
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake with a graham cracker crust, topped with fresh berries',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500&auto=format&fit=crop'
      }
    ]
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState('popular');

  return (
    <div className="min-h-screen bg-orange-50">
      <CorporateNavbar />
      
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Our Menu
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-6"
              >
                Discover our delicious offerings, crafted with care and delivered with love.
              </motion.p>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden border-4 border-white"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop" 
                  alt="Delicious food" 
                  width={500} 
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-800 hover:bg-orange-100'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          
          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuCategories
              .find((cat) => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 relative">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                      <span className="text-orange-500 font-bold">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Special Offers Section */}
      <section className="py-16 bg-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Special Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop" 
                    alt="Family meal deal" 
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Family Meal Deal</h3>
                  <p className="text-gray-600 mb-4">Feed the whole family with our special meal deal. Includes 4 main courses, 2 sides, and a dessert to share.</p>
                  <div className="text-orange-500 font-bold text-xl mb-4">$49.99</div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop" 
                    alt="Buy one get one free" 
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Buy One, Get One Free</h3>
                  <p className="text-gray-600 mb-4">Every Tuesday, buy any burger and get a second one free. Valid for dine-in and takeaway orders.</p>
                  <div className="text-orange-500 font-bold text-xl mb-4">Limited Time Only</div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Dietary Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Dietary Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Vegetarian Options</h3>
              <p className="text-gray-600 text-sm">We offer a wide range of delicious vegetarian options for our plant-loving customers.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Gluten-Free</h3>
              <p className="text-gray-600 text-sm">Many of our dishes can be prepared gluten-free. Just ask your server for options.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Allergen Information</h3>
              <p className="text-gray-600 text-sm">Full allergen information is available upon request. Please inform your server of any allergies.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Halal Options</h3>
              <p className="text-gray-600 text-sm">We offer Halal-certified meat options. Look for the Halal symbol on our menu.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-orange-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Image 
                src="/images/logo.png" 
                alt="Talabat" 
                width={120} 
                height={40}
                className="h-10 w-auto mb-4"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">General Inquiries</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>How can we help you?</li>
                  <li>info@talabat.com</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Talabat</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Service</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Help</li>
                  <li>Contact</li>
                  <li>FAQs</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-orange-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">© {new Date().getFullYear()} Talabat. All rights reserved.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">f</div>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">t</div>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">in</div>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">ig</div>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">yt</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
