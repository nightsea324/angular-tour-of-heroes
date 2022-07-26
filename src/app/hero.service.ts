import { Injectable } from '@angular/core';
// Interface
import { Hero } from './hero.interface';
// Mock
import { HEROES } from './mock-heroes';
// RxJS
import { Observable, of } from 'rxjs';
// Srv
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messagesSrv: MessagesService) {}

  // getHeroes - 取得英雄列表
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messagesSrv.add('HeroService: fetched heroes');
    return heroes;
  }

  // getHeroByID - 透過ID取得英雄
  getHeroByID(id: number): Observable<Hero> {
    const hero = HEROES.find((hero) => hero.id === id)!;
    this.messagesSrv.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
