import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agence } from '../models/agence';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencesService {

  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  public getAgence():Observable<Agence[]>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Agence[]>(`${this.apiUrl}/agences`,{headers,});
  }
  public addAgence(agence:Agence):Observable<Agence>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Agence>(`${this.apiUrl}/agences`,agence,{headers,});
  }
  public updateAgence(agence:Agence):Observable<Agence>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Agence>(`${this.apiUrl}/agence/${agence.id}`,agence,{headers,});
  }
  public deleteAgence(agenceId:number):Observable<void>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<void>(`${this.apiUrl}/agence/${agenceId}`,{headers});
  }
}

