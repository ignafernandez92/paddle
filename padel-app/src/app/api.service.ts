import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrlHttp = environment.apiUrlHttp; 
  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrlHttp}/register`, userData)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrlHttp}/login`, userData)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }
 

}


  // private baseUrl = environment.apiUrl;


  // registerUser(userData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, userData); 
  // }

  // loginUser(userData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, userData); 
  // }

  