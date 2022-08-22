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
        catchError(err=> of(err.error))
      );

  }

  updateUser(user:User){

    const url = `${this.baseUrl}/useraccess/${user.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = user;
    this.http.post(url,body);
    return this.http.put<User>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }
  storeUser(user:User){

    const url = `${this.baseUrl}/useraccess`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = user;
    this.http.post(url,body);
    return this.http.post<User>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }



  deleteUser(id:string){
    const url = `${this.baseUrl}/useraccess/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(url, { headers: headers })
    .pipe(
      catchError(err=> of(err))
    );
  }
  deleteAllUser(users:Array<any>){

    const url = `${this.baseUrl}/useraccess/deleteall`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = users;
    this.http.post(url,body);
    return this.http.post<User>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }

}
