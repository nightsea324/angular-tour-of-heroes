import { Component, OnInit } from '@angular/core';
// Interface
import { Hero } from '../hero.interface';
// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroSrv: HeroService) {}

  ngOnInit(): void {
    this.getHeros();
  }

  // getHeros - 取得英雄列表
  getHeros(): void {
    this.heroSrv.getHeros().subscribe((heroes) => {
      this.heroes = heroes.splice(1, 5);
    });
  }
}
