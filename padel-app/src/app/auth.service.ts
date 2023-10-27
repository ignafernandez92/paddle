
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from '../environments/environments'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private secretKey = environment.SECRET_KEY_USER;
  constructor(private http: HttpClient) {}
  verifyToken(token: string): any {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }
  isAuthenticated(): boolean {
    
    const token = this.getToken();

    if (token) {
      const decodedToken = this.verifyToken(token);

      if (decodedToken) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTimestamp;
      }
    }
    console.log('AuthService - isAuthenticated');
    return false;
  }

  getUserID(): string | null {
    const user_id = localStorage.getItem('user_id');
    console.log('User ID retrieved:', user_id);
    return user_id;
  }
  setUserID(user_id: any): void {
    if (user_id && typeof user_id === 'string' && user_id.trim() !== '') {
      localStorage.setItem('user_id', user_id);
      console.log('User ID set:', user_id);
    } else {
      console.warn('Invalid user_id. User ID was not set.');
    }
  }
  
    removeUserID(): void {
    localStorage.removeItem('user_id');
  }

  setClubID(club_id: string): void {
    if (club_id && club_id.trim() !== '') {
      localStorage.setItem('club_id', club_id);
      console.log('Club ID set:', club_id);
    } else {
      console.warn('Invalid club_id. Club ID was not set.');
    }
  }
  getClubID(): string | null {
    const club_id = localStorage.getItem('club_id');
    console.log('Club ID retrieved:', club_id);
    return club_id;
  }

  removeClubID(): void {
    localStorage.removeItem('club_id');
  }
}