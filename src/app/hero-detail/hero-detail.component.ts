import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Interface
import { Hero } from '../hero.interface';
// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroSrv: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  // getHero - 取得英雄列表
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroSrv.getHeroByID(id).subscribe((hero) => (this.hero = hero));
  }

  // goBack - 返回上一頁
  goBack(): void {
    this.location.back();
  }

  // save - 儲存
  save(): void {
    if (this.hero) {
      this.heroSrv.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
