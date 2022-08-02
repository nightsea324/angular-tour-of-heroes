import { Component, OnInit } from '@angular/core';
/** Parse */
import * as Parse from 'parse';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  current = Parse.User.current();

  constructor() {}

  ngOnInit(): void {}

  async logout() {
    try {
      await Parse.User.logOut();
      this.current = Parse.User.current();
      alert('logOut');
    } catch (error) {
      console.error(error);
    }
  }
}
