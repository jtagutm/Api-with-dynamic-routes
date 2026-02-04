import Image from "next/image";
import Link from "next/link";

type Character = {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
};

type ApiResponse = {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    currentPage: number;
  };
};

async function getCharacters(): Promise<Character[]> {
  try {
    const res = await fetch(
      "https://dragonball-api.com/api/characters?limit=48",
      { 
        cache: "no-store",
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.error('Error en la respuesta:', res.status);
      return [];
    }

    const data: ApiResponse = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}

export default async function CharactersPage() {
  const characters = await getCharacters();

  if (characters.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-orange-400">No se pudieron cargar los personajes</p>
          <p className="text-gray-400 mt-2">Intenta recargar la página</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-4">
          Personajes de Dragon Ball
        </h1>
        <p className="text-lg text-gray-400">
          Explora la información de cada personaje
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link
            key={character.id}
            href={`/personajes/${character.id}`}
            className="group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors border border-gray-700 hover:border-orange-500">
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-900">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-orange-400 mb-3">
                  {character.name}
                </h2>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Raza:</span> {character.race}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Género:</span> {character.gender}
                  </p>
                  {character.affiliation && (
                    <p className="text-gray-400">
                      <span className="font-semibold text-gray-300">Afiliación:</span> {character.affiliation}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-orange-400 font-medium text-sm">
                    Ver detalles
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-12 text-gray-500">
        <p>Mostrando {characters.length} personajes</p>
      </div>
    </div>
  );
}