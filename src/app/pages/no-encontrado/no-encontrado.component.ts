import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Pagina 404: se muestra para cualquier ruta que no coincida con las
 * definidas en app.routes.ts (ruta wildcard '**').
 */
@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css'
})
export class NoEncontradoComponent {}
