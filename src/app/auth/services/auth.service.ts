import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string =  environment.baseUrl;
  private _user!:User;

  get loggedUser(){
    return {...this._user};
  }

  constructor(private http:HttpClient) { }


  login(email:string,password:string){

    const url = `${this.baseUrl}/login`;
    const body = {email,password};
    this.http.post(url,body);
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error.message))
      );
  }
  getLoggedInUser(auth_token:any) {
    localStorage.setItem('token',auth_token);
    const url = `${this.baseUrl}/user_info`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<User>(url, { headers: headers })
      .pipe(
        tap(resp=>{
          this._user={
            id: resp.id,
            role_id: resp.role_id,
            first_name: resp.first_name,
            last_name:resp.last_name,
            email: resp.email,
            email_verified_at:resp.email_verified_at, 
            created_at: resp.created_at,
            updated_at: resp.updated_at
          }
        })
      )
  }
  tokenValidate():Observable<boolean> {

    const url = `${this.baseUrl}/user_info`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<User>(url, { headers: headers })
      .pipe(
        map(resp => {
          this._user={
            id: resp.id,
            role_id: resp.role_id,
            first_name: resp.first_name,
            last_name:resp.last_name,
            email: resp.email,
            email_verified_at:resp.email_verified_at, 
            created_at: resp.created_at,
            updated_at: resp.updated_at
          }
          return true;
        }),
        catchError(err=> of(false))
      );

  }

  logout(){
    const url = `${this.baseUrl}/logout`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    localStorage.clear();
    return this.http.get(url, { headers: headers })
  }


}
