import { Alojamiento } from '../models';

/**
 * Reglas de negocio del proyecto (seccion 4 del enunciado), implementadas
 * como funciones puras y reutilizables para no repetir `if`s sueltos en
 * cada componente. Cada funcion devuelve la lista de mensajes de error
 * (vacia si todo es valido), pensada para mostrarse tal cual en el
 * formulario de cotizacion/reserva.
 */

/** Fecha de hoy sin horas, para comparar solo por dia (America/Bogota). */
export function hoySinHora(): Date {
  const ahora = new Date();
  return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
}

function parsearFechaLocal(fechaIso: string): Date | null {
  if (!fechaIso) return null;
  const [anio, mes, dia] = fechaIso.split('-').map(Number);
  if (!anio || !mes || !dia) return null;
  return new Date(anio, mes - 1, dia);
}

/**
 * Regla: "La fecha de llegada no puede ser anterior a la fecha actual."
 * Regla: "La fecha de salida debe ser posterior a la fecha de llegada."
 */
export function validarFechas(fechaLlegadaIso: string, fechaSalidaIso: string): string[] {
  const errores: string[] = [];
  const llegada = parsearFechaLocal(fechaLlegadaIso);
  const salida = parsearFechaLocal(fechaSalidaIso);

  if (!llegada || !salida) {
    errores.push('Selecciona la fecha de llegada y la fecha de salida.');
    return errores;
  }

  if (llegada < hoySinHora()) {
    errores.push('La fecha de llegada no puede ser anterior a hoy.');
  }

  if (salida <= llegada) {
    errores.push('La fecha de salida debe ser posterior a la fecha de llegada.');
  }

  return errores;
}

/**
 * Regla: "El numero de huespedes debe ser mayor que cero."
 * Regla: "El numero de huespedes no puede superar la capacidad del alojamiento."
 */
export function validarHuespedes(numHuespedes: number, capacidad: number): string[] {
  const errores: string[] = [];

  if (!numHuespedes || numHuespedes <= 0) {
    errores.push('El numero de huespedes debe ser mayor que cero.');
  } else if (numHuespedes > capacidad) {
    errores.push(`Este alojamiento admite maximo ${capacidad} huesped(es).`);
  }

  return errores;
}

/**
 * Regla: "El precio por noche debe ser mayor que cero."
 * Esta regla protege contra datos corruptos del JSON, no contra un
 * input del usuario (el precio nunca lo escribe el usuario).
 */
export function validarPrecioAlojamiento(alojamiento: Alojamiento): string[] {
  const errores: string[] = [];
  if (!alojamiento.precioNoche || alojamiento.precioNoche <= 0) {
    errores.push('Este alojamiento no tiene un precio por noche valido.');
  }
  return errores;
}

/**
 * Valida en conjunto fechas + huespedes + precio del alojamiento.
 * Regla: "Una cotizacion solo podra generarse cuando las fechas
 * ingresadas sean validas."
 */
export function validarParaCotizar(
  alojamiento: Alojamiento,
  fechaLlegadaIso: string,
  fechaSalidaIso: string,
  numHuespedes: number
): string[] {
  return [
    ...validarFechas(fechaLlegadaIso, fechaSalidaIso),
    ...validarHuespedes(numHuespedes, alojamiento.capacidad),
    ...validarPrecioAlojamiento(alojamiento)
  ];
}

/**
 * Nombre de huesped requerido para la reserva (seccion 3.5).
 */
export function validarNombreHuesped(nombre: string): string[] {
  const errores: string[] = [];
  if (!nombre || nombre.trim().length < 3) {
    errores.push('Ingresa tu nombre completo (minimo 3 caracteres).');
  }
  return errores;
}

/**
 * Correo electronico requerido para la reserva (seccion 3.5).
 * Validacion basica de formato, suficiente para un formulario simulado.
 */
export function validarCorreoHuesped(correo: string): string[] {
  const errores: string[] = [];
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || !patron.test(correo)) {
    errores.push('Ingresa un correo electronico valido.');
  }
  return errores;
}
