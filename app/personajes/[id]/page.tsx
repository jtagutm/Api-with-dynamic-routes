import Image from "next/image";
import Link from "next/link";

type Transformation = {
  id: number;
  name: string;
  image: string;
  ki: string;
};

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
  transformations?: Transformation[];
};

async function getCharacter(id: string): Promise<Character | null> {
  try {
    const res = await fetch(
      `https://dragonball-api.com/api/characters/${id}`,
      { 
        cache: "no-store",
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!res.ok) {
      console.error('Error en la respuesta:', res.status);
      return null;
    }

    const data: Character = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
}
interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-4">
            Personaje no encontrado
          </h1>
          <p className="text-gray-400 mb-8">
            El personaje con ID {id} no existe
          </p>
          <Link
            href="/personajes"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded transition-colors"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/personajes"
        className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors"
      >
        Volver al catálogo
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-orange-400 mb-4">
              {character.name}
            </h1>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Estadísticas
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 font-medium">Raza:</span>
                <span className="text-white">{character.race}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 font-medium">Género:</span>
                <span className="text-white">{character.gender}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 font-medium">Ki Base:</span>
                <span className="text-white">{character.ki}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 font-medium">Ki Máximo:</span>
                <span className="text-white">{character.maxKi}</span>
              </div>
              {character.affiliation && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 font-medium">Afiliación:</span>
                  <span className="text-white">{character.affiliation}</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Descripción
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {character.description}
            </p>
          </div>
        </div>
      </div>
      {character.transformations && character.transformations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">
            Transformaciones
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {character.transformations.map((transformation) => (
              <div
                key={transformation.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-colors"
              >
                <div className="relative h-48 sm:h-56 bg-gray-900">
                  <Image
                    src={transformation.image}
                    alt={transformation.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">
                    {transformation.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    <span className="font-medium">Ki:</span> {transformation.ki}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-12 flex justify-center gap-4">
        {parseInt(id) > 1 && (
          <Link
            href={`/personajes/${parseInt(id) - 1}`}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded transition-colors"
          >
            Anterior
          </Link>
        )}
        <Link
          href={`/personajes/${parseInt(id) + 1}`}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded transition-colors"
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}
