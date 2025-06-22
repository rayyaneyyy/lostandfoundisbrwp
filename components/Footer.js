export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 py-4 text-center mt-10 border-t dark:border-zinc-700">
      <p className="text-sm">
        © {new Date().getFullYear()} Lost & Found ISB/RWP — All rights reserved.
      </p>
    </footer>
  );
}
