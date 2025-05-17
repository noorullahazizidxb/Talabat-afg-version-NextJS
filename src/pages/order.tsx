import Footer from "@/components/Footer";
import Header from "@/components/Header";

// pages/order.tsx
export default function OrderPage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order</h1>
      <p>Place your order now.</p>
    </div>
    <Footer/>
    </>
  )
}
