import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Admin } from '../models/admin';


@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private httpClient: HttpClient) { }

  authentificate(username, password) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
      
    });
    return this.httpClient
      .get<Admin>('http://localhost:8081/admin/username/'+username, {headers,})
      .pipe( 
        map((userData) => {
          sessionStorage.setItem('username', username);
          console.log("userData : " +JSON.stringify(userData))
          console.log("Is logged in " +this.isUserLoggedIn());
          return userData;
        })
        
      );
      
      
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log("user : " +user)
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
