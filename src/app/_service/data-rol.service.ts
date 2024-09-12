import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataRolService {

  private data: {[key: string]: any} = {};

  setData(key: string, value: any): void {
    sessionStorage.setItem(key, value)
  }

  getData(key: string): any {
    return sessionStorage.getItem(key);
  }
}
