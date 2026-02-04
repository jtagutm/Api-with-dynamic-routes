#  My Api of Dragon Ball

Aplicación web que muestra información detallada de personajes de Dragon Ball. Los usuarios pueden explorar un catálogo de personajes y ver sus estadísticas, transformaciones y descripciones.

### API
- **Dragon Ball API** (`https://web.dragonball-api.com/`)
  - Obtiene información de 48 personajes
  - Incluye datos como nombre, raza, género, ki, transformaciones e imágenes

### Next.js, App Router
- **Server Components**: Fetch de datos directo en el servidor
- **Rutas Dinámicas**: `/personajes/[id]` para mostrar el detalle de cada personaje
- **Layouts**: Navbar y footer compartidos en todas las páginas
- **Image Component**: Optimización automática de imágenes

### Tailwind CSS
- **Se agrego diseño responsivo**: 
  - Móvil (1 columna)
  - Tablet `sm:` (2 columnas)
  - Desktop `lg:` (4 columnas)
- Grid system para organizar las tarjetas de personajes

### TypeScript
- Tipado de datos de la API
- Interfaces para props de componentes

## Características

### Rutas Dinámicas
- **Menú con 14 personajes** en el navbar que enlaza a cada detalle
- Ruta dinámica `/personajes/[id]` que carga información específica según el ID
- Navegación entre personajes (anterior/siguiente)

### Elementos Dinámicos
- **48 personajes** renderizados dinámicamente desde la API
- Cada tarjeta muestra: imagen, nombre, raza, género y afiliación
- Grid responsive que se adapta al tamaño de pantalla


## La estructura del Proyecto
```
app/
├── page.tsx                    # Página principal
├── layout.tsx                  # Layout
└── personajes/
    ├── page.tsx                # Lista de personajes
    ├── layout.tsx              # Navbar con de 14 personajes
    └── [id]/
        └── page.tsx            # Detalle de cada personaje
```