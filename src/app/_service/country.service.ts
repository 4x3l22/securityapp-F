import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from './interfaces/ICountry';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private Ulr = 'http://localhost:9191/api/';

  constructor(private http: HttpClient) { }

  getCountry(route: string): Observable<ICountry[]>{
    return this.http.get<ICountry[]>(`${this.Ulr}${route}/Select`);
  }

  postCountry(route: string, id: any, data: any): Observable<any>{
    const headers = { 'Conten-Type':  'application/json' };
    if(id){
      return this.http.put<any>(`${this.Ulr}${route}`,  data, { headers });
    }
    return this.http.post<any>(`${this.Ulr}${route}`, data, { headers });
  }

  delete(ruta: string,id: number){
    return this.http.delete(`${this.Ulr}${ruta}/${id}`);
  }
}
