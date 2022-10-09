import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  apiURL = 'https://my-json-server.typicode.com/AlvaroAGDuoc/json';


  getUsers(): Observable<any> {
    return this.http.get(this.apiURL + '/users').pipe(
      retry(3)
    );
  }

  
  getUser(id): Observable<any> {
    return this.http.get(this.apiURL + '/users/' + id).pipe(
      retry(3)
    );
  }

  createUser(user): Observable<any> {
    return this.http.post(this.apiURL + '/users', user, this.httpOptions).pipe(
      retry(3)
    );
  }

  updateUser(id, user): Observable<any> {
    return this.http.put(this.apiURL + '/users/' + id, user, this.httpOptions).pipe(
      retry(3));
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(this.apiURL + '/users/' + id, this.httpOptions);
  }



  constructor(private http: HttpClient) { }
}
