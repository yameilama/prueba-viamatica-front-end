import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');

        if (!token) {
            return this.router.createUrlTree(['/login']);
        }


        const decodedToken = this.decodeToken(token);
        const userRoles = decodedToken.roles;


        if (userRoles.includes(expectedRole)) {
            return true;
        } else {
            return this.router.createUrlTree(['/unauthorized']);
        }
    }

    // Decode JWT token to get user details
    private decodeToken(token: string): any {
        const tokenPayload = token.split('.')[1];
        const decodedPayload = window.atob(tokenPayload);
        return JSON.parse(decodedPayload);
    }
}
