/**
 * Estado de una reserva. El enunciado solo exige el estado inicial
 * "CONFIRMADA", pero se modela como union type (no un string suelto)
 * pensando en una futura cancelacion desde "Mis reservas".
 */
export type EstadoReserva = 'CONFIRMADA' | 'CANCELADA';

/**
 * Informacion minima e inmutable del alojamiento que se congela dentro
 * de la reserva en el momento de reservar. Se guarda una copia en vez de
 * solo el id para que "Mis reservas" pueda mostrar nombre/ciudad/imagen
 * aunque el alojamiento cambie o se desactive mas adelante.
 */
export interface AlojamientoReservado {
  id: number;
  nombre: string;
  ciudad: string;
  imagenPrincipal: string;
}

/**
 * Reserva simulada, persistida en localStorage por ReservasService.
 * No se envia a ningun backend (requisito explicito del enunciado).
 */
export interface Reserva {
  id: string;
  alojamiento: AlojamientoReservado;
  fechaLlegada: string; // ISO yyyy-MM-dd
  fechaSalida: string; // ISO yyyy-MM-dd
  numHuespedes: number;
  numNoches: number;
  valorTotal: number;
  nombreHuesped: string;
  correoHuesped: string;
  estado: EstadoReserva;
  creadaEn: string; // ISO timestamp, util para ordenar "Mis reservas"
}
