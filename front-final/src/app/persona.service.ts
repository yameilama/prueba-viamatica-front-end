import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PersonaService {
    private apiUrl = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient) { }

    registerUser(userData: any) {

        return this.http.post(this.apiUrl + '/register', userData);
    }
}
