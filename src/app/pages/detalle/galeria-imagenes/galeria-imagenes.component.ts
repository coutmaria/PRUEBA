import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

/**
 * Galeria simple de imagenes del alojamiento: una imagen principal grande
 * y miniaturas clicables para cambiarla (seccion 3.3: "Imagenes").
 */
@Component({
  selector: 'app-galeria-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-imagenes.component.html',
  styleUrl: './galeria-imagenes.component.css'
})
export class GaleriaImagenesComponent implements OnChanges {
  @Input({ required: true }) imagenes: string[] = [];
  @Input() nombreAlojamiento = '';

  imagenActiva = '';

  ngOnChanges(): void {
    this.imagenActiva = this.imagenes[0] ?? '';
  }

  seleccionar(imagen: string): void {
    this.imagenActiva = imagen;
  }
}
