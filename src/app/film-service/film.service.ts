import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IFilm {
  title: string;
  episode_id: number;
}

export interface GetFilmsResponse {
  count: number;
  results: IFilm[];
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getFilms(): Observable<GetFilmsResponse> {
    return this.http.get<GetFilmsResponse>(`https://swapi.co/api/films`);
  }
}
