import { Injectable } from '@angular/core';
// Interface
import { Hero } from './model/hero';
import { Hero as HeroDetail } from './hero.interface';
// Parse
import * as Parse from 'parse';
// config
import { CONFIG } from '../../../CONFIG';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  /** heroC - parseClass */
  private heroC = Parse.Object.extend(CONFIG.Parse.heroC);

  /**
   * getHeroes - 取得英雄列表
   *
   * @returns Promise<Hero[]>
   */
  async getHeroes(): Promise<Hero[]> {
    const query = new Parse.Query(this.heroC);
    let result: Hero[] = [];

    try {
      const parseObject = await query.ascending('createdAt').find();
      if (!parseObject) {
        alert('getHeroes failed,Heroes not exist');
        return result;
      }
      result = parseObject.map((item) => new Hero(item));
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  /**
   * getHeroByID - 透過ID取得英雄
   *
   * @param id - number
   * @returns Promise<Hero>
   */
  async getHeroByID(id: string): Promise<Hero> {
    const query = new Parse.Query(this.heroC);
    let result: Hero = new Hero(new Parse.Object());

    try {
      const parseObject = await query.get(id);
      if (!parseObject) {
        alert('getHeroByID failed, Hero not exist');
        return result;
      }

      result = new Hero(parseObject);
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  /**
   * updateHero - 更新英雄
   *
   * @param hero - HeroDetail
   */
  async updateHero(hero: HeroDetail) {
    const query = new Parse.Query(this.heroC);

    try {
      /** getOld */
      let parseObject = await query.get(hero.ID);
      if (!parseObject) {
        alert('hero not exist');
        return;
      }

      /** update */
      parseObject.set('name', hero.name);
      await parseObject.save();
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * addHero - 新增英雄
   *
   * @param hero - HeroDetail
   */
  async addHero(hero: HeroDetail) {
    let newHero = new this.heroC();

    try {
      newHero.set('name', hero.name);
      await newHero.save();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * deleteHero - 刪除英雄
   *
   * @param id - number
   */
  async deleteHero(id: string) {
    const query = new Parse.Query(this.heroC);

    try {
      /** getOld */
      const parseObject = await query.get(id);
      if (!parseObject) {
        alert('hero not exist');
        return;
      }
      /** destroy */
      await parseObject.destroy();
    } catch (error) {
      console.error(error);
    }

    return;
  }

  /**
   * searchHeroes - 搜尋英雄
   *
   * @param term - string
   * @returns Promise<Hero[]>
   */
  async searchHeroes(term: string): Promise<HeroDetail[]> {
    if (!term.trim()) {
      return [];
    }

    const query = new Parse.Query(this.heroC);
    let result: HeroDetail[] = [];

    try {
      const parseObject = await query
        .matches('name', new RegExp(term))
        .ascending('createdAt')
        .find();
      result = parseObject.map((item) => ({
        ID: item.id,
        name: item.get('name'),
      }));
    } catch (error) {
      console.error(error);
    }

    return result;
  }
}
