import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formatea un numero como pesos colombianos: 180000 -> "$180.000".
 * Se implementa a mano (sin CurrencyPipe + locale es-CO) para no tener
 * que registrar datos de locale adicionales solo para este formato.
 */
@Pipe({
  name: 'formatoPesos',
  standalone: true
})
export class FormatoPesosPipe implements PipeTransform {
  transform(valor: number | null | undefined): string {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return '$0';
    }
    const entero = Math.round(valor);
    const conSeparadores = entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${conSeparadores}`;
  }
}
