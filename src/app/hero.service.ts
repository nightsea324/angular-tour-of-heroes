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
    let result: Hero[] = [];
    const query = new Parse.Query(this.heroC);

    try {
      const parseObject = await query.find();
      result = parseObject.map((item) => new Hero(item));
      /** setID */
      result = result.map((item, index, array) => {
        /** 如果為第一筆，則設置為起始，否則為上一筆+1 */
        if (index === 0) {
          item.setID(CONFIG.Hero.heroIDStartAt);
          return item;
        }
        item.setID(array[index - 1].getID() + 1);

        return item;
      });

      return result;
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
  async getHeroByID(id: number): Promise<Hero> {
    let result: Hero = new Hero(new Parse.Object());
    const query = new Parse.Query(this.heroC);

    try {
      const parseObject = await query.equalTo('heroID', id).find();
      if (parseObject.length !== 0) {
        /** 只取一筆 */
        result = new Hero(parseObject[0]);

        return result;
      }

      return result;
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
    let newHero = new this.heroC();
    const query = new Parse.Query(this.heroC);

    /** getOld */
    try {
      const parseObject = await query.equalTo('heroID', hero.ID).find();
      if (!parseObject.length) {
        alert('hero not exist');
      }
      /** 只取一筆 */
      newHero = parseObject[0];
    } catch (error) {
      console.error(error);
    }

    /** update */
    newHero.set('name', hero.name);
    try {
      await newHero.save();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * addHero - 新增英雄
   *
   * @param hero - HeroDetail
   */
  async addHero(hero: HeroDetail) {
    let newHero = new this.heroC();

    newHero.set('name', hero.name);
    newHero.set('heroID', hero.ID);
    try {
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
  async deleteHero(id: number) {
    let newHero = new this.heroC();
    const query = new Parse.Query(this.heroC);

    /** getOld */
    try {
      const parseObject = await query.equalTo('heroID', id).find();
      if (!parseObject.length) {
        alert('hero not exist');
      }
      /** 只取一筆 */
      newHero = parseObject[0];
    } catch (error) {
      console.error(error);
    }

    /** destroy */
    try {
      await newHero.destroy();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * searchHeros - 搜尋英雄
   */
  searchHeroes(term: string) {
    /** if (!term.trim()) { */
    /** return of([]); */
    /** } */
    /** return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe( */
    /** tap((x) => */
    /** x.length */
    /** ? this.log(`found heroes matching "${term}"`) */
    /** : this.log(`no heroes matching "${term}"`) */
    /** ), */
    /** catchError(this.handleError<Hero[]>('searchHeroes', [])) */
    /** ); */
  }
}
