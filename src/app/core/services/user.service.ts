import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly TOKEN_KEY = 'authToken';
  private apiUrl = 'https://dummyjson.com/users';


  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): boolean {
    if (username === 'tasksAdmin' && password === 'tasksAdmin') {
      localStorage.setItem(this.TOKEN_KEY, 'mock-token');
      localStorage.setItem('username', username);
      this.router.navigate(['/tasks']);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getAllUsers(): Observable<{ id: number; name: string }[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) =>
        response.users.map((user: any) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`, // Combine first and last name based on dummy request data structure
        }))
      )
    );
  }
}
