import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:9191/api/';
  constructor(private http:HttpClient){}

  //Uso de interfaces para código mas robusto
  getUser(ruta: string): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.url}${ruta}/Select`);
  }

  postUser(ruta: string, id: any, data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    if (id) {
      return this.http.put<any>(`${this.url}${ruta}`, data, { headers });
    }
    return this.http.post<any>(`${this.url}${ruta}`, data, { headers });
  }

  Delete(ruta: string, id:number){
    return this.http.delete(`${this.url}${ruta}/${id}`);
  }
}
