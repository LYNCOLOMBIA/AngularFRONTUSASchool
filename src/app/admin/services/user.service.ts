import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl:string =  environment.baseUrl;

  constructor(private http:HttpClient) { }

  userAccess(){

    const url = `${this.baseUrl}/useraccess`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<User>(url, { headers: headers })
      .pipe(
        catchError(err=> of(err.error.message))
      );

  }

}
