import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calificacion'
})
export class CalificacionPipe implements PipeTransform {
    public transform(valor: number, tipo: string): string {

        if (tipo == 'clase') {
            switch (valor) {
                case (1): {
                    return 'badge badge-danger';
                }
                case (2): {
                    return 'badge badge-danger';
                }
                case (3): {
                    return 'badge badge-warning';
                }
                case (4): {
                    return 'badge badge-primary';
                }
                case (5): {
                    return 'badge badge-primary';
                }
                default: {
                    return 'badge';
                }
            }
        } else {
            switch (valor) {
                case (1): {
                    return 'Mala';
                }
                case (2): {
                    return 'Regular';
                }
                case (3): {
                    return 'Buena';
                }
                case (4): {
                    return 'Excelente';
                }
                case (5): {
                    return 'Obra Maestra';
                }
                default: {
                    return 'Sin Calificar';
                }
            }
        }
    }

}
