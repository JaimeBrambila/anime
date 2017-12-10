import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccesoGuard implements CanActivate {
	public constructor(
		private router: Router
	) { }

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
		return new Promise((resolve: Function, reject: Function) => {
			resolve(true);
		});
	}
}
