export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
          <div className="mt-2 flex space-x-4">
            <a href="https://github.com" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              GitHub
            </a>
            <a href="/rss.xml" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 