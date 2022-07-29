import { Component, OnInit } from '@angular/core';
// Interface
import { Hero } from '../model/hero';
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
    this.getHeroes();
  }

  // getHeroes - 取得英雄列表
  async getHeroes() {
    this.heroes = (await this.heroSrv.getHeroes()).splice(1, 5);
  }
}
