import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loggedIn.next(!!this.getToken());
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>('/user/login', { email, password }).pipe(
      map((data) => {
        this.storeToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.loggedIn.next(true);
        return data;
      })
    );
  }

  register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>('/user/register', { name, email, password })
      .pipe(
        map((data) => {
          this.storeToken(data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.loggedIn.next(true);
          return data;
        })
      );
  }

  logout(): void {
    this.removeToken();
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
