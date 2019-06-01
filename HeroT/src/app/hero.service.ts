import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable({ providedIn: 'root' })
export class HeroService {
    updateHero(hero: Hero) {
        throw new Error("Method not implemented.");
    }

    constructor() { }

    getHeroes(): Observable<Hero[]> {
        return of(HEROES);
    }

    getHero(id: number): Observable<Hero> {
        return of(HEROES.find(hero => hero.id === id));
    }

}