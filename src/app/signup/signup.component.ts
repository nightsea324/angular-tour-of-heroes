import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  async signUp() {
    /** checkWhenSignUp */
    if (!this.username || !this.password) {
      alert(`signUp failed, account and password can't be empty`);
      return;
    }

    const user = new Parse.User();
    user.set('username', this.username.trim());
    user.set('password', this.password.trim());

    try {
      await user.signUp();
      this.router.navigate(['']);
      alert('sucess');
    } catch (error) {
      console.error(error);
    }
  }
}
