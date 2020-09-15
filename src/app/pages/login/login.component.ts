import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você precisa fornecer um email!';
    }

    return this.email.hasError('email') ? 'Email inválido!' : '';
  }

  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return 'Você precisa fornecer um password!';
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
