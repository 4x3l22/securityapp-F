import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRol } from './interfaces/Irole';
import {View} from "./interfaces/view";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = 'http://localhost:9191/api/';
  constructor(private http:HttpClient){}

  //Uso de interfaces para código mas robusto
  GetRol(ruta: string): Observable<IRol[]>{
    return this.http.get<IRol[]>(`${this.url}${ruta}/Select`);
  }

  PostRol(ruta: string, id: any, data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    if (id) {
      return this.http.put<any>(`${this.url}${ruta}`, data, { headers });
    }
    return this.http.post<any>(`${this.url}${ruta}`, data, { headers });
  }

  getId(ruta: string, id: number[]): Observable<IRol[]>{
    const idsQuery = id.join(',');
    return this.http.get<IRol[]>(`${this.url}${ruta}/${idsQuery}`)
  }

  Delete(ruta: string, id:number){
    return this.http.delete(`${this.url}${ruta}/${id}`);
  }
}
