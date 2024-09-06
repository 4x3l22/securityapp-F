import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContinent } from './interfaces/IContinent';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {

  // Variable para hacer consumo de su respectivo endpoint
  private Ulr = 'http://localhost:9191/api/';

  constructor(private http: HttpClient) { }

  getContinent(route: string): Observable<IContinent[]>{
    return this.http.get<IContinent[]>(`${this.Ulr}${route}/Select`);
  }

  postContinent(route: string, id: any, data: any): Observable<any>{
    const headers = { 'Conten-Type':  'application/json' };
    if(id){
      return this.http.put<any>(`${this.Ulr}${route}`,  data, { headers });
    }
    return this.http.post<any>(`${this.Ulr}${route}`, data, { headers });
  }

  delete(id: number){
    return this.http.delete(`${this.Ulr}Continent/${id}`);
  }
}
