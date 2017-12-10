import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk';

@Injectable()
export class CorreoService {

	constructor() {
	}

	/**
	 * Envia un correo.
	 */
	// public enviaCorreo(
	// 	correoDatos: {
	// 		texto: string,
	// 		remitente: string,
	// 		destinatario: string,
	// 		asunto: string,
	// 		conCopia: string,
	// 		html: string,
	// 		archivosAdjuntos: any
	// 		// EJEMPLO:
	// 		// archivosAdjuntos: [
	// 		//  { "content": cadena64, "encoding": 'base64', "filename": "file.pdf", "contentType": "application/pdf" }
	// 		// ]
	// 	}
	// ): void {
	// 	let nombreMetodo = "enviaCorreo";
	// 	console.log(`[${nombreMetodo}] Intentando enviar correo`);
	// 	let correoOpciones = {
	// 		"text": correoDatos.texto,
	// 		"from": correoDatos.remitente,
	// 		"to": correoDatos.destinatario,
	// 		"cc": correoDatos.conCopia,
	// 		"subject": correoDatos.asunto,
	// 		"html": correoDatos.html,
	// 		"attachments": correoDatos.archivosAdjuntos
	// 	}
	// 	let parametrosFuncionLambda: AWS.Lambda.Types.InvocationRequest = {
	// 		FunctionName: environment.LAMBDA.ENVIAR_CORREO,
	// 		Payload: JSON.stringify(correoOpciones)
	// 	};
	// 	console.log(`[${nombreMetodo}] Invocando funcion Lambda: ${environment.LAMBDA.ENVIAR_CORREO}`);
	// 	let lambda = new AWS.Lambda();
	// 	window['toastr'].options.positionClass = "toast-bottom-right";
	// 	lambda.invoke(parametrosFuncionLambda).promise().then((respuesta) => {
	// 		console.log(`[${nombreMetodo}] Funcion Lambda: ${environment.LAMBDA.ENVIAR_CORREO} ejecutada correctamente.`);
	// 		let payload = JSON.parse(respuesta.Payload.toString());
	// 		if(payload['estatus']=='OK'){
	// 			console.log(`[${nombreMetodo}] ${payload['titulo']}: ${payload['mensaje']}`);
	// 			window['toastr'].success(payload['mensaje'], payload['titulo']);
	// 		} else {
	// 			console.log(`[${nombreMetodo}] ${payload['titulo']}: ${payload['mensaje']}`);
	// 			console.log(`[${nombreMetodo}] Causa: ${payload['mensajeError']}`);
	// 			window['toastr'].error(payload['mensaje'], payload['titulo']);
	// 		}
	// 	}).catch((error)=>{
	// 		console.log(`[${nombreMetodo}] Error al ejecutar la Funcion Lambda: ${environment.LAMBDA.ENVIAR_CORREO}: ${error}`);
	// 		console.log('Error: ', error);
	// 	});

	// }

}

