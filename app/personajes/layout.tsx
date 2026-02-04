"use client";

import Link from "next/link";
import { ReactNode } from "react";
const menuCharacters = [
{ id: 1, name: "Goku" },
{ id: 2, name: "Vegeta" },
{ id: 3, name: "Piccolo" },
{ id: 4, name: "Bulma" },
{ id: 5, name: "Freezer" },
{ id: 6, name: "Zarbon" },
{ id: 7, name: "Dodoria" },
{ id: 8, name: "Ginyu" },
{ id: 9, name: "Celula" },
{ id: 10, name: "Gohan" },
{ id: 11, name: "Krilin" },
{ id: 12, name: "Tenshinhan" },
{ id: 13, name: "Yamcha" },
{ id: 14, name: "Chi-chi" },
];

export default function CharactersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-xl font-bold text-orange-400 hover:text-orange-300 transition-colors">
              Dragon Ball Universe
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {menuCharacters.map((character) => (
              <Link
                key={character.id}
                href={`/personajes/${character.id}`}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                {character.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-gray-400 text-sm">
            {new Date().getFullYear()} Dragon Ball - Powered by{" "}
            <a 
              href="https://dragonball-api.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              Dragon Ball API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}