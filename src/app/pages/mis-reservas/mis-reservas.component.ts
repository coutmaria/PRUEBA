import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Reserva } from '../../models';
import { ReservasService } from '../../services/reservas.service';
import { FormatoPesosPipe } from '../../pipes/formato-pesos.pipe';
import { EstadoVacioComponent } from '../../components/shared/estado-vacio/estado-vacio.component';

/**
 * Consulta de reservas realizadas durante la ejecucion de la aplicacion
 * (seccion 3.6). Muestra, por cada reserva: alojamiento, ciudad, fecha
 * de llegada, fecha de salida, numero de huespedes, valor total y
 * estado. Si no hay reservas, se informa con un mensaje apropiado en
 * vez de dejar la pagina en blanco.
 */
@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatoPesosPipe, EstadoVacioComponent],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent implements OnInit {
  reservas$!: Observable<Reserva[]>;

  constructor(private reservasService: ReservasService) {}

  ngOnInit(): void {
    this.reservas$ = this.reservasService.obtenerReservas();
  }
}
