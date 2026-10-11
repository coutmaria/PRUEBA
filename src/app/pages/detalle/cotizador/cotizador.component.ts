import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Alojamiento, Cotizacion } from '../../../models';
import { CotizacionService } from '../../../services/cotizacion.service';
import { FormatoPesosPipe } from '../../../pipes/formato-pesos.pipe';

/**
 * Cotizador de estadia (seccion 3.4). El huesped elige fecha de llegada,
 * fecha de salida y numero de huespedes, y al presionar "Cotizar" se
 * calculan noches, subtotal, tarifa de limpieza, tarifa de servicio y
 * total usando CotizacionService.
 *
 * Regla de negocio: "Una cotizacion solo podra generarse cuando las
 * fechas ingresadas sean validas." Si hay errores de validacion se
 * muestran junto al formulario y NO se emite ninguna cotizacion.
 */
@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatoPesosPipe],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.css'
})
export class CotizadorComponent implements OnChanges {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Output() cotizacionGenerada = new EventEmitter<Cotizacion | null>();

  formulario!: FormGroup;

  cotizacion: Cotizacion | null = null;
  errores: string[] = [];
  intentoCotizar = false;
  readonly fechaMinima = this.hoyComoInputDate();

  constructor(private fb: FormBuilder, private cotizacionService: CotizacionService) {
    this.formulario = this.fb.group({
      fechaLlegada: [''],
      fechaSalida: [''],
      numHuespedes: [1]
    });
  }

  ngOnChanges(): void {
    // Si cambia el alojamiento (navegacion entre detalles), se limpia
    // cualquier cotizacion previa para no mezclar datos de otra propiedad.
    this.cotizacion = null;
    this.errores = [];
    this.intentoCotizar = false;
    this.cotizacionGenerada.emit(null);
  }

  cotizar(): void {
    this.intentoCotizar = true;
    const { fechaLlegada, fechaSalida, numHuespedes } = this.formulario.value;

    const resultado = this.cotizacionService.cotizar(
      this.alojamiento,
      fechaLlegada ?? '',
      fechaSalida ?? '',
      Number(numHuespedes) || 0
    );

    this.cotizacion = resultado.cotizacion;
    this.errores = resultado.errores;
    this.cotizacionGenerada.emit(resultado.cotizacion);
  }

  private hoyComoInputDate(): string {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${hoy.getFullYear()}-${mes}-${dia}`;
  }
}
