
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from '../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private secretKey = environment.SECRET_KEY_USER;

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
}