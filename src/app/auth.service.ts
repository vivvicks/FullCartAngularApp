// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Replace with your API endpoint
  private isAuthenticatedFlag: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Assume successful login sets isAuthenticatedFlag to true
    this.isAuthenticatedFlag = true;

    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  logout(): Observable<any> {
    // Assume successful logout sets isAuthenticatedFlag to false
    this.isAuthenticatedFlag = false;

    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): boolean {
    // Return the value of the isAuthenticatedFlag
    return this.isAuthenticatedFlag;
  }
}
