import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Alojamiento, Cotizacion, Resena, Reserva } from '../../models';
import { DataService } from '../../services/data.service';
import { FormatoPesosPipe } from '../../pipes/formato-pesos.pipe';
import { GaleriaImagenesComponent } from './galeria-imagenes/galeria-imagenes.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { FormularioReservaComponent } from './formulario-reserva/formulario-reserva.component';

/**
 * Vista de detalle de un alojamiento (seccion 3.3), con cotizador
 * (3.4) y formulario de reserva (3.5) integrados. La navegacion hacia
 * aqui se hace siempre mediante el Angular Router (ruta /alojamiento/:id),
 * nunca con un modal sin ruta propia.
 */
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormatoPesosPipe,
    GaleriaImagenesComponent,
    CotizadorComponent,
    FormularioReservaComponent
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  alojamiento$!: Observable<Alojamiento | undefined>;
  resenas$!: Observable<Resena[]>;

  cotizacionActual: Cotizacion | null = null;
  reservaConfirmada: Reserva | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.alojamiento$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.dataService.obtenerAlojamientoPorId(id);
      })
    );

    this.resenas$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.dataService.obtenerResenasPorAlojamiento(id);
      })
    );
  }

  onCotizacionGenerada(cotizacion: Cotizacion | null): void {
    this.cotizacionActual = cotizacion;
    this.reservaConfirmada = null;
  }

  onReservaCreada(reserva: Reserva): void {
    this.reservaConfirmada = reserva;
    this.cotizacionActual = null;
  }
}
