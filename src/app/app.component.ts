import { Component } from '@angular/core';

/** getCONFIG */
import { CONFIG } from '../../../CONFIG';

/** Parse */
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
}
