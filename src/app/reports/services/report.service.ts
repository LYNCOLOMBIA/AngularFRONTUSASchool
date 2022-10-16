import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}



  getGameResults(params: any) {
    const url = `${this.baseUrl}/gameresult/report`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.token}`,
    });

    const body = params;
    this.http.post(url, body);
    return this.http.post(url, body, { headers: headers }).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error))
    );
  }

}


