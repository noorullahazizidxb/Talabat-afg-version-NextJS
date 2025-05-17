import React from 'react'
import CorporateNavbar from '@/components/navbar/CorporateNavbar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme, cn } from '@/utils/theme'

export default function CorporatePage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-200",
      isDark ? "bg-gray-900 text-white" : "bg-orange-50 text-gray-900"
    )}>
      <CorporateNavbar />
      
      {/* Hero Section */}
      <section className={cn(
        "text-white py-16 transition-colors duration-200",
        isDark ? "bg-orange-900" : "bg-orange-500"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Driven?
                <br />
                <span className={cn(
                  isDark ? "text-lime-400" : "text-lime-300"
                )}>So Are We.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg mb-6"
              >
                Be part of a company that delivers. We're not just a food delivery app - we're on a mission to transform how people experience food.
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
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=500&auto=format&fit=crop" 
                  alt="Driven professional" 
                  width={500} 
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cn(
                "rounded-3xl overflow-hidden transition-colors duration-200",
                isDark ? "bg-orange-800" : "bg-orange-300"
              )}
            >
              <Image 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=500&auto=format&fit=crop" 
                alt="Team collaboration" 
                width={600} 
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "rounded-3xl overflow-hidden transition-colors duration-200",
                isDark ? "bg-orange-700" : "bg-orange-200"
              )}
            >
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop" 
                alt="Team meeting" 
                width={600} 
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cn(
                "text-3xl font-bold mb-6 transition-colors duration-200",
                isDark ? "text-gray-100" : "text-gray-800"
              )}
            >
              Big Dreams, Real Impact, and a Place to Grow
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 mb-4"
            >
              We're not just a food delivery platform - we're a tech company on a mission to transform how people experience food. Join our team of passionate innovators who are making a difference every day.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn(
                "transition-colors duration-200",
                isDark ? "text-gray-300" : "text-gray-600"
              )}
            >
              At Talabat, we're committed to creating an inclusive workplace where diverse talents thrive and grow. We offer competitive benefits, growth opportunities, and a vibrant culture that celebrates innovation.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 mb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              "rounded-xl p-12 text-center text-white transition-colors duration-200",
              isDark ? "bg-orange-900" : "bg-orange-500"
            )}
          >
            <h2 className="text-4xl font-bold mb-4">
              READY TO MAKE
              <br />
              <span className={cn(
                isDark ? "text-lime-400" : "text-lime-300"
              )}>MOVES</span>
              <br />
              TOGETHER?
            </h2>
            <Link href="/careers">
              <button className={cn(
                "mt-6 px-6 py-3 rounded-full font-bold transition-colors",
                isDark 
                  ? "bg-lime-400 text-orange-900 hover:bg-lime-500" 
                  : "bg-lime-300 text-orange-800 hover:bg-lime-400"
              )}>
                See our careers
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={cn(
        "py-12 transition-colors duration-200",
        isDark ? "bg-gray-800" : "bg-orange-100"
      )}>
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
                <h3 className={cn(
                  "font-bold mb-4 transition-colors duration-200",
                  isDark ? "text-gray-200" : "text-gray-800"
                )}>General Inquiries</h3>
                <ul className={cn(
                  "space-y-2 transition-colors duration-200",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  <li>How can we help you?</li>
                  <li>info@talabat.com</li>
                </ul>
              </div>
              <div>
                <h3 className={cn(
                  "font-bold mb-4 transition-colors duration-200",
                  isDark ? "text-gray-200" : "text-gray-800"
                )}>Talabat</h3>
                <ul className={cn(
                  "space-y-2 transition-colors duration-200",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div>
                <h3 className={cn(
                  "font-bold mb-4 transition-colors duration-200",
                  isDark ? "text-gray-200" : "text-gray-800"
                )}>Service</h3>
                <ul className={cn(
                  "space-y-2 transition-colors duration-200",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  <li>Help</li>
                  <li>Contact</li>
                  <li>FAQs</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={cn(
            "mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center transition-colors duration-200",
            isDark ? "border-gray-700" : "border-orange-200"
          )}>
            <p className={cn(
              "mb-4 md:mb-0 transition-colors duration-200",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>© {new Date().getFullYear()} Talabat. All rights reserved.</p>
            <div className="flex space-x-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200",
                isDark ? "bg-orange-700" : "bg-orange-500"
              )}>f</div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200",
                isDark ? "bg-orange-700" : "bg-orange-500"
              )}>t</div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200",
                isDark ? "bg-orange-700" : "bg-orange-500"
              )}>in</div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200",
                isDark ? "bg-orange-700" : "bg-orange-500"
              )}>ig</div>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-200",
                isDark ? "bg-orange-700" : "bg-orange-500"
              )}>yt</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
