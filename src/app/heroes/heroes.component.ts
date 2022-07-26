import { Component, OnInit } from '@angular/core';
// Interface
import { Hero } from '../hero.interface';
// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // heroes -
  heroes: Hero[] = [];

  constructor(private heroSrv: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  // getHeroes - 取得英雄列表
  getHeroes(): void {
    this.heroSrv.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
