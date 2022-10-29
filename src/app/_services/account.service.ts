import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { AuthUser, UserToken } from '../_models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = 'https://localhost:7299/api/Auth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  private currentUser = new BehaviorSubject<UserToken | null>(null);
  currentUser$ = this.currentUser.asObservable();
  login(authUser: AuthUser) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, authUser, this.httpOptions)
    .pipe(
      map((token) => {
        if(token){
          const userToken: UserToken = {username: authUser.username, token};
          localStorage.setItem('userToken', JSON.stringify(userToken));
          this.currentUser.next(userToken);
        }
      })
    )
  }
  logout() {
    this.currentUser.next(null);
    localStorage.clear();
  }
  reLogin() {
      const token = localStorage.getItem('userToken');
      if(token) {
        const loginUser = JSON.parse(token);
        this.currentUser.next(loginUser);
      }
  }
  register() {}
}
