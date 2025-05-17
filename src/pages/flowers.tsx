import Footer from "@/components/Footer";
import Header from "@/components/Header";

// pages/flowers.tsx
export default function FlowersPage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Flower Delivery</h1>
      <p>Send flowers to your loved ones for any occasion.</p>
    </div>
    <Footer/>
    </>
  )
}
