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

  // getHeros - 取得英雄列表
  getHeros(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messagesSrv.add('HeroService: fetched heroes');
    return heroes;
  }
}
