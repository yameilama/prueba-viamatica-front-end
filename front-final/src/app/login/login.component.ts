import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor() { }

  onLogin() {
    const login = {
      username: this.username,
      password: this.password
    };

  }
}
