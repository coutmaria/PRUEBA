import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Alojamiento, Cotizacion, Reserva } from '../../../models';
import { ReservasService } from '../../../services/reservas.service';
import { FormatoPesosPipe } from '../../../pipes/formato-pesos.pipe';

/**
 * Formulario de simulacion de reserva (seccion 3.5).
 *
 * Regla de negocio: "Una reserva solamente podra realizarse despues de
 * generar una cotizacion valida." Este componente exige `cotizacion`
 * como @Input requerido: DetalleComponent solo lo renderiza cuando ya
 * existe una Cotizacion valida, y ReservasService vuelve a exigirla en
 * su firma, asi que la regla queda protegida en dos capas.
 */
@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatoPesosPipe],
  templateUrl: './formulario-reserva.component.html',
  styleUrl: './formulario-reserva.component.css'
})
export class FormularioReservaComponent {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Input({ required: true }) cotizacion!: Cotizacion;
  @Output() reservaCreada = new EventEmitter<Reserva>();

  formulario!: FormGroup;

  errores: string[] = [];
  intentoReservar = false;

  constructor(private fb: FormBuilder, private reservasService: ReservasService) {
    this.formulario = this.fb.group({
      nombreHuesped: [''],
      correoHuesped: ['']
    });
  }

  reservar(): void {
    this.intentoReservar = true;
    const { nombreHuesped, correoHuesped } = this.formulario.value;

    const resultado = this.reservasService.crearReserva(
      this.alojamiento,
      this.cotizacion,
      nombreHuesped ?? '',
      correoHuesped ?? ''
    );

    this.errores = resultado.errores;

    if (resultado.reserva) {
      this.reservaCreada.emit(resultado.reserva);
    }
  }
}
