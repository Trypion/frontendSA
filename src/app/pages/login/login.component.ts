import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm: FormGroup;
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required]);

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você precisa fornecer um email!';
    }
    return this.email.hasError('email') ? 'Email inválido!' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Você precisa fornecer uma senha!';
    }
  }

  getNomeErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Você precisa fornecer um nome!';
    }
  }

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({

    })
  }

  ngOnInit(): void {}
}
