import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class Lista {

	/**
	 * Ordena una lista por el atributo de ordenamiento.
	 */
	public static ordenar(lista: any[], atributoOrdenamiento: string, invertir?: boolean) {
		let listaOrdenada = lista.sort((a, b) => {
			return (a[atributoOrdenamiento] > b[atributoOrdenamiento]) ? 1 : ((b[atributoOrdenamiento] > a[atributoOrdenamiento]) ? -1 : 0);
		});
		if (invertir) {
			listaOrdenada = listaOrdenada.reverse();
		}
		return listaOrdenada;
	}

	/**
	 * Ordena una lista por el atributo de ordenamiento.
	 */
	public static obtenerItem(lista: any[], atributoBusqueda: string, criterioBusqueda: any): any {
		for(let item of lista){
			if(item[atributoBusqueda]==criterioBusqueda){
				return item;
			}
		};
		return null;
	}

}

@Injectable()
export class FechaDate {

	/**
	 * Suma a la fecha los años recibidos.
	 */
	public static sumaAnos(fecha: Date | number, anos: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(anos, 'years');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha los cuartos de año recibidos.
	 */
	public static sumaCuartos(fecha: Date | number, cuartos: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(cuartos, 'quarters');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha los meses recibidos.
	 */
	public static sumaMeses(fecha: Date | number, meses: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(meses, 'months');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha las semanas recibidos.
	 */
	public static sumaSemanas(fecha: Date | number, semanas: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(semanas, 'weeks');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha los dias recibidos.
	 */
	public static sumaDias(fecha: Date | number, dias: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(dias, 'days');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha las horas recibidos.
	 */
	public static sumaHoras(fecha: Date | number, horas: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(horas, 'hours');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha los minutos recibidos.
	 */
	public static sumaMinutos(fecha: Date | number, minutos: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(minutos, 'minutes');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha los segundos recibidos.
	 */
	public static sumaSegundos(fecha: Date | number, segundos: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(segundos, 'seconds');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Suma a la fecha los milisegundos recibidos.
	 */
	public static sumaMilisegundos(fecha: Date | number, milisegundos: number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.add(milisegundos, 'milliseconds');
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Regresa la misma fecha pero a las 23:59:59:999 PM.
	 */
	public static fechaEnLaNoche(fecha: Date | number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(999);
		fechaMoment.seconds(59);
		fechaMoment.minutes(59);
		fechaMoment.hours(23);
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Quita las horas, minutos, segundos y milisegundos de la fecha.
	 */
	public static quitarHoras(fecha: Date | number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		fechaMoment.seconds(0);
		fechaMoment.minutes(0);
		fechaMoment.hours(0);
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Quita los minutos, segundos y milisegundos de la fecha.
	 */
	public static quitarMinutos(fecha: Date | number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		fechaMoment.seconds(0);
		fechaMoment.minutes(0);
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Quita los segundos y milisegundos de la fecha.
	 */
	public static quitarSegundos(fecha: Date | number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		fechaMoment.seconds(0);
		return new Date(Number(fechaMoment.format("x")));
	}

	/**
	 * Quita los milisegundos de la fecha.
	 */
	public static quitarMilisegundos(fecha: Date | number): Date {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		return new Date(Number(fechaMoment.format("x")));
	}

}

@Injectable()
export class FechaNumber {

	private static MILISEGUNDOS_DIA = 1000 * 60 * 60 * 24;

	/**
	 * Convierte los milisegundos a dias.
	 */
	public static milisegundosADias(milisegundos: number): number {
		return Math.ceil(milisegundos / FechaNumber.MILISEGUNDOS_DIA);
	}

	/**
	 * Suma a la fecha los años recibidos.
	 */
	public static sumaAnos(fecha: Date | number, anos: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(anos, 'years');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha los cuartos de año recibidos.
	 */
	public static sumaCuartos(fecha: Date | number, cuartos: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(cuartos, 'quarters');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha los meses recibidos.
	 */
	public static sumaMeses(fecha: Date | number, meses: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(meses, 'months');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha las semanas recibidos.
	 */
	public static sumaSemanas(fecha: Date | number, semanas: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(semanas, 'weeks');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha los dias recibidos.
	 */
	public static sumaDias(fecha: Date | number, dias: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(dias, 'days');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha las horas recibidos.
	 */
	public static sumaHoras(fecha: Date | number, horas: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(horas, 'hours');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha los minutos recibidos.
	 */
	public static sumaMinutos(fecha: Date | number, minutos: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(minutos, 'minutes');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha los segundos recibidos.
	 */
	public static sumaSegundos(fecha: Date | number, segundos: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(segundos, 'seconds');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Suma a la fecha los milisegundos recibidos.
	 */
	public static sumaMilisegundos(fecha: Date | number, milisegundos: number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.add(milisegundos, 'milliseconds');
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Regresa la misma fecha pero a las 11:59:59:999 PM.
	 */
	public static fechaEnLaNoche(fecha: Date | number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(999);
		fechaMoment.seconds(59);
		fechaMoment.minutes(59);
		fechaMoment.hours(23);
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Quita las horas, minutos, segundos y milisegundos de la fecha.
	 */
	public static quitarHoras(fecha: Date | number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		fechaMoment.seconds(0);
		fechaMoment.minutes(0);
		fechaMoment.hours(0);
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Quita los minutos, segundos y milisegundos de la fecha.
	 */
	public static quitarMinutos(fecha: Date | number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		fechaMoment.seconds(0);
		fechaMoment.minutes(0);
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Quita los segundos y milisegundos de la fecha.
	 */
	public static quitarSegundos(fecha: Date | number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		fechaMoment.seconds(0);
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

	/**
	 * Quita los milisegundos de la fecha.
	 */
	public static quitarMilisegundos(fecha: Date | number): number {
		let fechaMoment = moment(fecha);
		fechaMoment.milliseconds(0);
		return new Date(Number(fechaMoment.format("x"))).getTime();
	}

}

