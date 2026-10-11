/**
 * Representa un alojamiento disponible en el marketplace.
 * Mapea 1:1 con cada objeto del arreglo "alojamientos" de
 * src/assets/data/marketplace-data.json.
 */
export interface Alojamiento {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  ubicacion: string;
  tipo: TipoAlojamiento;
  capacidad: number;
  habitaciones: number;
  camas: number;
  banos: number;
  precioNoche: number;
  tarifaLimpieza: number;
  calificacion: number;
  activo: boolean;
  imagenPrincipal: string;
  imagenes: string[];
  servicios: string[];
  reglas: string[];
}

/**
 * Tipos de alojamiento soportados. El JSON suministrado solo trae
 * "Apartamento", "Cabaña" y "Casa", pero se deja abierto a string
 * para no romper si se agregan nuevos tipos en el JSON sin tocar el modelo.
 */
export type TipoAlojamiento = 'Apartamento' | 'Cabaña' | 'Casa' | string;
