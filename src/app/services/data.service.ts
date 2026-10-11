import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Alojamiento, Resena } from '../models';

/**
 * Forma exacta del archivo marketplace-data.json.
 */
interface MarketplaceData {
  alojamientos: Alojamiento[];
  resenas: Resena[];
}

/**
 * Unico punto de acceso a los datos del marketplace.
 *
 * Requisito explicito del enunciado (seccion 5): "La interfaz grafica no
 * debera importar directamente el archivo JSON. La consulta debera
 * realizarse a traves de un servicio Angular." Por eso ningun componente
 * hace `import data from '...json'`; todos pasan por este servicio, que
 * lo trae con HttpClient desde /assets/data/marketplace-data.json.
 *
 * El archivo se carga una sola vez (shareReplay) y se cachea en memoria,
 * ya que los datos no cambian durante la ejecucion de la aplicacion.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly dataUrl = 'assets/data/marketplace-data.json';
  private data$: Observable<MarketplaceData> | null = null;

  constructor(private http: HttpClient) {}

  private cargarDatos(): Observable<MarketplaceData> {
    if (!this.data$) {
      this.data$ = this.http
        .get<MarketplaceData>(this.dataUrl)
        .pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.data$;
  }

  /**
   * Todos los alojamientos activos (regla de negocio: "No deben mostrarse
   * alojamientos marcados como inactivos"). Este filtro se aplica aqui,
   * de forma centralizada, para que ningun componente pueda "olvidarlo".
   */
  obtenerAlojamientos(): Observable<Alojamiento[]> {
    return this.cargarDatos().pipe(
      map((data) => data.alojamientos.filter((a) => a.activo))
    );
  }

  /**
   * Un alojamiento activo por id, o undefined si no existe o esta inactivo.
   */
  obtenerAlojamientoPorId(id: number): Observable<Alojamiento | undefined> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => lista.find((a) => a.id === id))
    );
  }

  /**
   * Alojamientos destacados para la pagina inicial: los de mejor
   * calificacion, hasta un maximo de `cantidad`. Criterio documentado aqui
   * porque el enunciado no especifica cual debe usarse.
   */
  obtenerDestacados(cantidad = 3): Observable<Alojamiento[]> {
    return this.obtenerAlojamientos().pipe(
      map((lista) =>
        [...lista].sort((a, b) => b.calificacion - a.calificacion).slice(0, cantidad)
      )
    );
  }

  /**
   * Reseñas de un alojamiento especifico (join manual por alojamientoId,
   * ya que el JSON las entrega en un arreglo separado).
   */
  obtenerResenasPorAlojamiento(alojamientoId: number): Observable<Resena[]> {
    return this.cargarDatos().pipe(
      map((data) => data.resenas.filter((r) => r.alojamientoId === alojamientoId))
    );
  }

  /**
   * Lista de ciudades unicas presentes en los alojamientos activos,
   * usada para poblar el filtro de ciudad sin hardcodearlo en la UI.
   */
  obtenerCiudadesDisponibles(): Observable<string[]> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => Array.from(new Set(lista.map((a) => a.ciudad))).sort())
    );
  }

  /**
   * Lista de tipos de alojamiento unicos presentes en los activos,
   * usada para poblar el filtro de tipo sin hardcodearlo en la UI.
   */
  obtenerTiposDisponibles(): Observable<string[]> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => Array.from(new Set(lista.map((a) => a.tipo))).sort())
    );
  }
}
