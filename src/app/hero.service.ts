import { Injectable } from '@angular/core';
// Interface
import { Hero } from './hero.interface';
// RxJS
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// Srv
import { MessagesService } from './messages.service';
// Http
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messagesSrv: MessagesService, private http: HttpClient) {}

  // getHeroes - 取得英雄列表
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // getHeroByID - 透過ID取得英雄
  getHeroByID(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // log -
  private log(message: string) {
    this.messagesSrv.add(`HeroService: ${message}`);
  }

  // heroesUrl -
  private heroesUrl = 'api/heroes';

  // handleError -
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
