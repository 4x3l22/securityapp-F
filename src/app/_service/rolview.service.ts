import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRolView } from "./interfaces/IRolView";

@Injectable({
  providedIn: 'root'
})
export class RolviewService {

  private url = 'http://localhost:9191/api/';
  constructor(private http: HttpClient) { }

  getRolview(ruta: string, id: number): Observable<IRolView[]>{
    return this.http.get<IRolView[]>(`${this.url}${ruta}/lisrv/${id}`);
  }

  post(ruta: string, id: any, data: any): Observable<any>{
    const headers = { 'Content-Type': 'application/json' };
    if (id) {
      return this.http.put<any>(`${this.url}${ruta}`, data, { headers });
    }
    return this.http.post<any>(`${this.url}${ruta}`, data, { headers });
  }
}
