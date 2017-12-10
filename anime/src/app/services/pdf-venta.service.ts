import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Http } from '@angular/http';
import * as AWS from 'aws-sdk';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from "moment";
import { Configuracion } from "../model/configuracion";

@Injectable()
export class PDFVentaService {

    private decimal = new DecimalPipe('es-MX');
    private URL_LOGO64: string = "./assets/img/logo2.txt";

    public constructor(
        private _http: Http
    ) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    /**
     * Descarga el PDF de la cotizacion.
     */
    // public descargarPDF(configuracion: ConfiguracionAdmin, usuario: Usuario, venta: Venta, opciones: {
    //     tipo: string,
    //     incluirArticuloDetalle: boolean,
    //     incluirArticuloNumeroSerie: boolean,
    //     incluirCondicionesEspeciales: boolean,
    //     incluirTotalesEnMonedaNacional: boolean,
    //     utilizarTipoCambioActual: boolean,
    //     incluirFirma: boolean,
    //     incluirFirmaLinea: boolean,
    //     utilizarMiFirma: boolean
    // }) {
    //     this.obtenerEstructuraPDF(configuracion, usuario, venta, opciones).then((pdfDefinicion) => {
    //         pdfMake.createPdf(pdfDefinicion).download(opciones.tipo + '_' + venta.folio + '.pdf');
    //     });
    // }

    /**
     * Obtiene la cadena base 64 del PDF de la cotizacion.
     */
    // public obtenerPDF64(configuracion: ConfiguracionAdmin, usuario: Usuario, venta: Venta, opciones: {
    //     tipo: string,
    //     incluirArticuloDetalle: boolean,
    //     incluirArticuloNumeroSerie: boolean,
    //     incluirCondicionesEspeciales: boolean,
    //     incluirTotalesEnMonedaNacional: boolean,
    //     utilizarTipoCambioActual: boolean,
    //     incluirFirma: boolean,
    //     incluirFirmaLinea: boolean,
    //     utilizarMiFirma: boolean
    // }) {
    //     return new Promise((resolve, reject) => {
    //         this.obtenerEstructuraPDF(configuracion, usuario, venta, opciones).then((pdfDefinicion) => {
    //             let pdf = pdfMake.createPdf(pdfDefinicion).getBase64((pdfBase64) => {
    //                 resolve(pdfBase64);
    //             });
    //         });
    //     });
    // }

    /**
     * Obtiene la estructura del PDF.
     */
    // public obtenerEstructuraPDF(configuracion: ConfiguracionAdmin, usuario: Usuario, venta: Venta, opciones: {
    //     tipo: string,
    //     incluirArticuloDetalle: boolean,
    //     incluirArticuloNumeroSerie: boolean,
    //     incluirCondicionesEspeciales: boolean,
    //     incluirTotalesEnMonedaNacional: boolean,
    //     utilizarTipoCambioActual: boolean,
    //     incluirFirma: boolean,
    //     incluirFirmaLinea: boolean,
    //     utilizarMiFirma: boolean
    // }) {
    //     return new Promise((resolve, reject) => {

    //         this.obtenerLogo64().then((logo: string) => {

    //             let pdfDefinicion = {
    //                 pageSize: 'LETTER',
    //                 pageOrientation: 'portrait',
    //                 pageMargins: [40, 190, 40, 60],
    //                 header: this.crearEncabezado(configuracion, venta, opciones.tipo, logo),
    //                 footer: this.crearPieDePagina(),
    //                 content: [
    //                     this.crearDetalles(venta, opciones.incluirArticuloDetalle, opciones.incluirArticuloNumeroSerie),
    //                     this.crearTotales(configuracion, venta),
    //                     this.crearTotalesMonedaNacional(configuracion, venta, opciones.incluirTotalesEnMonedaNacional, opciones.utilizarTipoCambioActual),
    //                     this.crearCondicionesEspeciales(venta, opciones.incluirCondicionesEspeciales),
    //                     this.crearFirma(usuario, venta, opciones.incluirFirma, opciones.incluirFirmaLinea, opciones.utilizarMiFirma)
    //                 ]
    //             }
    //             resolve(pdfDefinicion);
    //         });
    //     });
    // }

    /**
     * Regresa la cadena base 64 del logo.
     */
    // public obtenerLogo64() {
    //     return new Promise((resolve, reject) => {
    //         this._http.get(this.URL_LOGO64).subscribe((respuesta: any) => {
    //             resolve(respuesta._body);
    //         });
    //     });
    // }

    /**
     * Regresa el encabezado.
     */
    // public crearEncabezado(configuracion: ConfiguracionAdmin, venta: Venta, tipo: string, logo: string) {
    //     // Datos de la empresa
    //     let datosEmpresa = [];
    //     datosEmpresa.push({ text: configuracion.empresa.razonSocial });
    //     if (configuracion.empresa.domicilio.calle) {
    //         datosEmpresa.push({
    //             text: configuracion.empresa.domicilio.calle +
    //             ' No. ' + configuracion.empresa.domicilio.numeroExterior +
    //             (configuracion.empresa.domicilio.numeroInterior ? ' Int. ' + configuracion.empresa.domicilio.numeroInterior : '')
    //         });
    //         datosEmpresa.push({
    //             text: configuracion.empresa.domicilio.localidad.ciudad +
    //             ', ' + configuracion.empresa.domicilio.localidad.estado +
    //             ', ' + configuracion.empresa.domicilio.localidad.pais
    //         });
    //         datosEmpresa.push({
    //             text: 'C.P. ' + configuracion.empresa.domicilio.codigoPostal +
    //             (configuracion.empresa.domicilio.telefono ? ' Tel: ' + configuracion.empresa.domicilio.telefono : '')
    //         });
    //     }
    //     // Datos del cliente
    //     let datosCliente = [];
    //     datosCliente.push({ text: 'Para:', bold: true });
    //     datosCliente.push({ text: venta.cliente.nombreComercial });
    //     if (venta.cliente.domicilioFiscal.calle) {
    //         datosCliente.push({
    //             text: venta.cliente.domicilioFiscal.calle +
    //             ' No. ' + venta.cliente.domicilioFiscal.numeroExterior +
    //             (venta.cliente.domicilioFiscal.numeroInterior ? ' Int. ' + venta.cliente.domicilioFiscal.numeroInterior : '') +
    //             ' C.P. ' + venta.cliente.domicilioFiscal.codigoPostal
    //         });
    //         datosCliente.push({
    //             text: venta.cliente.domicilioFiscal.localidad.ciudad +
    //             ', ' + venta.cliente.domicilioFiscal.localidad.estado +
    //             ', ' + venta.cliente.domicilioFiscal.localidad.pais
    //         });
    //     }
    //     if (venta.cliente.rfc) {
    //         datosCliente.push({ text: ' RFC: ' + venta.cliente.rfc });
    //     }
    //     datosCliente.push({ text: 'Contacto:', bold: true });
    //     datosCliente.push({ text: venta.cliente.contacto.nombre });
    //     if (venta.cliente.contacto.telefono || venta.cliente.contacto.correo) {
    //         datosCliente.push({ text: (venta.cliente.contacto.telefono ? 'Tel: ' + venta.cliente.contacto.telefono : '') + (venta.cliente.contacto.correo ? ' Correo: ' + venta.cliente.contacto.correo : '') });
    //     }
    //     let encabezado = {
    //         table: {
    //             headerRows: 0,
    //             widths: ['*', '*'],
    //             body: [
    //                 [
    //                     {
    //                         image: logo,
    //                         fit: [100, 100]
    //                     },
    //                     {
    //                         stack: datosEmpresa,
    //                         alignment: 'right',
    //                         fontSize: 10
    //                     }
    //                 ],
    //                 [
    //                     {
    //                         table: {
    //                             headerRows: 1,
    //                             widths: ['*', '*'],
    //                             body: [
    //                                 [
    //                                     { text: tipo, bold: true, alignment: 'center', colSpan: 2 },
    //                                     {}
    //                                 ],
    //                                 [
    //                                     { text: 'Folio', bold: true, alignment: 'center' },
    //                                     { text: 'Fecha', bold: true, alignment: 'center' }
    //                                 ],
    //                                 [
    //                                     { text: venta.folio, alignment: 'center' },
    //                                     { text: moment(new Date(venta.fechaVenta)).locale("es").format('DD/MMM/YYYY'), alignment: 'center' }
    //                                 ]
    //                             ]
    //                         },
    //                         margin: [0, 10, 0, 0],
    //                     },
    //                     {
    //                         stack: datosCliente,
    //                         alignment: 'right',
    //                         fontSize: 8
    //                     }
    //                 ]
    //             ]
    //         },
    //         margin: [40, 40, 40, 0],
    //         layout: 'noBorders'
    //     };
    //     return encabezado;
    // }

    /**
     * Regresa el pie de pagina.
     */
    // public crearPieDePagina() {
    //     return function (currentPage, pageCount) {
    //         return {
    //             columns: [{
    //                 text: moment(new Date()).locale("es").format('DD/MMM/YYYY hh:mm a'),
    //                 fontSize: 10
    //             }, {
    //                 text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
    //                 alignment: 'right',
    //                 fontSize: 10

    //             }],
    //             margin: [40, 10]
    //         }
    //     }
    // }

    /**
     * Regresa los detalles de la venta.
     */
    // public crearDetalles(venta: Venta, incluirArticuloDetalle: boolean, incluirArticuloNumeroSerie: boolean) {
    //     // Encabezados de los Detalles Ancho
    //     let detallesEncabezadosAncho = ['auto', '*', 'auto', 'auto', 'auto'];
    //     if (venta.precioPreferencial) {
    //         detallesEncabezadosAncho = ['auto', '*', 'auto', 'auto', 'auto', 'auto']
    //     }
    //     // Encabezados de los Detalles
    //     let detallesTabla = [];
    //     let detallesEncabezados = [];
    //     detallesEncabezados.push({ text: 'Cantidad', bold: true, alignment: 'center' });
    //     detallesEncabezados.push({ text: 'Artículo', bold: true, alignment: 'center' });
    //     detallesEncabezados.push({ text: 'Precio', bold: true, alignment: 'center' });
    //     if (venta.precioPreferencial) {
    //         detallesEncabezados.push({ text: venta.precioPreferencialTitulo, bold: true, alignment: 'center' });
    //     }
    //     detallesEncabezados.push({ text: 'IVA', bold: true, alignment: 'center' });
    //     detallesEncabezados.push({ text: 'Total', bold: true, alignment: 'center' });
    //     detallesTabla.push(detallesEncabezados);
    //     // Valores de los Detalles
    //     venta.detalles.forEach((detalle) => {
    //         let detalleDescripciones = [];
    //         detalleDescripciones.push([{ text: detalle.articulo.codigo }]);
    //         detalleDescripciones.push([{ text: detalle.articulo.descripcion, fontSize: 8 }]);
    //         if (incluirArticuloNumeroSerie) {
    //             if (detalle.sims) {
    //                 detalle.sims.forEach((tarjeta: Sim) => {
    //                     detalleDescripciones.push([{ text: 'ICC: ' + tarjeta.icc, fontSize: 8 }]);
    //                 });
    //             }
    //             if (detalle.telefonos) {
    //                 detalle.telefonos.forEach((telefono: Telefono) => {
    //                     detalleDescripciones.push([{ text: 'No. de Serie: ' + telefono.numeroSerie, fontSize: 8 }]);
    //                 });
    //             }
    //             if (detalle.planes) {
    //                 detalle.planes.forEach((paquete: Plan) => {
    //                     detalleDescripciones.push([{ text: 'Unidades: ' + paquete.articulo.unidades + '\tMeses de Vigencia: ' + paquete.articulo.mesesVigencia, fontSize: 8 }]);
    //                 });
    //             }
    //         }
    //         if (incluirArticuloDetalle) {
    //             detalleDescripciones.push([{ text: detalle.articuloDetalle, fontSize: 8 }]);
    //         }
    //         let detalleValores = [];
    //         detalleValores.push({ text: detalle.cantidad, alignment: 'right' });
    //         detalleValores.push({
    //             table: {
    //                 headerRows: 0,
    //                 widths: ['*'],
    //                 body: detalleDescripciones
    //             },
    //             layout: 'noBorders'
    //         });
    //         detalleValores.push({ text: '$' + this.decimal.transform(detalle.precio, '1.2'), alignment: 'right' });
    //         if (venta.precioPreferencial) {
    //             detalleValores.push({ text: '$' + this.decimal.transform(detalle.precioPreferencial, '1.2'), alignment: 'right' });
    //         }
    //         detalleValores.push({ text: '$' + this.decimal.transform(detalle.iva, '1.2'), alignment: 'right' });
    //         detalleValores.push({ text: '$' + this.decimal.transform(detalle.total, '1.2'), alignment: 'right' });
    //         detallesTabla.push(detalleValores);
    //     });
    //     let detalles = {
    //         table: {
    //             headerRows: 1,
    //             widths: detallesEncabezadosAncho,
    //             body: detallesTabla
    //         },
    //         fontSize: 10,
    //         margin: [0, 10, 0, 0],
    //         layout: 'lightHorizontalLines'
    //     }
    //     return detalles;
    // }

    /**
     * Regresa los totales de la venta.
     */
    // public crearTotales(configuracion: ConfiguracionAdmin, venta: Venta) {
    //     let totales = {
    //         table: {
    //             headerRows: 0,
    //             widths: ['*', '*', 160],
    //             body: [
    //                 [
    //                     {},
    //                     {},
    //                     {

    //                         table: {
    //                             headerRows: 0,
    //                             widths: ['auto', 'auto', 'auto'],
    //                             body: [
    //                                 [
    //                                     { text: 'Subtotal:', bold: true, alignment: 'right' },
    //                                     { text: '$' + this.decimal.transform(venta.subtotal, '1.2'), alignment: 'right' },
    //                                     { text: configuracion.monedaConfiguracion.principalAbreviatura, alignment: 'right' }
    //                                 ],
    //                                 [
    //                                     { text: 'IVA:', bold: true, alignment: 'right' },
    //                                     { text: '$' + this.decimal.transform(venta.iva, '1.2'), alignment: 'right' },
    //                                     { text: configuracion.monedaConfiguracion.principalAbreviatura, alignment: 'right' }
    //                                 ],
    //                                 [
    //                                     { text: 'Total:', bold: true, alignment: 'right' },
    //                                     { text: '$' + this.decimal.transform(venta.total, '1.2'), alignment: 'right' },
    //                                     { text: configuracion.monedaConfiguracion.principalAbreviatura, alignment: 'right' }
    //                                 ]
    //                             ]
    //                         },
    //                         fontSize: 10,
    //                         layout: 'lightHorizontalLines'
    //                     }
    //                 ]
    //             ]
    //         },
    //         fontSize: 10,
    //         margin: [0, 10, 0, 0],
    //         layout: 'noBorders'
    //     };
    //     return totales;
    // }

    /**
     * Regresa los totales de la venta en moneda nacional.
     */
    // public crearTotalesMonedaNacional(configuracion: ConfiguracionAdmin, venta: Venta, incluirTotalesEnMonedaNacional: boolean, utilizarTipoCambioActual: boolean) {
    //     let totalesMonedaNacional = {};
    //     if (incluirTotalesEnMonedaNacional) {
    //         let tipoCambio = venta.tipoCambio;
    //         if (utilizarTipoCambioActual) {
    //             tipoCambio = configuracion.monedaConfiguracion.tipoCambio;
    //         }
    //         let subtotal = venta.subtotal * tipoCambio;
    //         let iva = venta.iva * tipoCambio;
    //         let total = venta.total * tipoCambio;
    //         totalesMonedaNacional = {
    //             table: {
    //                 headerRows: 0,
    //                 widths: ['*', '*', 160],
    //                 body: [
    //                     [
    //                         {},
    //                         {},
    //                         {

    //                             table: {
    //                                 headerRows: 1,
    //                                 widths: ['auto', 'auto', 'auto'],
    //                                 body: [
    //                                     [
    //                                         { text: 'Moneda Nacional', bold: true, alignment: 'center', colSpan: 3 },
    //                                         {},
    //                                         {}
    //                                     ],
    //                                     [
    //                                         { text: 'Tipo de Cambio:', bold: true, alignment: 'right', colSpan: 2 },
    //                                         {},
    //                                         { text: this.decimal.transform(tipoCambio, '1.2'), alignment: 'right' }
    //                                     ],
    //                                     [
    //                                         { text: 'Subtotal:', bold: true, alignment: 'right' },
    //                                         { text: '$' + this.decimal.transform(subtotal, '1.2'), alignment: 'right' },
    //                                         { text: configuracion.monedaConfiguracion.nacionalAbreviatura, alignment: 'right' }
    //                                     ],
    //                                     [
    //                                         { text: 'IVA:', bold: true, alignment: 'right' },
    //                                         { text: '$' + this.decimal.transform(iva, '1.2'), alignment: 'right' },
    //                                         { text: configuracion.monedaConfiguracion.nacionalAbreviatura, alignment: 'right' }
    //                                     ],
    //                                     [
    //                                         { text: 'Total:', bold: true, alignment: 'right' },
    //                                         { text: '$' + this.decimal.transform(total, '1.2'), alignment: 'right' },
    //                                         { text: configuracion.monedaConfiguracion.nacionalAbreviatura, alignment: 'right' }
    //                                     ]
    //                                 ]
    //                             },
    //                             fontSize: 10,
    //                             layout: 'lightHorizontalLines'
    //                         }
    //                     ]
    //                 ]
    //             },
    //             fontSize: 10,
    //             margin: [0, 10, 0, 0],
    //             layout: 'noBorders'
    //         };
    //     }
    //     return totalesMonedaNacional;
    // }

    /**
     * Regresa las condiciones especiales.
     */
    // public crearCondicionesEspeciales(venta: Venta, incluirCondicionesEspeciales: boolean) {
    //     let condicionesEspeciales = {};
    //     if (incluirCondicionesEspeciales && venta.condicionesEspeciales) {
    //         condicionesEspeciales = {
    //             table: {
    //                 headerRows: 0,
    //                 widths: ['*'],
    //                 body: [[{ text: 'Condiciones Especiales:', bold: true }], [{ text: venta.condicionesEspeciales }]]
    //             },
    //             fontSize: 10,
    //             margin: [0, 10, 0, 0],
    //             layout: 'noBorders'
    //         };
    //     };
    //     return condicionesEspeciales;
    // }

    /**
     * Regresa la firma.
     */
    // public crearFirma(usuario: Usuario, venta: Venta, incluirFirma: boolean, incluirFirmaLinea: boolean, utilizarMiFirma: boolean) {
    //     let firma = [];
    //     if (incluirFirma) {
    //         let usuarioFirma = utilizarMiFirma?usuario:venta.usuarioCreador;
    //         if(usuarioFirma){
    //             let nombre;
    //             let puesto;
    //             let tamano;
    //             if(usuarioFirma.nombre){
    //                 nombre = usuarioFirma.nombre;
    //                 if(usuarioFirma.puesto){
    //                     puesto = usuarioFirma.puesto;
    //                     tamano = nombre.length>puesto.length?nombre.length:puesto.length;
    //                 } else {
    //                     tamano = nombre.length;
    //                 }
    //                 if(incluirFirmaLinea){
    //                     let linea = Array(tamano + 8).join("_");
    //                     firma.push({ text: linea });
    //                 }
    //                 firma.push({ text: nombre });
    //                 if(puesto){
    //                     firma.push({ text: puesto });
    //                 }
    //             }
    //         }
    //     };
    //     let firmaBody = {
    //         stack: firma,
    //         alignment: 'center',
    //         fontSize: 10,
    //         margin: [0, 40, 0, 0]
    //     };
    //     return firmaBody;
    // }

}
