import { Component, OnInit } from '@angular/core';

/** getCONFIG */
import { CONFIG } from '../../../CONFIG';

/** Parse */
import * as Parse from 'parse';
const parse = require('parse');
parse.initialize(CONFIG.Parse.initialize);
parse.serverURL = CONFIG.Parse.serverURL;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heros';

  ngOnInit(): void {
    this.parseTest();
  }

  parseTest() {
    const query = new Parse.Query('example2');
    query.find().then((data) => data);
  }
}
