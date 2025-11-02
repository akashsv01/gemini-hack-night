import './globals.css';

// Metadata is required for Next.js 13+ App Router
export const metadata = {
  title: 'Creamy Garlic Butter Pasta Recipe',
  description: 'A quick and delicious pasta recipe made with simple ingredients.',
};

// Simple Navigation Component (put in layout since it should be on every page)
const Navbar = () => (
  <header className="sticky top-0 z-10 bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Recipe Explorer
        </h1>
        <nav>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md transition duration-150">
            Home
          </a>
          {/* We could add more links here later, like 'About' or 'Contact' */}
        </nav>
      </div>
    </div>
  </header>
);

// The main root layout function
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        {/* Load Inter font from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind CSS Script is required for styling */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style dangerouslySetInnerHTML={{
          __html: `
            body { font-family: 'Inter', sans-serif; }
          `
        }}></style>
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="w-full bg-gray-800 text-white p-4 mt-8">
            <div className="max-w-7xl mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} Recipe App. Built with Next.js and Gemini.
            </div>
        </footer>
      </body>
    </html>
  );
}
