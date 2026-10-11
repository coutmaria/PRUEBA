/**
 * Reseña de un huésped sobre un alojamiento.
 * Se relaciona con Alojamiento mediante alojamientoId (clave foranea logica,
 * ya que no hay backend real: el join se hace en DataService).
 */
export interface Resena {
  id: number;
  alojamientoId: number;
  usuario: string;
  calificacion: number;
  comentario: string;
}
