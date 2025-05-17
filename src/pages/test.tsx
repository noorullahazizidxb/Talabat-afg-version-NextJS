export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test Page</h1>
      <p className="text-white text-xl">If you can see this with blue background and white text, Tailwind is working!</p>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 rounded text-white text-center">Red Box</div>
        <div className="bg-green-500 p-4 rounded text-white text-center">Green Box</div>
        <div className="bg-yellow-500 p-4 rounded text-white text-center">Yellow Box</div>
      </div>
    </div>
  )
}
