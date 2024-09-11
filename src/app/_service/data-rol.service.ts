import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataRolService {

  // private data: any = {};
  private data: {[key:string]:any}={};

  setData(key: string, value: any){
    this.data[key]=value;
  }

  getData(key: string): any{
    return this.data[key];
  }
}
