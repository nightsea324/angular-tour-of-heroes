import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {}

  async signUp() {
    if (this.username || this.password) {
      alert(`signUp failed, account and password can't be empty`);
      return;
    }
    const user = new Parse.User();
    user.set('username', this.username.trim());
    user.set('password', this.password.trim());

    try {
      await user.signUp();
    } catch (error) {
      console.error(error);
    }
  }
}
