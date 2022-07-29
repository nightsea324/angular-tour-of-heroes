import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Interface
import { Hero } from '../model/hero';
import { Hero as HeroInterface } from '../hero.interface';
// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  HeroDetail: HeroInterface = {
    ID: 0,
    name: '',
  };

  constructor(
    private route: ActivatedRoute,
    private heroSrv: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.getHero();
    if (this.hero?.getName()) {
      this.HeroDetail.ID = this.hero.getID();
      this.HeroDetail.name = this.hero?.getName();
    }
  }

  /**
   * getHero - 取得英雄詳情
   */
  async getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hero = await this.heroSrv.getHeroByID(id);
  }

  goBack(): void {
    this.location.back();
  }

  // save - 儲存
  save(): void {
    /** if (this.hero) { */
    /** this.heroSrv.updateHero(this.hero).subscribe(() => this.goBack()); */
    /** } */
  }
}
