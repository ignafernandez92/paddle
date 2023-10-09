import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  sendResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(newPassword: string, token: string): Observable<any> {
    // Send a POST request to your server's password reset endpoint
    const resetData = {
      newPassword: newPassword,
      token: token
    };

    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
  }
}
