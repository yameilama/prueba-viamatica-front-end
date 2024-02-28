import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    identificacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^\d{10}$/),
      this.identificacionValidator()
    ])),
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/
      )
    ]),
    contrasena: new FormControl('', [Validators.required,
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W)[^\s]{8,}$/)]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email])
  });

  get usuario() {
    return this.registerForm.get('usuario');
  }
  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

    }
  }

  generateEmail() {
    const nombres = this.registerForm.get('nombres').value;
    const apellidos = this.registerForm.get('apellidos').value;
    if (nombres && apellidos) {
      const primeraLetraNombre = nombres.split(' ')[0][0];
      const primerApellido = apellidos.split(' ')[0];
      const primeraLetraSegundoApellido = apellidos.split(' ')[1] ? apellidos.split(' ')[1][0] : '';
      const email = `${primeraLetraNombre}${primerApellido}${primeraLetraSegundoApellido}@mail.com`.toLowerCase();
      this.registerForm.get('email').setValue(email);
    }
  }

  identificacionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (valor && /(\d)\1{3}/.test(valor)) {
        return { 'secuenciaInvalida': true };
      }
      return null;
    };
  }

}
