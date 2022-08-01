import { Component, OnInit } from '@angular/core';
// RxJS
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// Interface
import { Hero } from '../hero.interface';

// Srv
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroSrv: HeroService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(0),
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
