/**
 * Criterios de busqueda y filtrado del listado de alojamientos (seccion 3.2).
 * Todos los campos son opcionales: un filtro "vacio" (undefined/null/'')
 * significa "no aplicar esta restriccion".
 */
export interface FiltrosAlojamiento {
  ciudad: string | null;
  numHuespedes: number | null;
  tipo: string | null;
  precioMaximo: number | null;
}

export const FILTROS_VACIOS: FiltrosAlojamiento = {
  ciudad: null,
  numHuespedes: null,
  tipo: null,
  precioMaximo: null
};
