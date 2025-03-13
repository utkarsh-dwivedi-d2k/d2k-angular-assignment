import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  activeForm: 'login' | 'register' = 'register';
  registerObj: registerModel = new registerModel();
  loginObj: loginModel = new loginModel();
  isLoggedIn: boolean = false;

  constructor(private _snackbar: MatSnackBar, private _router: Router) {
    this.isLoggedIn = localStorage.getItem('loggedUser') ? true : false;
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  registerForm() {
    const localusers = localStorage.getItem('users');
    if (localusers != null) {
      const users = JSON.parse(localusers);
      users.push(this.registerObj);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.registerObj);
      localStorage.setItem('users', JSON.stringify(users));
    }
    this._snackbar.open('User registered successfully', 'Close');
  }

  loginForm() {
    const localusers = localStorage.getItem('users');
    if (localusers != null) {
      const users = JSON.parse(localusers);
      const isUserExist = users.find((user: registerModel) => user.email == this.loginObj.email && user.password == this.loginObj.password);
      if (isUserExist != undefined) {
        this._snackbar.open('Login Successful', 'Close');
        localStorage.setItem('loggedUser', JSON.stringify(isUserExist));
        this.isLoggedIn = true;
        this._router.navigateByUrl('/step1');
      } else {
        this._snackbar.open('Email or Password is incorrect!', 'Close');
      }
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.isLoggedIn = false;
    this._router.navigateByUrl('/login');
  }
}

export class registerModel {
  name: string;
  email: string;
  password: string;
  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
  }
}

export class loginModel {
  email: string;
  password: string;
  constructor() {
    this.email = "";
    this.password = "";
  }
}
