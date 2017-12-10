import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class Loader {

	public static TEMA_BARRAS = 'sk-rect';
	public static TEMA_TRES_PUNTOS = 'sk-bounce';
	public static TEMA_ROMBO = 'sk-folding-cube';
	public static TEMA_CIRCULO = 'sk-circle';
	public static TEMA_DOS_PUNTOS = 'sk-dot';
	public static TEMA_CUBO = 'sk-cube-grid';

	private promesas: Promise<any>[] = [];

	public abrirConPromesa(promesa: Promise<any> | Promise<any>[], tema?: string, colorFondo?: string, texto?: string, contenido?: string) {
		this.abrir(tema, colorFondo, texto, contenido);
		if (promesa instanceof Promise) {
			this.promesas.push(promesa);
		} else {
			for (let elemento of promesa) {
				this.promesas.push(elemento);
			}
		}
		Promise.all(this.promesas).then(() => {
			this.cerrar();
		});
	}

	public abrir(tema?: string, colorFondo?: string, texto?: string, contenido?: string) {
		window['HoldOn'].open({
			theme: tema ? tema : Loader.TEMA_CIRCULO,
			message: texto ? texto : 'Cargando',
			backgroundColor: colorFondo ? '#' + colorFondo : null,
			content: contenido ? contenido : null
		});
	}

	public cerrar() {
		window['HoldOn'].close();
	}

}

@Injectable()
export class Swal {

	private static ACEPTAR_TITULO = 'Éxito';
	private static ACEPTAR_MENSAJE = 'Registro eliminado';
	private static CLASE_ALERTA = 'btn btn-lg btn-warning';
	private static CLASE_EXITO = 'btn btn-lg btn-success';
	private static CLASE_INFORMACION = 'btn btn-lg btn-info';
	private static CLASE_PELIGRO = 'btn btn-lg btn-danger';
	private static CLASE_PRIMARY = 'btn btn-lg btn-primary';
	private static TEXTO_BOTON_ACEPTAR = 'Aceptar';
	private static TEXTO_BOTON_CANCELAR = 'Cancelar';
	private static TIPO_ALERTA = 'warning';
	private static TIPO_ERROR = 'error';
	private static TIPO_EXITO = 'success';
	private static TIPO_INFORMACION = 'info';
	private static TIPO_PREGUNTA = 'question';

	public alerta(titulo: string, mensaje: string) {
		swal(titulo, mensaje, 'warning');
	}
	public informacion(titulo: string, mensaje: string) {
		swal(titulo, mensaje, 'info');
	}
	public pregunta(titulo: string, mensaje: string) {
		swal(titulo, mensaje, 'question');
	}
	public exito(titulo: string, mensaje: string) {
		swal(titulo, mensaje, 'success');
	}
	public error(titulo: string, mensaje: string) {
		swal(titulo, mensaje, 'error');
	}

	public guardarExito() {
		let titulo = 'Éxito'
		let mensaje = 'La información se guardo correctamente.'
		this.exito(titulo, mensaje);
	}
	public guardarError() {
		let titulo = 'Error'
		let mensaje = 'Ocurrío un error al guardar la información.'
		this.error(titulo, mensaje);
	}

	//PARA FUTURAS NECESIDADES
	private crearAlerta(titulo: string, mensaje: string, textoBotonAceptar?: string,
		mostrarBotonCancelar?: boolean, textoBotonCancelar?: string,
		claseBotonAceptar?: string, claseBotonCancelar?: string,
		tituloAceptar?: string, mensajeAceptar?: string, funcionAceptar?: Function) {
		swal({
			title: titulo,
			text: mensaje,
			type: 'warning',
			showCancelButton: mostrarBotonCancelar ? mostrarBotonCancelar : true,
			confirmButtonText: textoBotonAceptar ? textoBotonAceptar : Swal.TEXTO_BOTON_ACEPTAR,
			cancelButtonText: textoBotonCancelar ? textoBotonCancelar : Swal.TEXTO_BOTON_CANCELAR,
			confirmButtonClass: claseBotonAceptar ? claseBotonAceptar : Swal.CLASE_PRIMARY,
			cancelButtonClass: claseBotonCancelar ? claseBotonCancelar : Swal.CLASE_PELIGRO,
			buttonsStyling: false
		}).then(() => {
			funcionAceptar();
			swal(
				tituloAceptar ? tituloAceptar : Swal.ACEPTAR_TITULO,
				mensajeAceptar ? mensajeAceptar : Swal.ACEPTAR_MENSAJE,
				'success'
			);
		}, (dismiss) => {

		});
	}

}
