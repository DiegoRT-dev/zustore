import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-sm">

          <p>
            Creado por{" "}
            <strong className="text-gray-900 dark:text-gray-100">Diego RT</strong>
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/DiegoRT-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de GitHub de Diego"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.105-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.296 2.747-1.026 2.747-1.026.546 1.377.204 2.394.1 2.647.64.699 1.026 1.592 1.026 2.683 0 3.842-2.339 4.687-4.566 4.935.36.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.478-10-10-10z" />
              </svg>
              GitHub
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-600">
          © {new Date().getFullYear()} Zustore. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}