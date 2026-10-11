/**
 * Resultado de cotizar una estadia (seccion 3.4).
 * Formulas (regla de negocio, seccion 4):
 *   numNoches      = fechaSalida - fechaLlegada (en dias)
 *   subtotal       = numNoches * precioNoche
 *   tarifaServicio = subtotal * 0.10
 *   total          = subtotal + tarifaLimpieza + tarifaServicio
 */
export interface Cotizacion {
  alojamientoId: number;
  fechaLlegada: string; // ISO yyyy-MM-dd
  fechaSalida: string; // ISO yyyy-MM-dd
  numHuespedes: number;
  numNoches: number;
  precioNoche: number;
  subtotal: number;
  tarifaLimpieza: number;
  tarifaServicio: number;
  total: number;
}
