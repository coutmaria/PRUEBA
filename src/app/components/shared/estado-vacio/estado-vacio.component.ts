import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Mensaje reutilizable para estados sin informacion:
 * - busqueda sin resultados (seccion 3.2 / regla de negocio 10)
 * - "Mis reservas" sin reservas (seccion 3.6)
 */
@Component({
  selector: 'app-estado-vacio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-vacio.component.html',
  styleUrl: './estado-vacio.component.css'
})
export class EstadoVacioComponent {
  @Input() icono = '🔍';
  @Input({ required: true }) titulo!: string;
  @Input() descripcion = '';
}
