import { SearchBar } from "@/components/molecules/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Encuentra tu Próximo <span className="text-blue-600">Favorito</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl">
        Busca entre millones de películas y series de TV. Descubre
        calificaciones, resúmenes de tramas y más.
      </p>

      <SearchBar />

      <div className="mt-16 grid grid-cols-2 gap-8 text-gray-500 sm:grid-cols-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">10M+</span>
          <span className="text-sm">Películas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">2M+</span>
          <span className="text-sm">Series</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">500k+</span>
          <span className="text-sm">Episodios</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-900">Gratis</span>
          <span className="text-sm">Para Siempre</span>
        </div>
      </div>
    </div>
  );
}
