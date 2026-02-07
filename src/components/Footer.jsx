export default function Footer() {
  return (
    <footer className="mt-12 py-8 text-center text-sm text-white/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-2">© {new Date().getFullYear()} AnyJob. Built with ❤️</div>
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <span className="opacity-40">•</span>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}