import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { Advertising } from '../interfaces/interfaces';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdvertisingService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAdvertising() {
    const url = `${this.baseUrl}/advertising`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http
      .get<Advertising>(url, { headers: headers })
      .pipe(catchError((err) => of(err.error)));
  }

  updateAdvertising(advertising: Advertising) {
    const url = `${this.baseUrl}/advertising/${advertising.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const body = advertising;
    this.http.post(url, body);
    return this.http.put<Advertising>(url, body, { headers: headers }).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error))
    );
  }

  storeAdvertising(advertising: Advertising) {
    const url = `${this.baseUrl}/advertising`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const body = advertising;
    this.http.post(url, body);
    return this.http.post<Advertising>(url, body, { headers: headers }).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error))
    );
  }

  deleteAdvertising(id: string) {
    const url = `${this.baseUrl}/advertising/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http
      .delete(url, { headers: headers })
      .pipe(catchError((err) => of(err)));
  }

  // uploadBannerAdvertisingSM(fileUpload: File) {
  //   console.log(fileUpload);
  //   const url = `${this.baseUrl}/advertising/upload-banner-sm`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     }),
  //   };
  //   const file = new FormData();

  //   file.append('file', fileUpload, fileUpload.name);

  //   console.log(file);
  //   this.http.post(url, file)
  //   return this.http.post(url, file,httpOptions).pipe(
  //     map((resp) => resp),
  //     catchError((err) => of(err.error))
  //   );
  // }

  // uploadBannerAdvertisingSM(fileUpload: File) {
  //   console.log(fileUpload);
  //   const url = `${this.baseUrl}/advertising/upload-banner-sm`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   });
  //   const file = new FormData();

  //   file.append('file', new Blob([fileUpload]));

  //   console.log(file);
  //   return this.http.post(url, file,{headers:headers}).pipe(
  //     map((resp) => resp),
  //     catchError((err) => of(err.error))
  //   );
  // }
}


// async uploadBannerAdvertisingSM(fileUpload:any){
//   const file:File = fileUpload;
//   const url = `${this.baseUrl}/advertising/upload-banner-sm`;
//   let headersList = {
//     "User-Agent": "School Front",
//     "Accept": "application/json",
//     "Authorization": `Bearer ${localStorage.getItem('token')}`,
//    }
   
//    let bodyContent = new FormData();
//    bodyContent.append("file", file);
   
//    let response = await fetch(url, { 
//      method: "POST",
//      body: bodyContent,
//      headers: headersList
//    });
   
//    let data = await response.text();
//    return data;
   
// }


