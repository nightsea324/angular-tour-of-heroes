import { Component, OnInit } from '@angular/core';
// Interface
import { Hero } from '../hero.interface';
// Srv
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // heroes -
  heroes: Hero[] = [];

  constructor(
    private heroSrv: HeroService,
    private messageSrv: MessagesService
  ) {}

  ngOnInit(): void {
    this.getHeros();
  }

  // selectedHero - 選擇的英雄
  selectedHero?: Hero;
  // onSelect - 選擇英雄事件
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageSrv.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  // getHeros - 取得英雄列表
  getHeros(): void {
    this.heroSrv.getHeros().subscribe((heroes) => (this.heroes = heroes));
  }
}
