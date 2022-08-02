import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  username: string = '';
  password: string = '';
  token: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    if (Parse.User.current()) {
      this.router.navigate(['']);
      alert('success');
    }
  }

  async signIn() {
    /** checkWhenSignIn */
    if (!this.username || !this.password) {
      alert(`signIn failed, account and password can't be empty`);
      return;
    }

    try {
      await Parse.User.logIn(this.username, this.password);
      alert('success');
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
      this.router.navigate(['']);
    }
    return;
  }
}
