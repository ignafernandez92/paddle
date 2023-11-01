import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { catchError, map } from 'rxjs/operators';
import { Competitor } from 'app/shared/competitors.model';
import { tap } from 'rxjs/operators';



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
        }),
        map((response: any) => {
          if (response && response.user_id) {
            return response; // If user_id is present, return the entire response
          } else {
            // Handle the case where user_id is missing
            console.error('User ID is missing in the login response.');
            throw new Error('Invalid login response');
          }
        })
      );
  }
 
  getCourts(clubId: number): Observable<any> {
    return this.http.get(`${this.baseUrlHttp}/courts/${clubId}`);
  }
  
  addCourt(courtData: any): Observable<any> {
    return this.http.post(`${this.baseUrlHttp}/courts/`, courtData);
  }
  
    updateCourt(courtId: number, courtData: any): Observable<any> {
      return this.http.put(`${this.baseUrlHttp}/${courtId}`, courtData);
    }
  
    deleteCourt(courtId: number): Observable<any> {
      return this.http.delete(`${this.baseUrlHttp}/${courtId}`);
    }

    createPlayer(playerData: any): Observable<any> {
      return this.http.post(`${this.baseUrlHttp}/players`, playerData);
    }
    getPlayers(): Observable<any> {
      return this.http.get(`${this.baseUrlHttp}/players`);
    }
    deletePlayer(user_id: number): Observable<any> {
      return this.http.delete(`${this.baseUrlHttp}/players/${user_id}`);
    }
    
    createTournament(tournamentData: any): Observable<any> {
      console.log('Request sent to create tournament:', tournamentData); // Add this line
      return this.http.post(`${this.baseUrlHttp}/tournaments`, tournamentData).pipe(
        tap((response: any) => {
          console.log('Tournament created successfully:', response);
        }),
        catchError((error: any) => {
          console.error('Error creating tournament:', error);
          throw error; // Rethrow the error to propagate it to the component
        })
        );
        
    }}


