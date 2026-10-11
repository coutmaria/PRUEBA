import { Routes } from '@angular/router';

/**
 * Estructura de navegacion de la aplicacion:
 *   /                    -> Home (plataforma, destacados, acceso a busqueda)
 *   /alojamientos        -> Listado + filtros
 *   /alojamiento/:id     -> Detalle (incluye cotizador y formulario de reserva)
 *   /mis-reservas        -> Consulta de reservas realizadas
 *   /**                  -> Pagina no encontrada
 *
 * Cada ruta carga su componente de forma perezosa (loadComponent) para
 * mantener los bundles livianos; esto tambien evidencia el uso del
 * sistema de rutas de Angular pedido explicitamente en la seccion 3.3.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Montaña Stays — Inicio'
  },
  {
    path: 'alojamientos',
    loadComponent: () =>
      import('./pages/listado/listado.component').then((m) => m.ListadoComponent),
    title: 'Montaña Stays — Alojamientos'
  },
  {
    path: 'alojamiento/:id',
    loadComponent: () =>
      import('./pages/detalle/detalle.component').then((m) => m.DetalleComponent),
    title: 'Montaña Stays — Detalle'
  },
  {
    path: 'mis-reservas',
    loadComponent: () =>
      import('./pages/mis-reservas/mis-reservas.component').then(
        (m) => m.MisReservasComponent
      ),
    title: 'Montaña Stays — Mis reservas'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/no-encontrado/no-encontrado.component').then(
        (m) => m.NoEncontradoComponent
      ),
    title: 'Montaña Stays — Pagina no encontrada'
  }
];
