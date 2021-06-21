import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agent} from '../models/agent';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agence } from '../models/agence';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  public getAllAgent():Observable<Agent[]>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Agent[]>(`${this.apiUrl}/agents`,{headers,})
  }
  public getAgent(id : number):Observable<Agent[]>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Agent[]>(`${this.apiUrl}/agence/${id}/agents`,{headers,})
  }
  public addAgent(agent : Agent):Observable<Agent>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Agent>(`${this.apiUrl}/agents`,agent,{headers,})
  }
  public updateAgent(agent : Agent):Observable<Agent>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Agent>(`${this.apiUrl}/agent/${agent.id}`,agent,{headers,})
  }
  public deleteAgent(agentId : number):Observable<void>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<void>(`${this.apiUrl}/agent/${agentId}`,{headers,})
  }

  public getAgence():Observable<Agence[]>{
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Agence[]>(`${this.apiUrl}/agences`,{headers,})
  }
}


