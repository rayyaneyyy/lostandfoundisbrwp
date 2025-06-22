import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lost & Found Islamabad / Rawalpindi</title>
      </Head>

      <main className="relative min-h-screen bg-cover bg-center text-white dark:text-white"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/d/dd/Faisal_Mosque_Islamabad.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-60" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-md text-white">
            Lost Something in Islamabad or Rawalpindi?
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl mb-8 text-gray-100 dark:text-gray-200">
            This is a free community portal where you can post about lost or found items in Islamabad or Rawalpindi. 
            Help someone get their stuff back — or find your own!
          </p>

          <a
            href="/post"
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
          >
            Post a Lost or Found Item
          </a>
        </div>
      </main>
    </>
  );
}
