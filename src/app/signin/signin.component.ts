import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  account: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {}

  signIn() {
    console.log(this.account);
    console.log(this.password);
  }
}
