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

  // getter ------
  // getHeroes - 取得英雄列表
  getHeroes(): void {
    this.heroSrv.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  // setter -----
  // add - 新增英雄
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroSrv.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  /**
   * delete - 刪除英雄
   */
  delete(inHero: Hero): void {
    this.heroes = this.heroes.filter((hero) => hero !== inHero);
    this.heroSrv.deleteHero(inHero.id).subscribe();
  }
}
