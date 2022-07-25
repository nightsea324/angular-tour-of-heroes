import { Component, OnInit } from '@angular/core';
// Interface
import { Hero } from '../hero.interface';
// Mock
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // hero -
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };
  // heroes -
  heroes = HEROES;

  constructor() {}

  ngOnInit(): void {}

  // selectedHero - 選擇的英雄
  selectedHero?: Hero;
  // onSelect - 選擇英雄事件
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
