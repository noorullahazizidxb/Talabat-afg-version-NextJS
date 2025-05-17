// pages/category/[slug].tsx
import { useRouter, useParams } from 'next/navigation'
import Layout from '@/components/Layout'
import Head from 'next/head'
import Breadcrumbs from '@/components/Breadcrumbs'
import Header from '@/components/Header'
import OrderPage from '../order'
import Footer from '@/components/Footer'
import React from 'react'
import GroceryPage from '../grocery'

const categoryDescriptions: Record<string, string | React.ReactElement> = {
    order: <OrderPage/>,
    grocery: <GroceryPage/>,
    flowers: 'Send flowers for any occasion.',
    medicine: 'Order medicine quickly and easily.',
    donations: 'Make a difference with your donation.',
    mart: '20-min delivery from talabat mart.',
}

export default function CategoryPage() {
    const router = useRouter()
    const params = useParams()
    const slug = typeof params?.slug === 'string' ? params.slug : ''
    const description = slug ? (categoryDescriptions[slug] || 'No description available.') : 'Select a category'
    // Create a text-only version of the description for meta tags
    const metaDescription = typeof description === 'string' ? description : 'Order food and more from Talabat'
    
    return (
        <>
            <Head>
                <title>{slug ? `${slug} - Talabat` : 'Talabat Categories'}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={slug ? `${slug} | Talabat` : 'Talabat Categories'} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
            </Head>
            <Header/>
            <div className="max-w-4xl mx-auto py-10 px-6">
                <Breadcrumbs segments={slug ? ['catagory', slug] : []} />
                {slug ? (
                    <>
                        <h1 className="text-3xl font-bold capitalize mb-4">
                            {slug.charAt(0).toUpperCase() + slug.slice(1)} Category
                        </h1>
                        <div>{typeof description === 'string' ? <p>{description}</p> : description}</div>
                    </>
                ) : (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Select a Category</h1>
                        <p>Please choose a category from the navigation</p>
                    </div>
                )}
            </div>
            <Footer/>
        </>    )
}
