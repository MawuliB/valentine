import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Update this URL to match your backend server
  private readonly apiUrl = 'http://127.0.0.1:8000';
  private readonly tokenKey = 'access_token';
  
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private readonly http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  signup(username: string, password: string, display_name: string): Observable<any> {
    const payload = { username, password, display_name };
    return this.http.post(`${this.apiUrl}/signup`, payload);
  }

  login(username: string, password: string): Observable<TokenResponse> {
    // OAuth2PasswordRequestForm requires fields: username and password
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    return this.http.post<TokenResponse>(`${this.apiUrl}/token`, formData).pipe(
      tap((res: TokenResponse) => {
        localStorage.setItem(this.tokenKey, res.access_token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }
}
