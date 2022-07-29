import { Component, OnInit } from '@angular/core';
// CONFIG
import { CONFIG } from '../../../../CONFIG';
// Interface
import { Hero } from '../model/hero';
import { Hero as HeroDetail } from '../hero.interface';
// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroSrv: HeroService) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.getHeroes();
  }

  /**
   * getHeroes - 取得英雄列表
   */
  async getHeroes() {
    this.heroes = await this.heroSrv.getHeroes();
  }

  /**
   * add - 新增英雄
   *
   * @param name - string
   * @returns void
   */
  async add(name: string) {
    name = name.trim();
    if (!name) {
      alert('empty name');
      return;
    }
    let newHero: HeroDetail = {
      name: name,
      ID: this.heroes.length
        ? this.heroes[this.heroes.length - 1].getID() + 1
        : CONFIG.Hero.heroIDStartAt,
    };
    try {
      await this.heroSrv.addHero(newHero);
      /** refresh */
      this.heroes = await this.heroSrv.getHeroes();
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * delete - 刪除英雄
   */
  delete(inHero: Hero): void {
    this.heroes = this.heroes.filter((hero) => hero !== inHero);
    this.heroSrv.deleteHero(inHero.getID());
  }
}
