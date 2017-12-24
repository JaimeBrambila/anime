import { Injectable } from '@angular/core';
import { RestService } from "./rest.service";
import * as UUID from 'uuid/v4';
import { environment } from "../../environments/environment";

@Injectable()
export class InicializacionService {

	private static URL_REST = 'http://localhost:3000/api/';

	public constructor(
		private rest: RestService
	) {
		let nombreMetodo = 'constructor';
		console.log(`[${nombreMetodo}] Construyendo servicio...`);
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarBaseDatos(): Promise<any> {
		let nombreMetodo = 'inicializarBaseDatos';
		console.log(`[${nombreMetodo}] Insertando valores iniciales...`);
		return new Promise<any>((resolve, reject) => {
			let promesas: Promise<any>[] = [];
			promesas.push(this.inicializarCreadores());
			promesas.push(this.inicializarCronologias());
			promesas.push(this.inicializarFansubs());
			promesas.push(this.inicializarGeneros());
			promesas.push(this.inicializarTemas());
			promesas.push(this.inicializarPaises());
			Promise.all(promesas).then(() => {
				console.log(`[${nombreMetodo}] Valores iniciales insertados correctamente.`);
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al insertar los valores iniciales`);
			});
		});
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarPaises(): Promise<any> {
		let nombreMetodo = 'inicializarPaises';
		console.log(`[${nombreMetodo}] Insertando paises iniciales...`);
		let items = [];
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'de', nombre: 'Alemania', idioma: 'Alemán' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'br', nombre: 'Brasil', idioma: 'Portugués' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'cn', nombre: 'China', idioma: 'Chino' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'es', nombre: 'España', idioma: 'Castellano' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'us', nombre: 'Estados Unidos', idioma: 'Inglés' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'fr', nombre: 'Francia', idioma: 'Francés' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'jp', nombre: 'Japón', idioma: 'Japonés' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'kr', nombre: 'Korea del Sur', idioma: 'Coreano' });
		items.push({ id: UUID(), borrado: 0, activo: 1, codigo: 'mx', nombre: 'México', idioma: 'Español' });
		return this.rest.insertarItems(environment.REST.TABLAS.PAIS, items).then(() => {
			console.log(`[${nombreMetodo}] Paises insertados correctamente.`);
		}).catch((error) => {
			console.error(`[${nombreMetodo}] Error al insertar los items en la tabla: `, error);
		});
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarCreadores(): Promise<any> {
		let nombreMetodo = 'inicializarCreadores';
		console.log(`[${nombreMetodo}] Insertando creadores iniciales...`);
		let items = [];
		return this.rest.insertarItems(environment.REST.TABLAS.CREADOR, items).then(() => {
			console.log(`[${nombreMetodo}] Creadores insertados correctamente.`);
		}).catch((error) => {
			console.error(`[${nombreMetodo}] Error al insertar los items en la tabla: `, error);
		});
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarCronologias(): Promise<any> {
		let nombreMetodo = 'inicializarCronologias';
		console.log(`[${nombreMetodo}] Insertando cronologias iniciales...`);
		let items = [];
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Adaptation' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alternate Ending' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alternate Retelling' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alternative Universe' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Compilation' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Prequel' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Related' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Remake' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Remix' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sequel' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Side Story' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Spinoff' });
		return this.rest.insertarItems(environment.REST.TABLAS.CRONOLOGIA, items).then(() => {
			console.log(`[${nombreMetodo}] Cronologias insertados correctamente.`);
		}).catch((error) => {
			console.error(`[${nombreMetodo}] Error al insertar los items en la tabla: `, error);
		});
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarFansubs(): Promise<any> {
		let nombreMetodo = 'inicializarFansubs';
		console.log(`[${nombreMetodo}] Insertando fansubs iniciales...`);
		let items = [];
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: '007 no Fansub', siglas: '007nF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: '3 Freaks no Fansub', siglas: '3FnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'A-Site Fansub', siglas: 'ASite' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AllZine', siglas: 'AllZine' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AniMugen Fansub', siglas: 'AMF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AniXtasis', siglas: 'AX' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime Generation Fansub', siglas: 'AGF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime Kudasai', siglas: 'AniKudasai' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime Rakuen', siglas: 'Rakuen' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime Underground', siglas: 'AU' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime-4ever', siglas: 'a4e' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime-Avatar', siglas: 'Avatar' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime-Element', siglas: 'AniElement' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime-Keys', siglas: 'AniKeys' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Anime-Xtreme', siglas: 'A-X' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AnimeDoser Fansub', siglas: 'ADoser' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AnimeJanai Fansub', siglas: 'AJNF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AnimeTeam', siglas: 'AT' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AnimeXPlosion', siglas: 'AniXplosion' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AnimeXZ no Fansub', siglas: 'AXZnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Animextremist Fansub', siglas: 'AnX' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'AniwebDivx Fansub', siglas: 'AdF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Aoi Kaze Fansub', siglas: 'Aoi Kaze' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Aozora no Tenshi', siglas: 'AoT' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Astaroth no Fansub', siglas: 'AnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Athena no Seinto', siglas: 'AnS' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ayhashi-Fansub', siglas: 'A-F' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Backbeard', siglas: 'BB' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Chapapa Fansub', siglas: 'Chapapa' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ctrl-Z no Fansub', siglas: 'Ctrl-ZnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'DZFansub', siglas: 'DZF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Daemon Subs', siglas: 'Daemon' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dark Club Fansub', siglas: 'DC' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dark-Subs', siglas: 'D-S' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Death Fansub', siglas: 'D-F' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Desconocido', siglas: 'UNK' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dimension Peliculas', siglas: 'Dimension' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dimitrix no Fansub', siglas: 'DnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dissaor', siglas: 'Dissaor' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'ECA-Anime Fansub', siglas: 'ECA' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'El Otro Lado Fansub', siglas: 'EOL-F' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ero~Subs', siglas: 'EroS' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Evangelion-EC', siglas: 'Evangelion-EC' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'FallenSubs', siglas: 'FallenSubs' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Forever CLAMP Fansub México', siglas: 'FCF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Friki no Fansub', siglas: 'FnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'FrontalWeb Fansub', siglas: 'FwF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Frozen Layer Fansub', siglas: 'FLF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fujiwara no Fansub', siglas: 'FWnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gehin no Fansub', siglas: 'GnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Genei-Ryodan', siglas: 'Genei-Ryodan' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gokuraku Fansubs', siglas: 'GF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Haki no Fansub', siglas: 'HnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hikari Anime', siglas: 'Hikari' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Honoo no Fansub', siglas: 'Honoo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Inshuheki', siglas: 'Inshuheki' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Invox Fansub', siglas: 'InvoxF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Japan Universe', siglas: 'JPU' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Jisedai no Fansub', siglas: 'JnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kaede Kawaii Fansub', siglas: 'KKF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kamikaze no Gakkou', siglas: 'KnG' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kamonohashi no Fansub', siglas: 'KnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kantan Seiki Fansub', siglas: 'KSF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kapwham Enterprises', siglas: 'KE' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kawalsky', siglas: 'Kawalsky' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kazuki no Fansub', siglas: 'KznF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Kujaku Corp.', siglas: 'KJK' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Lanove Translations', siglas: 'Lanove' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Lillian-Anime', siglas: 'Lillian' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Madness Subs', siglas: 'Mad' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Maneko Fansub', siglas: 'Maneko' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'MangaLords Fansub', siglas: 'ML' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'MangeKyou no Fansub', siglas: 'ManKnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Meraki no Fansub', siglas: 'MKnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mogumiwani no Fansub', siglas: 'MnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mundo-Anime', siglas: 'M-A' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mune no Fansub', siglas: 'Mune' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Muramasa no Fansub', siglas: 'MuraNF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Nanikano Fansub', siglas: 'NF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Neko no Fansub', siglas: 'NeKo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Nekotachi Fansub', siglas: 'Nekotachi' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Nine Tails Fansub', siglas: 'NTF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Nou no Sonshou', siglas: 'NnS' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Octav@ no Fansub', siglas: '8nF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Otaku Universe', siglas: 'OtakuUniverse' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Otaku no Power', siglas: 'OnP' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Papacha Fansub', siglas: 'PF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Performance Anime no Fansub', siglas: 'Performance' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Realidad no Fansub', siglas: 'Realidad' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'RedLine SP', siglas: 'RLSP' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Rice-Box Fansub', siglas: 'RBF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Rnd-Subs', siglas: 'RND' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ryuuou no Fansub', siglas: 'RonF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sekai no Otaku Fansub', siglas: 'SnOF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shiawase Fansub', siglas: 'Swf' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shinigamis Team', siglas: 'SST' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shitsunen Anime', siglas: 'Shitsunen' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sigma IX', siglas: 'SigmaIX' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'SkullDragon Fansub', siglas: 'SdF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sleepless Beauty', siglas: 'SBnf' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Solidux', siglas: 'Soldiux' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Soma no Fansub', siglas: 'Soma' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Spanishare no Fansub', siglas: 'SpnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Supein Go Fansubs', siglas: 'S-F' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Supremo no Fansub', siglas: 'SnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tai-Rei Fansubs', siglas: 'T-R' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tami Fansub', siglas: 'TAMI' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tatakae no Fansub', siglas: 'TnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tekeremata!', siglas: 'Tekeremata' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tenshi no Fansub', siglas: 'Tenshi' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tenshi no Tsubasa', siglas: 'TnT' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'The Phoenix Fansub', siglas: 'Phoenix' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Thunderbreack', siglas: 'TBK' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tokzu Fansub', siglas: 'TF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tsugaru Anime Fansub', siglas: 'TaF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Twin Dragons no Fansub', siglas: 'TDnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Umineko no Fansub', siglas: 'Umineko' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'UnderWolrd Fansub', siglas: 'UWF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Unlimited no Fansub', siglas: 'UnL' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Wa-Fe no Fansub', siglas: 'Wa-Fe' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Wing Zero Fansub', siglas: 'WZF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Wish no Friki Blog Fansub', siglas: 'WnFB' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Xtasy no Fansub', siglas: 'XnF' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yoru no Kousen', siglas: 'YnK' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Youkai-Anime', siglas: 'Youkai' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yume Anime Team', siglas: 'YaT' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Zona UnderWorld', siglas: 'Z-U' });
		return this.rest.insertarItems(environment.REST.TABLAS.FANSUB, items).then(() => {
			console.log(`[${nombreMetodo}] Fansubs insertados correctamente.`);
		}).catch((error) => {
			console.error(`[${nombreMetodo}] Error al insertar los items en la tabla: `, error);
		});
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarGeneros(): Promise<any> {
		let nombreMetodo = 'inicializarGeneros';
		console.log(`[${nombreMetodo}] Insertando generos iniciales...`);
		let items = [];
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Action', descripcion: 'Acción' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Adventure', descripcion: 'Aventura' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Comedy', descripcion: 'Comedia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Drama', descripcion: 'Drama' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Erotica', descripcion: 'Erótica' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fantasy', descripcion: 'Fantasía' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Horror', descripcion: 'Horror' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magic', descripcion: 'Magia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mystery', descripcion: 'Misterio' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Psychological', descripcion: 'Psicológico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Romance', descripcion: 'Romance' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Science Fiction', descripcion: 'Ciencia Ficción' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Slice of Life', descripcion: 'Golpes de la Vida' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Supernatural', descripcion: 'Sobrenatural' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Thriller', descripcion: 'Novela de Suspenso' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tournament', descripcion: 'Torneo' });
		return this.rest.insertarItems(environment.REST.TABLAS.GENERO, items).then(() => {
			console.log(`[${nombreMetodo}] Generos insertados correctamente.`);
		}).catch((error) => {
			console.error(`[${nombreMetodo}] Error al insertar los items en la tabla: `, error);
		});
	}

	/**
	 * Inserta los valores iniciales.
	 */
	public inicializarTemas(): Promise<any> {
		let nombreMetodo = 'inicializarTemas';
		console.log(`[${nombreMetodo}] Insertando temas iniciales...`);
		let items = [];
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Absurdity', descripcion: 'Absurdo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Abuse', descripcion: 'Abuso' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Acrobatics', descripcion: 'Acrobacia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Adoption', descripcion: 'Adopción' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Aircraft', descripcion: 'Aeronave' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alchemy', descripcion: 'Alquimia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Aliens', descripcion: 'Extraterrestres' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alternate Dimension', descripcion: 'Dimensión Alternativa' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alternate History', descripcion: 'Historia Alternativa' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Alternate Reality', descripcion: 'Realidad Alternativa' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Amnesia', descripcion: 'Amnesia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Androids', descripcion: 'Androides' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Angels', descripcion: 'Ángeles' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Angst', descripcion: 'Angustia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Animals as Advisors', descripcion: 'Animales como Consejeros' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Animation Production', descripcion: 'Producción de Animación' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Animators', descripcion: 'Animadores' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Another World', descripcion: 'Otro Mundo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Apocalypse', descripcion: 'Apocalipsis' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Art', descripcion: 'Arte' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Artificial Intelligence', descripcion: 'Inteligencia Artificial' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Assassins', descripcion: 'Asesinos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Augmented Reality', descripcion: 'Realidad Aumentada' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Auto Racing', descripcion: 'Carreras de Autos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ballet', descripcion: 'Ballet' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Baseball', descripcion: 'Béisbol' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Basketball', descripcion: 'Baloncesto' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Beasts', descripcion: 'Bestias' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Betrayal', descripcion: 'Traición' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Bishoujo', descripcion: 'Joven Hermosa' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Bishounen', descripcion: 'Joven Hermoso' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Blacksmith', descripcion: 'Herrero' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Body Switching', descripcion: 'Cambio de Cuerpo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Bounty Hunters', descripcion: 'Cazarrecompensas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Boxing', descripcion: 'Boxeo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Brothers', descripcion: 'Hermanos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Burning Manly Passion', descripcion: 'Ardiente Pasión Masculina' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Butlers', descripcion: 'Mayordomos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Butterfly Effect', descripcion: 'Efecto Mariposa' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Cafe', descripcion: 'Café' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Calligraphy', descripcion: 'Caligrafía' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Card Games', descripcion: 'Juegos de Cartas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Cat Girls', descripcion: 'Chicas Gato' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Catastrophe', descripcion: 'Catástrofe' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Cats', descripcion: 'Gatos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Chimera', descripcion: 'Quimera' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Comeuppance', descripcion: 'Llevarse su Merecido' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Coming of Age', descripcion: 'Transición a la Madurez' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Computers', descripcion: 'Computadoras' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Connected Lives', descripcion: 'Vidas Conectadas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Conspiracy', descripcion: 'Conspiració' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Corrupt Church', descripcion: 'Iglesia Corrupta' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Corruption', descripcion: 'Corrupción' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Cosplay', descripcion: 'Cosplay' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Country Life', descripcion: 'Vida de Campo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Crime', descripcion: 'Crime' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Crime Fighting', descripcion: 'Lucha Contra el Crimen' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Crime Organizations', descripcion: 'Organizaciones Criminales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Crossdressing', descripcion: 'Travestismo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Curses', descripcion: 'Maldiciones' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Cyberpunk', descripcion: 'Mezcla ciencia avanzada y cambios radicales en el orden social' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Cyborg', descripcion: 'Organismo Cibernético' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dark Comedy', descripcion: 'Comedia Negra' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dark Fantasy', descripcion: 'Fantasía Oscura' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Death', descripcion: 'Muerte' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Deception', descripcion: 'Engaño' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Deforestation', descripcion: 'Deforestación' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Delinquents', descripcion: 'Delincuentes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Delivery Service', descripcion: 'Servicio de Entregas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Delusions', descripcion: 'Ilusiones' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Demons', descripcion: 'Demonios' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Detective', descripcion: 'Detectives' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Developing Powers', descripcion: 'Desarrollo de Poderes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dirty Jokes', descripcion: 'Chistes Sucios' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Disaster', descripcion: 'Desastre' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Diving', descripcion: 'Buceo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dog Girls', descripcion: 'Chicas Perro' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dolls', descripcion: 'Muñecas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dragons', descripcion: 'Dragones' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dreams', descripcion: 'Sueños' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Duels', descripcion: 'Duelos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Dystopia', descripcion: 'Distopia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Earthquake', descripcion: 'Terremoto' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ecchi', descripcion: 'Bajo Contenido Sexual' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Economics', descripcion: 'Ciencias Económicas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Elemental Magic', descripcion: 'Magia Elemental' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Entering Adulthood', descripcion: 'Entrar en la Edad Adulta' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Environment', descripcion: 'Medio Ambiente' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Environmentalism', descripcion: 'Ambientalismo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Esper', descripcion: 'Individuo capaz de usar habilidades paranormales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Evil Being', descripcion: 'Ser Maligno' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Evil Organization', descripcion: 'Organización Malvada' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Exorcists', descripcion: 'Exorcistas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fairy Tales', descripcion: 'Cuentos de Hadas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Family', descripcion: 'Familia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fanservice', descripcion: 'Elementos superfluos a la historia principal diseñados para divertir' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fashion', descripcion: 'Moda' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fears', descripcion: 'Temores' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Female Warriors', descripcion: 'Guerreras' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fighting', descripcion: 'Lucha' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Figure Skating', descripcion: 'Patinaje Artístico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Filmmaking', descripcion: 'Cine' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fine Arts', descripcion: 'Bellas Artes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Flying Train', descripcion: 'Tren Volador' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Folklore', descripcion: 'Folklore' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Forest Spirit', descripcion: 'Espíritu del Bosque' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fox Girls', descripcion: 'Chicas Zorro' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Friendship', descripcion: 'Amistad' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Fugitive', descripcion: 'Fugitivo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Future', descripcion: 'Futuro' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Futuristic', descripcion: 'Futurista' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gambling', descripcion: 'Juego' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Games', descripcion: 'Juegos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gangs', descripcion: 'Pandillas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gender Switch', descripcion: 'Cambio de Genero' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ghosts', descripcion: 'Fantasmas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Giant Insects', descripcion: 'Insectos Gigantes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Giant Weapons', descripcion: 'Armas Gigantes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Giants', descripcion: 'Gigantes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Girl Fight', descripcion: 'Pelea de Chicas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Girls with Guns', descripcion: 'Chicas con Armas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Goddesses', descripcion: 'Diosas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gods', descripcion: 'Dioses' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Golf', descripcion: 'Golf' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gondolas', descripcion: 'Góndolas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gore', descripcion: 'Violencia Gráfica' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gothic', descripcion: 'Gótico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gothic Lolita', descripcion: 'Lolita Gótica' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Growing Up', descripcion: 'Creciendo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gunfights', descripcion: 'Tiroteos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gunslingers', descripcion: 'Pistoleros' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Gymnastics', descripcion: 'Gimnasia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Harem', descripcion: 'Harén' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hell', descripcion: 'Infierno' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hentai', descripcion: 'Contenido Sexual' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'High School', descripcion: 'Escuela Secundaria' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hikikomori', descripcion: 'Inadaptado Social' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Historical', descripcion: 'Histórico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Homeless', descripcion: 'Sin Hogar' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Homunculi', descripcion: 'Figura Humana Distorsionada' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hospital', descripcion: 'Hospital' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Host Club', descripcion: 'Lugar donde asisten mujeres y pagan por la compañia de jovenes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hot Girls', descripcion: 'Chicas Ardientes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Human Experimentation', descripcion: 'Experimentación Humana' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Human Weapon', descripcion: 'Arma Humana' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hybrid', descripcion: 'Híbrido' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Hybrid Robot', descripcion: 'Robot Híbrido' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Idols', descripcion: 'Celebridades' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Immortal', descripcion: 'Inmortales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Immortality', descripcion: 'Inmortalidad' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Imouto', descripcion: 'Hermana pequeña' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Incest', descripcion: 'Incesto' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Inner Demons', descripcion: 'Demonios Internos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Inter-Dimensional', descripcion: 'Interdimensional' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Iyashikei', descripcion: 'Creado con el único propósito de relajar a la audiencia y pasar un buen rato.' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Justice', descripcion: 'Justicia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Leader', descripcion: 'Líder' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Legendary Warriors', descripcion: 'Guerreros Legendarios' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Letters', descripcion: 'Cartas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Life After Death', descripcion: 'Vida Después de la Muerte' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Living Dolls', descripcion: 'Muñecas Vivientes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Lolicon', descripcion: 'Lolitas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Lost City', descripcion: 'Ciudad Perdida' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Love', descripcion: 'Amor' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Love Polygon', descripcion: 'Polígono Amoroso' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Love Triangle', descripcion: 'Triángulo Amoroso' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Love and Loss', descripcion: 'Amar y Perder' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mafia', descripcion: 'Mafia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mages', descripcion: 'Magos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magic Book', descripcion: 'Libro Mágico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magic and Occult', descripcion: 'Magia y Ocultismo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magical Boy', descripcion: 'Chicos Mágicos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magical Creatures', descripcion: 'Criaturas Mágicas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magical Girl', descripcion: 'Chicas Mágicas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Magical Girlfriend', descripcion: 'Novia Mágica' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Maids', descripcion: 'Doncellas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Male Harem', descripcion: 'Harén Masculino' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Manga', descripcion: 'Comics' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mangaka', descripcion: 'Creador de Comics' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Martial Arts', descripcion: 'Artes Marciales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mass Destruction Weapon', descripcion: 'Arma de Destrucción Masiva' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mecha', descripcion: 'Vehículo de gran tamaño por lo general con forma humana' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Medieval', descripcion: 'Medieval' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mercenaries', descripcion: 'Mercenarios' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mermaids', descripcion: 'Sirenas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Middle Ages', descripcion: 'Edad Media' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Military', descripcion: 'Militar' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mind Control', descripcion: 'Control Mental' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mobile Cities', descripcion: 'Ciudades Móviles' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Moe', descripcion: 'Personaje Carismático' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Monsters', descripcion: 'Monstruos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Motorcycles', descripcion: 'Motocicletas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Multiple Personality', descripcion: 'Personalidad Múltiple' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Music', descripcion: 'Música' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mutants', descripcion: 'Mutantes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Mythology', descripcion: 'Mitología' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Nature', descripcion: 'Naturaleza' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Navy', descripcion: 'Marina de Guerra' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Nazis', descripcion: 'Nazis' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Neet', descripcion: 'Personaje que no trabaja ni estudia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Neo-Noir', descripcion: 'Nuevo Cine Negro' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Ninja', descripcion: 'Ninja' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Noir', descripcion: 'Sociedad violenta, cínica y corrupta' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Occult', descripcion: 'Oculto' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Online Computer Gaming', descripcion: 'Video Juegos en Linea' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Orphanage', descripcion: 'Orfanato' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Orphans', descripcion: 'Huérfanos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Otaku', descripcion: 'Fanático' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Other Selves', descripcion: 'Otro Yo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Other World', descripcion: 'Otro Mundo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Parallel Universe', descripcion: 'Universo Paralelo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Parenting', descripcion: 'Convirtiendose en padres' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Parody', descripcion: 'Parodia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Perverted Female Character', descripcion: 'Personaje Femenino Pervertido' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Pirates', descripcion: 'Piratas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Police', descripcion: 'Policía' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Politics', descripcion: 'Política' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Post-Apocalyptic', descripcion: 'Post-Apocalíptica' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Post-War', descripcion: 'Post-Guerra' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Power Suits', descripcion: 'Trajes de Poder' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Priests and Priestesses', descripcion: 'Sacerdotes y Sacerdotisas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Prison', descripcion: 'Prisión' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Psychics', descripcion: 'Psíquicos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Puppets', descripcion: 'Marionetas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Quantum Physics', descripcion: 'Física Cuántica' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Quest', descripcion: 'Búsqueda' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Racing', descripcion: 'Carreras' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Racism', descripcion: 'Racismo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Rape', descripcion: 'Violación' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Real Crime', descripcion: 'Crimen Real' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Real Robot', descripcion: 'Robot Real' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Redemption', descripcion: 'Redención' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Relationships', descripcion: 'Relaciones' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Religion', descripcion: 'Religión' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Renai', descripcion: 'Citas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Revenge', descripcion: 'Venganza' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Revolution', descripcion: 'Revolución' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Robot Girl', descripcion: 'Chicas Robot' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Robots', descripcion: 'Robots' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Royalty', descripcion: 'Realeza' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Samurai', descripcion: 'Samurai' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Satire', descripcion: 'Sátira' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'School', descripcion: 'Escuela' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'School Life', descripcion: 'Vida Escolar' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'School War', descripcion: 'Guerra de Escuelas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Secret Agents', descripcion: 'Agentes secretos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Secret Identity', descripcion: 'Identidad Secreta' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Secrets', descripcion: 'Secretos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Seiyuu', descripcion: 'Actor de Voz' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sentai', descripcion: 'Escuadro' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shapeshifting', descripcion: 'Cambiando de forma' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shinigami', descripcion: 'Dios de la Muerte' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shoujo-ai', descripcion: 'Amor entre Mujeres' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Shounen-ai', descripcion: 'Amor entre Hombres' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Single Parents', descripcion: 'Padres Solteros' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Slapstick', descripcion: 'Payasadas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Soccer', descripcion: 'Fútbol Soccer' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Social-Networking', descripcion: 'Red Social' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Society', descripcion: 'Sociedad' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sorcery', descripcion: 'Brujería' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Soul Travel', descripcion: 'Viaje Espiritual' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Space', descripcion: 'Espacio' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Space Battles', descripcion: 'Batallas Espaciales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Space Colonies', descripcion: 'Colonias Espaciales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Space Navy', descripcion: 'Armada Espacial' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Space Western', descripcion: 'Oeste Espacial' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Special Abilities', descripcion: 'Habilidades Especiales' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Speedboat Racing', descripcion: 'Carreras de Botes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Spies', descripcion: 'Espías' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Spirit World', descripcion: 'Mundo Espiritual' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Spirits', descripcion: 'Espíritus' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Split Personality', descripcion: 'Personalidad Dividida' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sports', descripcion: 'Deportes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Spy Thriller', descripcion: 'Novela de Espías' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Star-crossed Love', descripcion: 'Amantes Desventurados' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Stardom', descripcion: 'Estrellato' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Steampunk', descripcion: 'Retrofuturista' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Strategic Minds', descripcion: 'Mentes Estratégicas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Student Teacher Relationship', descripcion: 'Relación Profesor-Estudiante' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Submarines', descripcion: 'Submarinos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Succubus', descripcion: 'Súcubos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Suicide', descripcion: 'Suicidio' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Super Robot', descripcion: 'Super Robots' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Superhero', descripcion: 'Superheroes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Superhuman', descripcion: 'Superhumanos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Supernatural Wife/Girlfriend', descripcion: 'Esposa/Novia Sobrenatural' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Superpowers', descripcion: 'Superpoderes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Survival', descripcion: 'Supervivencia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Survival Game', descripcion: 'Juego de Supervivencia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Survival Horror', descripcion: 'Sobreviviendo al Horror' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Swimming', descripcion: 'Natación' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Sword Fighting', descripcion: 'Lucha con Espada' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Swordplay', descripcion: 'Esgrima' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Swords', descripcion: 'Espadas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Taking Care of a Child', descripcion: 'Cuidando de un Niño' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Talking Animals', descripcion: 'Animales que Hablan' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Technology', descripcion: 'Tecnología' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tennis', descripcion: 'Tenis' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Terrorists', descripcion: 'Terroristas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Therapy', descripcion: 'Terapia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Time Travel', descripcion: 'Viajes en el Tiempo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Toilet Humour', descripcion: 'Humor Escatológico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Trading', descripcion: 'Comercio' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tragedy', descripcion: 'Tragedia' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tragic Past', descripcion: 'Pasado Trágico' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Traveling', descripcion: 'Viajes' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Treasure Hunting', descripcion: 'Cazadores de Tesoros' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Troublesome Kids', descripcion: 'Niños Problemáticos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Trumpeters', descripcion: 'Trompetistas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Tsundere', descripcion: 'Personaje pasivo que por momentos se vuelve hostil.' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Twins', descripcion: 'Gemelos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Undead', descripcion: 'No-Muertos' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Underwear', descripcion: 'Ropa Interior' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Unrequited Love', descripcion: 'Amor no Correspondido' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Vacation/Holiday', descripcion: 'Vacaciones' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Vampires', descripcion: 'Vampiros' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Virtual Reality', descripcion: 'Realidad Virtual' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Virus', descripcion: 'Virus' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'War', descripcion: 'Guerra' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Weapons', descripcion: 'Armas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Werewolves', descripcion: 'Hombres Lobo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Western', descripcion: 'Oeste' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Witches', descripcion: 'Brujas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Wolf Girls', descripcion: 'Chicas Lobo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Workplace', descripcion: 'Lugar de Trabajo' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'World War II', descripcion: 'La Segunda Guerra Mundial' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yakuza', descripcion: 'Crimen Organizado' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yandere', descripcion: 'Personaje hostil que por momentos se vuelve pasivo.' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yaoi', descripcion: 'Gays' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yuki-onna', descripcion: 'La Mujer de las Nieves' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yuri', descripcion: 'Lesbianas' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Yōkai', descripcion: 'Apariciones, espíritus, demonios o monstruos.' });
		items.push({ id: UUID(), borrado: 0, activo: 1, nombre: 'Zombies', descripcion: 'Zombis' });
		return this.rest.insertarItems(environment.REST.TABLAS.TEMA, items).then(() => {
			console.log(`[${nombreMetodo}] Temas insertados correctamente.`);
		}).catch((error) => {
			console.error(`[${nombreMetodo}] Error al insertar los items en la tabla: `, error);
		});
	}

}
