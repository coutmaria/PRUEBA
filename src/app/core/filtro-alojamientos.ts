import { Alojamiento } from '../models/alojamiento.model';
import { FiltrosAlojamiento } from '../models/filtros.model';

/**
 * Aplica los filtros de busqueda (seccion 3.2) sobre una lista de
 * alojamientos ya activos. Funcion pura para poder recalcularla en cada
 * cambio de filtro sin depender de un servicio con estado.
 */
export function filtrarAlojamientos(
  alojamientos: Alojamiento[],
  filtros: FiltrosAlojamiento
): Alojamiento[] {
  return alojamientos.filter((alojamiento) => {
    if (filtros.ciudad && alojamiento.ciudad !== filtros.ciudad) {
      return false;
    }

    if (filtros.tipo && alojamiento.tipo !== filtros.tipo) {
      return false;
    }

    if (filtros.numHuespedes && alojamiento.capacidad < filtros.numHuespedes) {
      return false;
    }

    if (filtros.precioMaximo && alojamiento.precioNoche > filtros.precioMaximo) {
      return false;
    }

    return true;
  });
}
