import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Game} from "../types/Game";

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {
  private http = inject(HttpClient);


  constructor() { }

  getFile(file: string): Observable<Game> {
    return this.http.get(file) as Observable<Game>;
  }
}
