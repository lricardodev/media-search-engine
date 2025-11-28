# Arquitectura del Proyecto: Buscador de Películas y Series

## 1. Estructura de Directorios

Esta estructura sigue las mejores prácticas para Next.js App Router, priorizando la separación de responsabilidades y la escalabilidad.

```
/
├── app/                        # Rutas de la aplicación (App Router)
│   ├── (routes)/               # Grupo de rutas para organización (opcional, pero recomendado)
│   │   ├── page.tsx            # Home: Buscador y Tendencias
│   │   ├── search/             # Ruta de Resultados
│   │   │   └── page.tsx
│   │   ├── movie/              # Ruta de Detalle
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── favorites/          # Ruta de Favoritos
│   │       └── page.tsx
│   ├── api/                    # Route Handlers (si necesitamos proxy para ocultar API Key)
│   ├── layout.tsx              # Layout principal (Navbar, Footer)
│   ├── globals.css             # Estilos globales y directivas de Tailwind
│   └── error.tsx               # Manejo de errores global
├── components/                 # Componentes de UI
│   ├── atoms/                  # Componentes indivisibles (Botones, Inputs, Badges)
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Badge/
│   ├── molecules/              # Grupos de átomos (SearchBar, MovieCard)
│   │   ├── SearchBar/
│   │   ├── MovieCard/
│   │   └── Pagination/
│   ├── organisms/              # Secciones complejas (Hero, MovieGrid, Navbar)
│   │   ├── Navbar/
│   │   ├── MovieGrid/
│   │   └── MovieDetail/
│   └── templates/              # Layouts de página (opcional, si hay layouts muy reusables)
├── lib/                        # Lógica de negocio y utilidades
│   ├── api/                    # Integración con APIs
│   │   ├── omdb.ts             # Cliente y funciones para OMDb
│   │   └── types.ts            # Tipos de respuesta de la API
│   ├── utils/                  # Helpers genéricos (formateo de fechas, clases)
│   └── constants.ts            # Constantes globales (API Key, URLs)
├── hooks/                      # Custom Hooks
│   ├── useFavorites.ts         # Lógica de persistencia de favoritos
│   └── useDebounce.ts          # Para el buscador en tiempo real
├── types/                      # Definiciones de tipos TypeScript globales
│   └── index.ts
└── styles/                     # Estilos compartidos o módulos específicos (si no están colocalizados)
    └── mixins.module.css       # Mixins o variables CSS si fuera necesario
```

## 2. Estrategia de Estilos

Utilizaremos un enfoque híbrido para aprovechar la velocidad de Tailwind y la potencia de CSS Modules.

- **Tailwind CSS:** Se usará para el 90% de los estilos.

  - Layouts (Flexbox, Grid).
  - Espaciado (margin, padding).
  - Tipografía básica y colores.
  - Responsive design.
  - _Ejemplo:_ `<div className="flex flex-col gap-4 p-4">`

- **CSS Modules:** Se usará para casos específicos donde Tailwind se vuelve verboso o limitado.
  - Animaciones complejas (`@keyframes`).
  - Estilos muy específicos de un componente que requieren pseudo-elementos complejos (`::before`, `::after`).
  - Cuando se necesite encapsular estilos "legacy" o muy personalizados.
  - _Uso:_ Archivos `Componente.module.css` importados como `styles`.
  - _Ejemplo:_ `<div className={`${styles.movieCard} relative ...`}>`

## 3. Integración API (OMDb)

Se creará una capa de servicio en `lib/api/omdb.ts` para desacoplar la lógica de fetching de los componentes.

**Características:**

- **Tipado Fuerte:** Interfaces para Requests y Responses.
- **Manejo de Errores:** Try/catch con errores personalizados.
- **Caching:** Uso de `fetch` de Next.js con `revalidate` o `force-cache` para tendencias (si la API lo permite) o búsquedas frecuentes.

```typescript
// lib/api/omdb.ts (Ejemplo conceptual)

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<SearchResponse> {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}&page=${page}&type=movie`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Cache por 1 hora para búsquedas idénticas
  });

  if (!res.ok) throw new Error("Error fetching movies");

  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error);

  return data;
}

export async function getMovieDetail(id: string): Promise<MovieDetail> {
  // Similar implementation with cache
}
```

## 4. Componentes Clave

### Atoms (Componentes Base)

- `Button`: Variantes (primary, secondary, ghost).
- `Input`: Campo de texto estilizado para búsqueda.
- `Spinner`: Indicador de carga.
- `Badge`: Para mostrar año, tipo (Movie/Series), rating.
- `Icon`: Wrapper para iconos (usando lucide-react o heroicons).

### Molecules (Componentes Funcionales)

- `SearchBar`: Input + Botón de búsqueda + Lógica de debounce.
- `MovieCard`: Imagen (Poster), Título, Año y botón de Favorito.
- `Pagination`: Botones de Anterior/Siguiente y números de página.
- `EmptyState`: Mensaje cuando no hay resultados o favoritos.
- `Rating`: Visualización de estrellas o puntuación numérica.

### Organisms (Secciones Completas)

- `Navbar`: Logo, Links de navegación (Home, Favoritos), Buscador (opcional en header).
- `MovieGrid`: Grid responsive que renderiza una lista de `MovieCard`s.
- `MovieDetailHeader`: Hero section con backdrop y poster de la película.
- `FavoritesList`: Lista de películas guardadas con lógica de eliminación.
