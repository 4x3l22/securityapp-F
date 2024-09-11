import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRolView} from "./interfaces/IRolView";

@Injectable({
  providedIn: 'root'
})
export class RolviewService {

  private url = 'http://localhost:9191/api/';
  constructor(private http: HttpClient) { }

  getRolview(ruta: string): Observable<IRolView[]>{
    return this.http.get<IRolView[]>(`${this.url}${ruta}/Select`);
  }
}
