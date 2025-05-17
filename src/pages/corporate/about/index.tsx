import React from 'react'
import CorporateNavbar from '@/components/navbar/CorporateNavbar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
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
                About talabat
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-6"
              >
                Delivering connections, not just orders.
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
                  src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=500&auto=format&fit=crop" 
                  alt="Talabat office" 
                  width={500} 
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 text-gray-800"
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-4"
            >
              Founded in 2004, talabat has grown from a small food delivery service to the Middle East's leading local food delivery marketplace. Serving millions of customers across the region, we connect people with their favorite restaurants, grocery stores, and more.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600"
            >
              Today, we're part of Delivery Hero, operating in 8 countries across the Middle East. Our mission is to deliver anything our customers need, whenever they need it, right to their doorstep.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To deliver an amazing experience to every customer, every time. We strive to connect people with their favorite food, groceries, and more, making everyday life easier and more enjoyable.
              </p>
              <p className="text-gray-600">
                We're committed to supporting local businesses, providing exceptional service, and creating positive impacts in the communities we serve.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To be the most loved delivery app in the region, known for our reliability, convenience, and exceptional customer experience.
              </p>
              <p className="text-gray-600">
                We envision a world where getting what you need is as simple as a few taps on your phone, where local businesses thrive, and where every delivery brings joy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Key Figures Section */}
      <section className="py-16 bg-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Figures</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">25K+</div>
              <div className="text-gray-600">Restaurant Partners</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">8</div>
              <div className="text-gray-600">Countries</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">4K+</div>
              <div className="text-gray-600">Employees</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">15M+</div>
              <div className="text-gray-600">App Downloads</div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Leadership Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="h-64 relative">
                  <Image 
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 10}.jpg`} 
                    alt="Team member" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {index === 0 ? 'Sarah Ahmed' : 
                     index === 1 ? 'Mohammed Al-Faisal' : 
                     index === 2 ? 'Layla Kareem' : 
                     index === 3 ? 'Omar Rashid' : 
                     index === 4 ? 'Fatima Zaidi' : 'Khalid Al-Mansour'}
                  </h3>
                  <p className="text-orange-500 font-medium mb-4">
                    {index === 0 ? 'Chief Executive Officer' : 
                     index === 1 ? 'Chief Technology Officer' : 
                     index === 2 ? 'Chief Marketing Officer' : 
                     index === 3 ? 'Chief Financial Officer' : 
                     index === 4 ? 'VP of Operations' : 'VP of Business Development'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    With over {10 + index} years of experience in the {index % 2 === 0 ? 'technology' : 'food delivery'} industry, {index % 2 === 0 ? 'she' : 'he'} leads our team with passion and vision.
                  </p>
                </div>
              </motion.div>
            ))}
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
