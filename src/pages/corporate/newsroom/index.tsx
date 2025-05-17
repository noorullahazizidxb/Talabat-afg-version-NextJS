import React from 'react'
import CorporateNavbar from '@/components/navbar/CorporateNavbar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

// Sample news articles
const newsArticles = [
  {
    id: 1,
    title: 'talabat completes acquisition of instacart, a leading grocery e-marketplace in MENA',
    excerpt: `The acquisition strengthens talabat's position in the grocery delivery market and expands its offerings to customers.`,
    date: 'April 28, 2025',
    author: 'talabat PR Team',
    category: 'Press Release',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'talabat reports strong results for 2024, delivering on guidance',
    excerpt: 'The company exceeded growth targets and expanded into new markets, with a 30% increase in orders year-over-year.',
    date: 'March 15, 2025',
    author: 'talabat PR Team',
    category: 'Financial News',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Talabat Holding PLC prices its IPO at the top of the range, raising $2 billion in the largest global tech IPO in 2024 to date',
    excerpt: 'The successful IPO marks a major milestone for the company and the regional tech ecosystem.',
    date: 'February 10, 2025',
    author: 'talabat PR Team',
    category: 'Corporate News',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Talabat Holding PLC offering size increased to address significant international and regional investor demand',
    excerpt: 'Due to overwhelming investor interest, the company has increased its offering size by 15%.',
    date: 'January 25, 2025',
    author: 'talabat PR Team',
    category: 'Corporate News',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Talabat Holding plc announces offer price range and start of subscription period for initial public offering',
    excerpt: 'The company sets the price range for its highly anticipated IPO, with subscription period starting next week.',
    date: 'January 5, 2025',
    author: 'talabat PR Team',
    category: 'Corporate News',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=500&auto=format&fit=crop'
  }
];

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'press', name: 'Press Releases' },
    { id: 'financial', name: 'Financial News' },
    { id: 'corporate', name: 'Corporate News' },
    { id: 'blog', name: 'Blog Posts' }
  ];
  
  const filteredArticles = activeCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => {
        if (activeCategory === 'press') return article.category === 'Press Release';
        if (activeCategory === 'financial') return article.category === 'Financial News';
        if (activeCategory === 'corporate') return article.category === 'Corporate News';
        if (activeCategory === 'blog') return article.category === 'Blog Post';
        return true;
      });

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
                Making headlines
                <br />
                <span className="text-lime-300">that matter</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl mb-6"
              >
                Check out the latest news, updates, and stories from talabat. Discover how we're transforming food delivery across the region.
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
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=500&auto=format&fit=crop" 
                  alt="Newsroom" 
                  width={500} 
                  height={400}
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Categories */}
      <section className="bg-white py-6 border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured News */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                  
                  <Link href={`/corporate/newsroom/article/${article.id}`}>
                    <div className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors">
                      Read more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Press Kit Section */}
      <section className="py-16 bg-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Press Kit</h2>
              <p className="text-gray-600 mb-6">
                Download our press kit for official logos, brand guidelines, executive photos, and other resources for media coverage.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center">
                Download Press Kit
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Image 
                    src="/images/logo.png" 
                    alt="Talabat Logo" 
                    width={200} 
                    height={80}
                    className="w-full h-auto"
                  />
                  <p className="text-sm text-gray-500 mt-2">Primary Logo</p>
                </div>
                <div className="bg-orange-500 p-4 rounded-lg shadow-md">
                  <Image 
                    src="/images/logo.png" 
                    alt="Talabat Logo White" 
                    width={200} 
                    height={80}
                    className="w-full h-auto"
                  />
                  <p className="text-sm text-white mt-2">White Logo</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="h-16 bg-orange-500 rounded"></div>
                  <p className="text-sm text-gray-500 mt-2">Brand Colors</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="font-bold text-lg">Aa Bb Cc</div>
                  <p className="text-sm text-gray-500 mt-2">Typography</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Media Contacts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Media Contacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Press Inquiries</h3>
              <p className="text-gray-600 mb-4">For media inquiries, interview requests, and press releases.</p>
              <div className="text-orange-500 font-medium">press@talabat.com</div>
              <div className="text-gray-600">+971 4 123 4567</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Investor Relations</h3>
              <p className="text-gray-600 mb-4">For investor inquiries, financial reports, and shareholder information.</p>
              <div className="text-orange-500 font-medium">investors@talabat.com</div>
              <div className="text-gray-600">+971 4 123 4568</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Corporate Communications</h3>
              <p className="text-gray-600 mb-4">For general corporate communications and partnership inquiries.</p>
              <div className="text-orange-500 font-medium">communications@talabat.com</div>
              <div className="text-gray-600">+971 4 123 4569</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-lg mb-8">Subscribe to our newsletter to receive the latest news and updates from talabat directly in your inbox.</p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-orange-500 px-6 py-3 rounded-md font-medium hover:bg-orange-100 transition-colors">
                Subscribe
              </button>
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
                src="/src/images/logo.png" 
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
