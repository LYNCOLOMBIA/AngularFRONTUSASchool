import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Group,Student } from '../interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }
  private baseUrl:string =  environment.baseUrl;

  groups(userid:any){

    const url = `${this.baseUrl}/group/${userid}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Group>(url, { headers: headers })
      .pipe(
        catchError(err=> of(err.error))
      );

  }
  updateGroup(group:Group){
    const url = `${this.baseUrl}/group/${group.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = group;
    this.http.post(url,body);
    return this.http.put<Group>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }
  storeGroup(group:Group){

    const url = `${this.baseUrl}/group`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = group;
    this.http.post(url,body);
    return this.http.post<Group>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }

  deleteGroup(id:string){
    const url = `${this.baseUrl}/group/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(url, { headers: headers })
    .pipe(
      catchError(err=> of(err))
    );
  }
  deleteStudent(id:string){
    const url = `${this.baseUrl}/student/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(url, { headers: headers })
    .pipe(
      catchError(err=> of(err))
    );
  }
  deleteAllStudents(students:Array<any>){

    const url = `${this.baseUrl}/student/deleteall`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = students;
    this.http.post(url,body);
    return this.http.post<Student>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }
  
  students(){ 
    const url = `${this.baseUrl}/student`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Student>(url, { headers: headers })
      .pipe(
        catchError(err=> of(err.error))
      );

  }


  updateStudent(student:Student){
    const url = `${this.baseUrl}/student/${student.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = student;
    this.http.post(url,body);
    return this.http.put<Student>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }
  storeStudent(student:any){

    const url = `${this.baseUrl}/student`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const body = student;
    this.http.post(url,body);
    return this.http.post<Student>(url,body,{ headers: headers })
      .pipe(
        map(resp=> resp),
        catchError(err=>of(err.error))
      );
  }

  
}
