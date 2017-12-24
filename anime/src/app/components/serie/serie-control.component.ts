import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../components/comunes/base/base.component';
import * as moment from 'moment';
import { Serie } from '../../model/serie';

@Component({
    selector: 'app-serie-control',
    templateUrl: './serie-control.component.html',
    styles: []
})
export class SerieControlComponent extends BaseComponent implements OnInit {

    public tabla;
    public nombreArchivo;

    constructor(
        private injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.inicializarTabla();
        this.nombreArchivo = 'Series_' + moment().format('YYYY-MM-DD_hh-mm');
    }

    ngAfterViewInit() {
        window['inicializarIBox']();
        window['inicializarTablaDatos']();
    }

    /**
     * Inicializa la tabla.
     */
    private inicializarTabla() {
        let nombreMetodo = 'inicializarTabla';
        console.log(`[${nombreMetodo}] Cargando tabla...`);
        this.loader.abrir();
        this.rest.obtenerSeries().then((resultado) => {
            this.tabla = (<any>$('#tabla')).dataTable({
                data: resultado,
                columnDefs: [
                    { width: "50px", sClass: 'text-center', targets: [0] }
                ],
                order: [[0, "asc"]],
                columns: [
                    { data: 'ano', title: 'Año' },
                    { data: 'titulos', title: 'Título', render: (titulos)=>{
                        let tituloCompleto = '';
                        titulos.forEach((titulo) => {
                            tituloCompleto += '<span class="flag-icon flag-icon-' + titulo.pais.codigo + '"></span>&nbsp;' + titulo.titulo + '<br>';
                        });
                        return tituloCompleto;
                    } },
                ],
                select: {
                    style: 'single'
                },
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                "lengthMenu": [[25, 50, 100], [25, 50, 100]],
                buttons: [
                    { text: 'Copiar', extend: 'copy', className: 'btn-sm' },
                    { text: 'Excel', extend: 'excelHtml5', title: this.nombreArchivo, className: 'btn-sm' },
                    { text: 'PDF', extend: 'pdfHtml5', title: this.nombreArchivo, className: 'btn-sm' },
                    { text: 'Imprimir', extend: 'print', className: 'btn-sm' }
                ],
                headerCallback: (thead, data, start, end, display) => {
                    if (!$(thead).find('input').length) {
                        $(thead).find('th').each((index, element) => {
                            $('<input type="text" class="form-control input-sm" />').click((event) => {
                                event.stopImmediatePropagation();
                                event.preventDefault();
                            }).keyup((event) => {
                                this.filtrarColumna(index, <any>event);
                            }).appendTo(element);
                        });
                    }
                }
            }).DataTable();
            $('#tabla th').addClass('text-center');
            this.tabla.on('select', (e, dt, type, indexes) => {
                if (type === 'row') {
                    let row = dt.row(indexes);
                    let data = row.data();
                    this.editar(data.id);
                }
            });
            console.log(`[${nombreMetodo}] Tabla cargada con exito.`);
            this.loader.cerrar();
        });

    }

    /**
     * Abre la pantalla para crear un registro nuevo.
     */
    public nuevo(): void {
        let nombreMetodo = 'nuevo';
        console.log(`[${nombreMetodo}] Navegando a nuevo...`);
        this.router.navigateByUrl("/app/series/nueva");
    }

    /**
     * Abre la pantalla para editar el registro seleccionado.
     */
    public editar(strId: string): void {
        let nombreMetodo = 'editar';
        console.log(`[${nombreMetodo}] Navegando a editar...`);
        this.router.navigate(['/app/series/editar', strId]);
    }

    /**
     * Filtra la columna de la tabla.
     */
    public filtrarColumna(index: number, event: Event) {
        this.tabla.column(index).search((<HTMLInputElement>event.target).value).draw();
    }

}