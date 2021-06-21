import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent';
import { HttpErrorResponse } from '@angular/common/http';
import { AgentsService } from 'src/app/services/agents.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-allagent',
  templateUrl: './allagent.component.html',
  styleUrls: ['./allagent.component.scss']
})
export class AllagentComponent implements OnInit {

  settings = {
    actions:{
      add : false,
      edit: false,
      delete:false
    },
    columns: {
      id: {
        title: 'ID',
        editable:false,
        addable: false
      },
      nom:{
        title: 'Nom'
      },
      prenom:{
        title: 'Prenom'
      },
      adresse: {
        title: 'Adresse'
      },
      email: {
        title: 'Email'
      },
      cin: {
        title: 'Cin'
      },
      telephone:{
        title: 'Telephone'
      },
      username:{
        title: 'Username'
      },
      password:{
        title: 'Password',
        filter : false,
        valuePrepareFunction: (value) => {  value === '**' }
      }
      
    }
  };
  loading$ = this.loader.loading$;
  constructor(private agentService : AgentsService,public loader:LoadingService) { }
  agents : Agent[]=[];
  ngOnInit(): void {
    this.getAgents();
    
  }

  getAgents(){
    this.agentService.getAllAgent().subscribe(
      (response : Agent[])=>{
        this.agents=response;
        console.log(response);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message);
      }
    );

}

}