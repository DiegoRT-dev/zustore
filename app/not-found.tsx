import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-black flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-8xl sm:text-9xl font-bold text-blue-500/30 mb-6">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          Pagina no encontrada
        </h1>

        <p className="text-gray-400 mb-8 text-lg">
          Lo que buscas que buscas no existe o fue eliminado de la tienda.
        </p>

        <Link
          href="/"
          className="
            inline-block rounded-lg bg-blue-600 px-8 py-4
            font-medium text-white hover:bg-blue-700
            transition-colors shadow-lg shadow-blue-600/20
          "
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}