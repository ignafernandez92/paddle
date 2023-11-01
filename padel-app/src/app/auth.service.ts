
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

  getUserID(): number | null {
    const user_id = localStorage.getItem('user_id');
    return user_id ? +user_id : null; 
  }
  
  setUserID(user_id: number | null): void {
    if (user_id !== null) {
      localStorage.setItem('user_id', user_id.toString()); 
    } else {
      console.warn('Invalid user_id. User ID was not set.');
    }
  }
  
    removeUserID(): void {
    localStorage.removeItem('user_id');
  }

  setClubID(club_id: number | null): void {
    if (club_id !== null && typeof club_id === 'number') {
      localStorage.setItem('club_id', club_id.toString()); 
    } else {
      console.warn('Invalid club_id. Club ID was not set.');
    }
  }

  getClubID(): number | null {
    const club_id = localStorage.getItem('club_id');
    if (club_id !== null) {
      return parseInt(club_id, 10); 
    } else {
      return null;
    }
  }

  removeClubID(): void {
    localStorage.removeItem('club_id');
  }
  getUserRole(): string | null {
    const userRole = localStorage.getItem('user_role');
    return userRole;
  }
  
  setUserRole(userRole: string): void {
    if (userRole && typeof userRole === 'string' && userRole.trim() !== '') {
      localStorage.setItem('user_role', userRole);
    } else {
      console.warn('Invalid user_role. User role was not set.');
    }
  }
  
  removeUserRole(): void {
    localStorage.removeItem('user_role');
  }
  
}