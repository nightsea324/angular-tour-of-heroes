import { Component, OnInit } from '@angular/core';
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
    if (!name) {
      alert('empty name');
      return;
    }
    const newHero: HeroDetail = {
      ID: '',
      name: name.trim(),
    };
    try {
      await this.heroSrv.addHero(newHero);
      /** refresh */
      this.getHeroes();
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * delete - 刪除英雄
   *
   * @param inHero - Hero
   * @returns void
   */
  delete(inHero: Hero): void {
    this.heroes = this.heroes.filter((hero) => hero !== inHero);
    this.heroSrv.deleteHero(inHero.getID());
  }
}
