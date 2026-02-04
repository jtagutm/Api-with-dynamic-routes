import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-orange-400">
          DRAGON BALL
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300">
          Explorador de Personajes
        </p>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
          Descubre todos los personajes del universo Dragon Ball con información detallada y transformaciones
        </p>
        <div className="pt-8">
          <Link 
            href="/personajes"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg px-10 py-4 rounded-lg transition-colors"
          >
            Ver Personajes
          </Link>
        </div>
      </div>
    </div>
  );
}