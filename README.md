# Montaña Stays — Marketplace de Alojamientos

Proyecto de curso: **Desarrollo de Sistemas de Información 3**, Ingeniería de
Sistemas, Universidad El Bosque.

## Descripción

Aplicación web (solo frontend) para un marketplace de alojamientos
temporales, desarrollada en Angular. Permite a un huésped explorar
alojamientos disponibles, filtrarlos, consultar su información detallada,
obtener una cotización por fechas y número de huéspedes, simular una
reserva, y consultar las reservas realizadas durante la ejecución de la
aplicación.

No existe backend real: toda la información de alojamientos y reseñas
proviene de un archivo JSON estático (`src/assets/data/marketplace-data.json`)
consultado a través de un servicio Angular (`DataService`), y las reservas
simuladas se guardan en el `localStorage` del navegador mediante
`ReservasService`.

## Integrantes

- María Camila Ardila Hernández

## Tecnologías utilizadas

- [Angular](https://angular.dev/) 18 (standalone components, sin NgModules)
- TypeScript
- Angular Router (navegación entre vistas)
- Angular Reactive Forms (filtros, cotizador, formulario de reserva)
- RxJS (`Observable`, `BehaviorSubject`, `combineLatest`) para datos y
  filtrado reactivo
- `HttpClient` para consumir el JSON de datos
- CSS plano con variables (sin frameworks de UI)
- `localStorage` para persistir reservas durante la ejecución

## Requisitos para ejecutar la aplicación

- [Node.js](https://nodejs.org/) 18.19+, 20.11+ o 22.x (probado con Node 22)
- npm 10+
- Angular CLI (se puede usar vía `npx`, no requiere instalación global)

## Instrucciones de instalación

1. Clonar este repositorio y entrar a la carpeta del proyecto:

   ```bash
   git clone <url-del-repositorio>
   cd marketplace-alojamientos
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

## Instrucciones de ejecución

### Modo desarrollo

```bash
npx ng serve
```

Luego abrir [http://localhost:4200](http://localhost:4200) en el navegador.
La aplicación se recarga automáticamente al guardar cambios.

### Build de producción

```bash
npx ng build
```

El resultado queda en `dist/marketplace-alojamientos/browser`. Al servirlo
con cualquier servidor estático, configurarlo con *fallback* a `index.html`
para que las rutas de Angular (`/alojamientos`, `/alojamiento/:id`,
`/mis-reservas`) funcionen al refrescar o acceder directo por URL.

## Principales funcionalidades

- **Página inicial**: nombre de la plataforma, descripción breve,
  alojamientos destacados (los mejor calificados) y acceso directo a la
  búsqueda.
- **Listado de alojamientos**: tarjetas con imagen, nombre, ciudad, tipo,
  capacidad, precio por noche, calificación y servicios disponibles.
- **Búsqueda y filtrado**: por ciudad, número de huéspedes, tipo de
  alojamiento y precio máximo. Los filtros actualizan el listado de forma
  reactiva (sin botón "Buscar") y pueden limpiarse con un clic. Si no hay
  resultados, se informa al usuario con un mensaje explícito.
- **Detalle del alojamiento**: galería de imágenes, descripción, ubicación,
  tipo, capacidad, habitaciones, camas, baños, precio por noche, servicios,
  reglas, calificación y reseñas. Se navega a esta vista mediante el
  sistema de rutas de Angular (`/alojamiento/:id`).
- **Cotización**: selección de fecha de llegada, fecha de salida y número de
  huéspedes; cálculo de noches, subtotal, tarifa de limpieza, tarifa de
  servicio (10 % del subtotal) y total, con validación de las reglas de
  negocio antes de generar la cotización.
- **Simulación de reserva**: solo disponible después de una cotización
  válida; solicita nombre y correo del huésped, y crea una reserva con
  estado inicial `CONFIRMADA`, guardada en `localStorage`.
- **Mis reservas**: lista de todas las reservas realizadas en la sesión,
  con alojamiento, ciudad, fechas, huéspedes, valor total y estado. Si no
  hay reservas, se muestra un mensaje apropiado.

### Reglas de negocio implementadas

- La fecha de salida debe ser posterior a la fecha de llegada.
- La fecha de llegada no puede ser anterior a la fecha actual.
- El número de huéspedes debe ser mayor que cero y no puede superar la
  capacidad del alojamiento.
- El precio por noche debe ser mayor que cero.
- Una cotización solo se genera si las fechas ingresadas son válidas.
- Una reserva solo puede realizarse después de generar una cotización
  válida.
- La tarifa de servicio corresponde al 10 % del subtotal.
- No se muestran alojamientos marcados como inactivos (`activo: false`).
- Cuando una búsqueda no encuentra resultados, se informa al usuario.

## Estructura general del proyecto

```
src/app/
├── core/                        # Funciones puras: reglas de negocio y filtrado
│   ├── reglas-negocio.ts
│   └── filtro-alojamientos.ts
├── models/                      # Interfaces TypeScript (sin lógica)
│   ├── alojamiento.model.ts
│   ├── resena.model.ts
│   ├── reserva.model.ts
│   ├── filtros.model.ts
│   └── cotizacion.model.ts
├── services/                    # Acceso a datos y estado de la aplicación
│   ├── data.service.ts          # Unico punto de acceso al JSON (via HttpClient)
│   ├── cotizacion.service.ts    # Calculo de cotizaciones
│   └── reservas.service.ts      # Creacion y persistencia de reservas (localStorage)
├── pipes/
│   └── formato-pesos.pipe.ts    # Formato de moneda (COP)
├── components/
│   ├── layout/                  # Header y footer, presentes en toda la app
│   │   ├── header/
│   │   └── footer/
│   └── shared/                  # Componentes de presentacion reutilizables
│       ├── tarjeta-alojamiento/
│       └── estado-vacio/
├── pages/                       # Una carpeta por vista/ruta
│   ├── home/
│   ├── listado/
│   │   └── filtros-alojamientos/
│   ├── detalle/
│   │   ├── galeria-imagenes/
│   │   ├── cotizador/
│   │   └── formulario-reserva/
│   ├── mis-reservas/
│   └── no-encontrado/
├── app.routes.ts                # Definicion de rutas (navegacion)
├── app.config.ts                # Providers: router, HttpClient
└── app.component.ts             # Layout raiz (header + router-outlet + footer)

src/assets/
├── data/marketplace-data.json   # Datos de alojamientos y reseñas
└── images/                      # Imagenes de los alojamientos
```

### Separación de responsabilidades

- **Presentación**: `components/` y `pages/` (solo construyen la interfaz).
- **Navegación**: `app.routes.ts` + `RouterLink`/`RouterOutlet` en los
  componentes.
- **Acceso a datos**: `DataService` (único lugar que importa/consulta el
  JSON).
- **Formularios**: `FiltrosAlojamientosComponent`, `CotizadorComponent`,
  `FormularioReservaComponent` (Reactive Forms).
- **Manejo de reservas**: `ReservasService` (crear, listar, persistir).
- **Modelos**: `models/` (interfaces TypeScript puras, sin lógica).
- **Reglas de negocio**: `core/reglas-negocio.ts` y
  `core/filtro-alojamientos.ts` (funciones puras, reutilizadas por los
  servicios y componentes).
