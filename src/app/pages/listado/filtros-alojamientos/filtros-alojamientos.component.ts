import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FiltrosAlojamiento, FILTROS_VACIOS } from '../../../models';

/**
 * Formulario de busqueda y filtrado (seccion 3.2).
 * Filtros minimos: ciudad, numero de huespedes, tipo de alojamiento,
 * precio maximo. Cada cambio en el formulario emite los filtros
 * actualizados de inmediato (sin boton "Buscar"), para que el listado
 * se actualice de forma dinamica como exige el enunciado. Tambien
 * ofrece un boton explicito para limpiar los filtros.
 */
@Component({
  selector: 'app-filtros-alojamientos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filtros-alojamientos.component.html',
  styleUrl: './filtros-alojamientos.component.css'
})
export class FiltrosAlojamientosComponent implements OnInit {
  @Input() ciudades: string[] = [];
  @Input() tipos: string[] = [];
  @Output() filtrosCambiaron = new EventEmitter<FiltrosAlojamiento>();

  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      ciudad: [FILTROS_VACIOS.ciudad],
      numHuespedes: [FILTROS_VACIOS.numHuespedes],
      tipo: [FILTROS_VACIOS.tipo],
      precioMaximo: [FILTROS_VACIOS.precioMaximo]
    });
  }

  ngOnInit(): void {
    this.formulario.valueChanges.subscribe((valores) => {
      this.filtrosCambiaron.emit({
        ciudad: valores.ciudad || null,
        numHuespedes: valores.numHuespedes || null,
        tipo: valores.tipo || null,
        precioMaximo: valores.precioMaximo || null
      });
    });
  }

  limpiarFiltros(): void {
    this.formulario.reset(FILTROS_VACIOS);
  }

  get hayFiltrosActivos(): boolean {
    const v = this.formulario.value;
    return !!(v.ciudad || v.numHuespedes || v.tipo || v.precioMaximo);
  }
}
