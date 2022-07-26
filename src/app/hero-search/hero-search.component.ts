import { Component, OnInit } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

// Interface
import { HeroDto } from '../model/Dto/hero.dto';

// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<HeroDto[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroSrv: HeroService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.heroes$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.heroSrv.searchHeroes(term))
    );
  }

  /**
   * search -
   *
   * @param term - string
   * @returns void
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
