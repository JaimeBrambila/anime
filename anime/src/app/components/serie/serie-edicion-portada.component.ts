import { Component, OnInit, AfterViewInit, Injector, ChangeDetectorRef, Input } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';
import { Lista } from '../../clases/comunes';
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { Serie } from '../../model/serie';
import { Saga } from '../../model/saga';
import { Episodio } from '../../model/episodio';
import { Fansub } from '../../model/fansub';
import { Pais } from '../../model/pais';


@Component({
	selector: 'app-serie-edicion-portada',
	templateUrl: './serie-edicion-portada.component.html',
	styles: []
})
export class SerieEdicionPortadaComponent extends BaseComponent implements OnInit {

	@Input() registroId: string;

	public serie: Serie;

	constructor(
		private injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() {
		this.loader.abrir();
		let promesas: Promise<any>[] = [];
		this.rest.obtenerItemPorIdSimple(this.environment.REST.TABLAS.SERIE, this.registroId).then((respuesta) => {
			this.serie = new Serie(respuesta);
			this.test();
			this.loader.cerrar();
		});
	}

	test() {
		// setTimeout(() => {
		// 	var $previews = $('.preview');
		// 	(<any>$('#image')).cropper({
		// 		ready: function (e) {
		// 			let $clone:any = $(this).clone().removeClass('cropper-hidden');
		// 			$clone.css({
		// 				display: 'block',
		// 				width: '100%',
		// 				minWidth: 0,
		// 				minHeight: 0,
		// 				maxWidth: 'none',
		// 				maxHeight: 'none'
		// 			});
		// 			$previews.css({
		// 				width: '100%',
		// 				overflow: 'hidden'
		// 			}).html($clone);
		// 		},
		// 		crop: (e) => {
		// 			var imageData = (<any>$(this)).cropper('getImageData');
		// 			var previewAspectRatio = e.width / e.height;
		// 			$previews.each(function () {
		// 				var $preview = $(this);
		// 				var previewWidth = $preview.width();
		// 				var previewHeight = previewWidth / previewAspectRatio;
		// 				var imageScaledRatio = e.width / previewWidth;
		// 				$preview.height(previewHeight).find('img').css({
		// 					width: imageData.naturalWidth / imageScaledRatio,
		// 					height: imageData.naturalHeight / imageScaledRatio,
		// 					marginLeft: -e.x / imageScaledRatio,
		// 					marginTop: -e.y / imageScaledRatio
		// 				});
		// 			});
		// 		}
		// 	});
		// }, 500);
	}

	inicializarCropper() {
		setTimeout(() => {
			(<any>$('#imagenOriginal')).cropper({
				responsive: true,
				minContainerWidth: 900,
				minContainerHeight: 500,
				viewMode: 1,
				aspectRatio: 900 / 350,
				autoCropArea: 1,
				preview: '.vista-previa-portada',
				crop: function (e) {
					// console.log(e.x);
					// console.log(e.y);
					// console.log(e.width);
					// console.log(e.height);
					// console.log(e.rotate);
					// console.log(e.scaleX);
					// console.log(e.scaleY);
				}
			});
		}, 500);
	}

}
