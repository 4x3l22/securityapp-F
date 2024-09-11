import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:9191/api/user/login';
  private userKey = 'user';

  constructor(private  http: HttpClient) { }

  login(userName: string, password: string): Observable<any>{

    const body = {userName, password};

    return this.http.post<any>(this.url, body)
    .pipe(
      tap(response=>{
        if(response && response.success){
          localStorage.setItem('user',  JSON.stringify(response, null, 2));
        }
      })
    )

  }

  logOut(): void{
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean{
    const userData = localStorage.getItem('user');
    // console.log('User data in localStorage:', userData);
    return userData !== null;
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }
}
