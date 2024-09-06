import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imodule } from './interfaces/Imodule';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private url = 'http://localhost:9191/api/';
  constructor(private http:HttpClient){}

  //Uso de interfaces para código mas robusto
  GetModule(ruta: string): Observable<Imodule[]>{
    return this.http.get<Imodule[]>(`${this.url}${ruta}/Select`);
  }

  PostModule(ruta: string, id: any, data: any): Observable<any> {
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
