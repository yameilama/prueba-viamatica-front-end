import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedInUser: string | null = null;

    constructor(private router: Router) { }


    setLoggedInUser(username: string): void {
        this.loggedInUser = username;
    }

    getLoggedInUser(): string | null {
        return this.loggedInUser;
    }

    isLoggedIn(): boolean {
        return this.loggedInUser !== null;
    }

    logout(): void {
        this.loggedInUser = null;
        sessionStorage.clear();
        this.router.navigate(['/login']);

    }

}
