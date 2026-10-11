import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Alojamiento, FiltrosAlojamiento, FILTROS_VACIOS } from '../../models';
import { DataService } from '../../services/data.service';
import { filtrarAlojamientos } from '../../core/filtro-alojamientos';
import { TarjetaAlojamientoComponent } from '../../components/shared/tarjeta-alojamiento/tarjeta-alojamiento.component';
import { EstadoVacioComponent } from '../../components/shared/estado-vacio/estado-vacio.component';
import { FiltrosAlojamientosComponent } from './filtros-alojamientos/filtros-alojamientos.component';

/**
 * Listado de alojamientos con busqueda y filtrado (secciones 3.1 y 3.2).
 * Los filtros se combinan de forma reactiva con la lista de alojamientos
 * activos: cualquier cambio en el formulario de filtros recalcula de
 * inmediato que tarjetas se muestran, sin boton "Buscar".
 *
 * Regla de negocio: "Cuando una busqueda no encuentre resultados debera
 * informarse al usuario" -> se maneja mostrando app-estado-vacio cuando
 * la lista filtrada queda en 0 elementos.
 */
@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaAlojamientoComponent,
    EstadoVacioComponent,
    FiltrosAlojamientosComponent
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  alojamientos$!: Observable<Alojamiento[]>;
  ciudades$!: Observable<string[]>;
  tipos$!: Observable<string[]>;
  alojamientosFiltrados$!: Observable<Alojamiento[]>;

  private filtrosSubject = new BehaviorSubject<FiltrosAlojamiento>(FILTROS_VACIOS);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.alojamientos$ = this.dataService.obtenerAlojamientos();
    this.ciudades$ = this.dataService.obtenerCiudadesDisponibles();
    this.tipos$ = this.dataService.obtenerTiposDisponibles();

    this.alojamientosFiltrados$ = combineLatest([this.alojamientos$, this.filtrosSubject]).pipe(
      map(([alojamientos, filtros]) => filtrarAlojamientos(alojamientos, filtros))
    );
  }

  onFiltrosCambiaron(filtros: FiltrosAlojamiento): void {
    this.filtrosSubject.next(filtros);
  }
}
