import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:8080/players', userData);
  }
}