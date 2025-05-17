import React from 'react'
import CorporateNavbar from '@/components/navbar/CorporateNavbar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function SustainabilityPage() {
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
                Small actions
                <br />
                <span className="text-lime-300">Big impact</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-6"
              >
                Sustainability at talabat is about making responsible choices that create positive change for our planet and communities.
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
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500&auto=format&fit=crop" 
                  alt="Sustainability" 
                  width={500} 
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Commitment Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center text-gray-800 mb-6"
            >
              Sustainability at talabat
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-4 text-center"
            >
              At talabat, we're committed to making a positive impact on the environment and the communities we serve. We believe that even small actions can create significant change when we work together.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600 text-center"
            >
              Our sustainability strategy focuses on reducing our carbon footprint, minimizing waste, supporting local communities, and promoting responsible consumption.
            </motion.p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-orange-300 z-0"></div>
            
            <div className="relative z-10 space-y-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Sustainability Journey</h3>
                  <p className="text-gray-600 mb-4">
                    Since 2020, we've been on a mission to make our operations more sustainable. We started with small steps, like reducing plastic in our packaging and optimizing delivery routes to minimize emissions.
                  </p>
                  <p className="text-gray-600">
                    Today, our sustainability initiatives span across all aspects of our business, from our offices to our delivery network, and we're proud of the progress we've made.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <Image 
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=500&auto=format&fit=crop" 
                      alt="Sustainability journey" 
                      width={600} 
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row-reverse items-center"
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Goals for 2025</h3>
                  <p className="text-gray-600 mb-4">
                    By 2025, we aim to reduce our carbon emissions by 30%, eliminate single-use plastics from our operations, and ensure that 100% of our packaging is recyclable or compostable.
                  </p>
                  <p className="text-gray-600">
                    We're also committed to supporting local communities through various initiatives, including food donation programs and partnerships with local environmental organizations.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <Image 
                      src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=500&auto=format&fit=crop" 
                      alt="Sustainability goals" 
                      width={600} 
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-16"
          >
            <span className="text-orange-500">CREATING POSITIVE</span>
            <br />
            <span className="text-lime-500">IMPACT</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-orange-500 rounded-xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Creating cleaner cities with sustainable delivery</h3>
              <p className="mb-6">
                We're transitioning to electric vehicles and bicycles for delivery in urban areas, reducing emissions and noise pollution while improving air quality.
              </p>
              <div className="border-t border-white/30 pt-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">500+</div>
                    <div className="text-sm">Electric vehicles in our fleet</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-orange-500 rounded-xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Contributing to circular economy</h3>
              <p className="mb-6">
                We're working with our restaurant partners to implement sustainable packaging solutions and reduce food waste through donation programs and composting initiatives.
              </p>
              <div className="border-t border-white/30 pt-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">75%</div>
                    <div className="text-sm">Reduction in plastic packaging</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-orange-500 rounded-xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Reducing our carbon footprint</h3>
              <p className="mb-6">
                We're optimizing delivery routes, using renewable energy in our offices, and offsetting our carbon emissions through investments in environmental projects.
              </p>
              <div className="border-t border-white/30 pt-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">20%</div>
                    <div className="text-sm">Reduction in CO2 emissions</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Electric Vehicles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1631990997556-2cdc12e4bb4e?q=80&w=500&auto=format&fit=crop" 
                  alt="Electric delivery vehicles" 
                  width={600} 
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Electrifying Our Fleet</h2>
                <p className="text-gray-600 mb-4">
                  We're proud to be transitioning our delivery fleet to electric vehicles across the region. This initiative is a key part of our commitment to reducing our environmental impact and creating cleaner cities.
                </p>
                <p className="text-gray-600 mb-6">
                  By 2025, we aim to have 50% of our deliveries made by electric vehicles or bicycles in urban areas, significantly reducing our carbon emissions and contributing to better air quality.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-500 mb-1">60%</div>
                    <div className="text-sm text-gray-700">Lower emissions per delivery</div>
                  </div>
                  <div className="bg-orange-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-500 mb-1">8</div>
                    <div className="text-sm text-gray-700">Cities with electric fleets</div>
                  </div>
                </div>
              </motion.div>
            </div>
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
