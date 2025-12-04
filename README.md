# Media Search Engine

## Descripción

Media Search Engine es una aplicación web moderna y responsiva diseñada para buscar y explorar películas y series. Utiliza la API de OMDb para obtener información detallada y la API de YouTube para mostrar tráilers. La aplicación está construida con Next.js y ofrece una experiencia de usuario fluida con un diseño atractivo.

## Características Principales

- **Búsqueda Potente**: Busca películas y series por título, año y tipo.
- **Detalles Completos**: Visualiza sinopsis, reparto, director, premios, calificaciones (IMDb, Metascore) y más.
- **Tráilers**: Reproducción de tráilers integrados directamente desde YouTube.
- **Favoritos**: Guarda tus títulos favoritos para acceder a ellos rápidamente (almacenamiento local).
- **Recomendaciones**: Descubre títulos similares basados en el género.
- **Diseño Responsivo**: Interfaz optimizada para dispositivos móviles y de escritorio.
- **Modo Debug**: Panel de depuración para desarrolladores (Jury Mode) para inspeccionar llamadas a API y latencia.

## Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **APIs**:
  - [OMDb API](https://www.omdbapi.com/) (Datos de películas)
  - [YouTube Data API](https://developers.google.com/youtube/v3) (Tráilers)

## Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd media-search-engine
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade tus claves de API:

    ```env
    OMDB_API_KEY=tu_clave_omdb
    YOUTUBE_API_KEY=tu_clave_youtube
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
media-search-engine/
├── app/                    # Rutas y páginas de Next.js (App Router)
│   ├── api/                # API Routes (si las hay)
│   ├── movie/[id]/         # Página de detalle de película
│   ├── search/             # Página de resultados de búsqueda
│   ├── favorites/          # Página de favoritos
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── components/             # Componentes React
│   ├── atoms/              # Componentes básicos (Botones, Inputs)
│   ├── molecules/          # Componentes compuestos (Tarjetas, Buscador)
│   └── organisms/          # Secciones complejas (Navbar)
├── lib/                    # Utilidades y funciones de API
│   └── api/                # Clientes para OMDb y YouTube
├── public/                 # Archivos estáticos
└── types/                  # Definiciones de tipos TypeScript
```

## Buenas Prácticas Implementadas

- **Arquitectura Modular**: Separación clara de componentes (Atomic Design) y lógica.
- **Tipado Estático**: Uso extensivo de TypeScript para mayor robustez.
- **Optimización**: Uso de `next/image` para imágenes y `next/font` para tipografía.
- **UX/UI**: Feedback visual, estados de carga y manejo de errores.

## Licencia

Este proyecto está bajo la Licencia MIT.
