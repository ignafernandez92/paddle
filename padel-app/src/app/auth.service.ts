
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
}