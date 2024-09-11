import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { View } from './interfaces/view';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private url = 'http://localhost:9191/api/';
  constructor(private http:HttpClient){}

  //Uso de interfaces para código mas robusto
  getView(ruta: string): Observable<View[]>{
    return this.http.get<View[]>(`${this.url}${ruta}/Select`);
  }

  postView(ruta: string, id: any, data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    if (id) {
      return this.http.put<any>(`${this.url}${ruta}`, data, { headers });
    }
    return this.http.post<any>(`${this.url}${ruta}`, data, { headers });
  }

  getId(ruta: string, id: number[]): Observable<View[]>{
    const idsQuery = id.join(',');
    return this.http.get<View[]>(`${this.url}${ruta}/${idsQuery}`).pipe(
      map(response => response || [])
    )
  }

  Delete(ruta: string, id:number){
    return this.http.delete(`${this.url}${ruta}/${id}`);
  }
}
