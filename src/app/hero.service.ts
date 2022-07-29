import { Injectable } from '@angular/core';
// Interface
import { Hero } from './hero.interface';
import { HeroDetail } from './model/hero-detail';
// RxJS
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// Srv
import { MessagesService } from './messages.service';
// Http
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Parse
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messagesSrv: MessagesService, private http: HttpClient) {}

  // log -
  private log(message: string) {
    this.messagesSrv.add(`HeroService: ${message}`);
  }

  // heroesUrl -
  private heroesUrl = 'api/heroes';

  /** heroC - parseClass */
  private heroC = new Parse.Query('exampleHero');

  // httpOptions -
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // handleError -
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // getter -----
  // getHeroes - 取得英雄列表
  async getHeroes() {
    let result: HeroDetail[] = [];
    try {
      const promise = await this.heroC.find();
      result = promise.map((item) => new HeroDetail(item));
    } catch (error) {
      console.log(error);
    }
    return result;
    /** return this.http.get<Hero[]>(this.heroesUrl).pipe( */
    /** tap((_) => this.log('fetched heroes')), */
    /** catchError(this.handleError<Hero[]>('getHeroes', [])) */
    /** ); */
  }

  // getHeroByID - 透過ID取得英雄
  getHeroByID(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // setter -----
  // updateHero - 更新英雄
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateed`))
    );
  }

  // addHero - 新增英雄
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * delete - 刪除英雄
   */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * searchHeros - 搜尋英雄
   */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
