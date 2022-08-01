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
    ID: '',
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
  }

  /**
   * getHero - 取得英雄詳情
   */
  async getHero() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('get Hero failed,router not exist');
      return;
    }
    this.hero = await this.heroSrv.getHeroByID(id);
    this.HeroDetail = {
      ID: this.hero.getID(),
      name: this.hero.getName(),
    };
  }

  /**
   * goBack - 返回
   *
   * @returns void
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * save - 儲存
   *
   * @returns void
   */
  save(): void {
    if (this.HeroDetail) {
      this.heroSrv.updateHero(this.HeroDetail);
    }
    /** goBack */
    this.goBack();
  }
}
