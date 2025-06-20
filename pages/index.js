import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Lost & Found ISB/RWP</title>
      </Head>
      <main className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-800">Lost & Found Portal</h1>
        <p className="text-gray-600 mt-2">For Islamabad & Rawalpindi</p>
        <div className="mt-6 space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Post Lost Item</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">View Found Items</button>
        </div>
      </main>
    </div>
  );
}
