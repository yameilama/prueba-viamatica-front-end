import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombres: string = '';
  apellidos: string = '';
  identificacion: string = '';
  email: string = '';

  onRegister() {

  }
}
