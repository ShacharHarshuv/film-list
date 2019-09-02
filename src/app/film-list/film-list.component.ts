import {
  Component,
  OnInit
} from '@angular/core';
import {
  FilmService,
  IFilm
} from '../film-service/film.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {

  filmList$: Observable<IFilm[]> = this.getFilmListStream();
  favoriteSet: Set<number> = this.getInitialFavoriteSet();

  constructor(
    private filmService: FilmService
  ) {
    this.filmService.getFilms()
      .subscribe(films => console.log(films));
  }

  private getFilmListStream(): Observable<IFilm[]> {
    return this.filmService.getFilms()
      .pipe(
        map(response => response.results)
      );
  }

  private getInitialFavoriteSet(): Set<number> {
    const favoriteArray = JSON.parse(localStorage.getItem('favoriteFilms'));
    return new Set(favoriteArray);
  }

  markFilm(id: number, isFavorite: boolean): void {
    if (isFavorite) {
      if (this.favoriteSet.has(id)) {
        return;
      } else {
        this.favoriteSet.add(id);
      }
    } else {
      if (this.favoriteSet.has(id)) {
        this.favoriteSet.delete(id);
      } else {
        return;
      }
    }

    localStorage.setItem('favoriteFilms', JSON.stringify(Array.from(this.favoriteSet)));
  }
}
