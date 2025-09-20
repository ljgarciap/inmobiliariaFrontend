import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { User } from '../../../features/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<{ user: User; access_token: string }> {
    return this.post<{ user: User; access_token: string }>('login', { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.access_token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(userData: any): Observable<{ user: User; access_token: string }> {
    return this.post<{ user: User; access_token: string }>('register', userData)
      .pipe(
        tap(response => {
          this.setToken(response.access_token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
    return this.post('logout', {}).pipe(
      tap(() => {
        this.removeToken();
        this.currentUserSubject.next(null);
      })
    );
  }

  getCurrentUser(): Observable<{ data: User }> {
    return this.get<{ data: User }>('user').pipe(
      tap(response => this.currentUserSubject.next(response.data))
    );
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
