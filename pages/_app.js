import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">
        <Navbar />
        {/* Add padding so content is not hidden behind navbar */}
        <main className="pt-20 px-4 sm:px-8">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
