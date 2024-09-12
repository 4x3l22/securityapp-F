import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from './interfaces/ICity';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private Ulr = 'http://localhost:9191/api/';

  constructor(private http: HttpClient) { }

  getCity(route: string): Observable<ICity[]>{
    return this.http.get<ICity[]>(`${this.Ulr}${route}/Select`);
  }

  postCity(route: string, id: any, data: any): Observable<any>{
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
