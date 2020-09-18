import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
} from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

//angular fire imports
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;

  matcher = new MyErrorStateMatcher();

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth
  ) {
    //form para registrar
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ])
        ),
        name: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.pattern('[a-zA-Z0-9]+'),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'),
          ])
        ),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.checkPasswords }
    );

    //form de login
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl('', [Validators.required]),
    });
  }

  //metodo para checar confirmar o password
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  //mensagens de erros
  account_validation_messages = {
    name: [
      { type: 'required', message: 'Você precisa fornecer um nome!' },
      {
        type: 'minlength',
        message: 'Seu nome deve conter no minimo 3 letras',
      },
      {
        type: 'maxlength',
        message: 'Seu nome não pode ser maior que 30',
      },
      {
        type: 'pattern',
        message: 'Seu nome só deve conter letras e numeros',
      },
    ],
    email: [
      { type: 'required', message: 'Você precisa fornecer um email' },
      { type: 'pattern', message: 'Email inválido' },
    ],
    confirm_password: [
      { type: 'required', message: 'Você precisa confirmar sua senha' },
      { type: 'areEqual', message: 'Senhas não são iguais' },
    ],
    password: [
      { type: 'required', message: 'Você precisa fornecer uma senha' },
      {
        type: 'minlength',
        message: 'Senha deve ter no mínimo 5 caracteres',
      },
      {
        type: 'pattern',
        message:
          'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número',
      },
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' },
    ],
  };

  //angular fire auth ======================================================================

  tryRegister(form: FormGroup) {
    // console.log(form.value.email, form.value.password, form.value.name);
    if (form.valid) {
      this.auth.registerUser(form.value.email, form.value.password, form.value.name);
    }
  }

  loginWithEmailandPassword(form: FormGroup){
    // console.log(form.value.email, form.value.password);
    if(form.valid){
      this.auth.emailSignin(form.value.email, form.value.password);
    }
  }

  ngOnInit(): void {}
}
