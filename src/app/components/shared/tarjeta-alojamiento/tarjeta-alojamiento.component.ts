import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Alojamiento } from '../../../models';
import { FormatoPesosPipe } from '../../../pipes/formato-pesos.pipe';

/**
 * Tarjeta de alojamiento reutilizable (listado, destacados en home).
 * Muestra los 8 campos minimos exigidos por la seccion 3.1:
 * imagen, nombre, ciudad, tipo, capacidad, precio/noche, calificacion
 * y servicios disponibles.
 */
@Component({
  selector: 'app-tarjeta-alojamiento',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatoPesosPipe],
  templateUrl: './tarjeta-alojamiento.component.html',
  styleUrl: './tarjeta-alojamiento.component.css'
})
export class TarjetaAlojamientoComponent {
  @Input({ required: true }) alojamiento!: Alojamiento;

  /** Cuantos servicios mostrar como chip antes de resumir "+N mas". */
  readonly maxServiciosVisibles = 3;

  get serviciosVisibles(): string[] {
    return this.alojamiento.servicios.slice(0, this.maxServiciosVisibles);
  }

  get serviciosRestantes(): number {
    return Math.max(0, this.alojamiento.servicios.length - this.maxServiciosVisibles);
  }
}
