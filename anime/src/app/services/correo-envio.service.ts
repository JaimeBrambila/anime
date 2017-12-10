import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { CorreoService } from "../services/correo.service";
import { Configuracion } from '../model/configuracion';
import * as moment from "moment";

@Injectable()
export class CorreoEnvioService {

	public configuracion: Configuracion;
	private URL_PLANTILLA_CORREO: string = "./assets/html-templates/correo.html";

	constructor(
		private http: Http,
		private correo: CorreoService
	) { }

	/**
	 * Crea el cuerpo del correo de cotización y lo envía.
	 */
	// public enviarCotizacionCorreo(pdf64: any, venta: Venta, envioCorreoOpciones: {
	// 	tipo: string,
	// 	destinatario: string,
	// 	asunto: string,
	// 	titulo: string,
	// 	contenido: string,
	// 	paginaWeb: string,
	// 	conCopia: string,
	// 	incluirArticuloLinks: boolean
	// }): void {
	// 	let nombreMetodo = "enviarCotizacionCorreo";
	// 	console.log(`[${nombreMetodo}] Obteniendo cuerpo del correo.`);
	// 	this.dynamo.obtenerItemUnicoPorEntidad(environment.TABLAS.CONFIGURACION, ConfiguracionAdmin.ENTIDAD).then((data) => {
	// 		console.log(`[${nombreMetodo}] Configuración cargada correctamente.`);
	// 		this.configuracion = new ConfiguracionAdmin(data);
	// 		this.http.get(this.URL_PLANTILLA_CORREO).subscribe((respuesta: any) => {
	// 			let cuerpoCorreo = respuesta._body;

	// 			cuerpoCorreo = cuerpoCorreo.replace("::titulo::", envioCorreoOpciones.titulo);
	// 			cuerpoCorreo = cuerpoCorreo.replace("::contenido::", envioCorreoOpciones.contenido);
	// 			cuerpoCorreo = cuerpoCorreo.replace("::links::", this.crearLinksArticulos(venta, envioCorreoOpciones.incluirArticuloLinks));
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::paginaWebEmpresa::", 'g'), this.configuracion.empresa.paginaWeb);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::folio::", 'g'), venta.folio);

	// 			let nombreArchivo = envioCorreoOpciones.tipo + '_' + venta.folio + ".pdf"
	// 			let asunto = envioCorreoOpciones.asunto;
	// 			asunto = asunto.replace(new RegExp("::folio::", 'g'), venta.folio.toString());
	// 			let correoDatos = {
	// 				texto: '',
	// 				remitente: this.configuracion.correoAwsSes,
	// 				destinatario: envioCorreoOpciones.destinatario,
	// 				asunto: asunto,
	// 				conCopia: envioCorreoOpciones.conCopia,
	// 				html: cuerpoCorreo,
	// 				archivosAdjuntos: [
	// 					{ "content": pdf64, "encoding": 'base64', "filename": nombreArchivo, "contentType": "application/pdf" }
	// 				]
	// 			};
	// 			this.correo.enviaCorreo(correoDatos);
	// 		});
	// 	});
	// }

	/**
	 * Crea el cuerpo del correo de activacion y lo envía.
	 */
	// public enviarActivacionCorreo(pdf64: any, tarjetaSIM: Sim, envioCorreoOpciones: {
	// 	destinatario: string,
	// 	asunto: string,
	// 	titulo: string,
	// 	contenido: string,
	// 	paginaWeb: string,
	// 	conCopia: string
	// }): void {
	// 	let nombreMetodo = "enviarCotizacionCorreo";
	// 	console.log(`[${nombreMetodo}] Obteniendo cuerpo del correo.`);
	// 	this.dynamo.obtenerItemUnicoPorEntidad(environment.TABLAS.CONFIGURACION, ConfiguracionAdmin.ENTIDAD).then((data) => {
	// 		console.log(`[${nombreMetodo}] Configuración cargada correctamente.`);
	// 		this.configuracion = new ConfiguracionAdmin(data);
	// 		this.http.get(this.URL_PLANTILLA_CORREO).subscribe((respuesta: any) => {
	// 			let cuerpoCorreo = respuesta._body;

	// 			cuerpoCorreo = cuerpoCorreo.replace("::titulo::", envioCorreoOpciones.titulo);
	// 			cuerpoCorreo = cuerpoCorreo.replace("::contenido::", envioCorreoOpciones.contenido);
	// 			cuerpoCorreo = cuerpoCorreo.replace("::paginaWebEmpresa::", this.configuracion.empresa.paginaWeb);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::icc::", 'g'), tarjetaSIM.icc);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::telefono::", 'g'), tarjetaSIM.telefono.toString());
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::pinUno::", 'g'), tarjetaSIM.pinUno);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::pinDos::", 'g'), tarjetaSIM.pinDos);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::pukUno::", 'g'), tarjetaSIM.pukUno);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::pukDos::", 'g'), tarjetaSIM.pukDos);
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::fechaActivacion::", 'g'), moment(tarjetaSIM.fechaActivacion).format('DD/MMMM/YYYY'));
	// 			cuerpoCorreo = cuerpoCorreo.replace(new RegExp("::fechaCaducidad::", 'g'), moment(tarjetaSIM.fechaCaducidad).format('DD/MMMM/YYYY'));

	// 			let asunto = envioCorreoOpciones.asunto;
	// 			asunto = asunto.replace(new RegExp("::icc::", 'g'), tarjetaSIM.icc);
	// 			asunto = asunto.replace(new RegExp("::telefono::", 'g'), tarjetaSIM.telefono.toString());
	// 			let correoDatos = {
	// 				texto: '',
	// 				remitente: this.configuracion.correoAwsSes,
	// 				destinatario: envioCorreoOpciones.destinatario,
	// 				asunto: asunto,
	// 				conCopia: envioCorreoOpciones.conCopia,
	// 				html: cuerpoCorreo,
	// 				archivosAdjuntos: [
	// 					{ "content": pdf64, "encoding": 'base64', "filename": "Activacion_" + tarjetaSIM.icc + ".pdf", "contentType": "application/pdf" }
	// 				]
	// 			};
	// 			this.correo.enviaCorreo(correoDatos);
	// 		});
	// 	});
	// }

	/**
	 * Regresa la estructura HTML con los links de los articulos.
	 */
	// public crearLinksArticulos(venta: Venta, incluirArticuloLinks: boolean){
	// 	if(incluirArticuloLinks){
	// 		let contadorDocumentos = 0;
	// 		let links = '<br><br>A continuación se anexan las ligas a los documentos con los detalles de los productos:<br><br>';
	// 		venta.detalles.forEach((detalle)=>{
	// 			if(detalle.links.length>0){
	// 				links += `<strong>${detalle.articulo.descripcion}</strong><br>`;
	// 				detalle.links.forEach((link)=>{
	// 					links += `<a href="${link.url}">${link.titulo}</a><br>`;
	// 					contadorDocumentos++;
	// 				});
	// 				links += `<br>`;
	// 			}
	// 		});
	// 		if(contadorDocumentos>0){
	// 			return links;
	// 		}
	// 		return "";
	// 	} else {
	// 		return "";
	// 	}
	// }

}

