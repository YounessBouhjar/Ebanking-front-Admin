import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { AgentsService } from 'src/app/services/agents.service';
import { Agent } from 'src/app/models/agent';
import { Agence } from 'src/app/models/agence';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  settings = {
    delete: {
      confirmDelete : true,
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
   },
   add: {
    createButtonContent: '<i class="fa fa-plus" aria-hidden="true"></i>',
    cancelButtonContent: '<i class="fa fa-undo" aria-hidden="true"></i>',
    confirmCreate: true,
  },
  edit: {
    editButtonContent: '<i class="far fa-edit" aria-hidden="true"></i>',
    saveButtonContent: '<i class="far fa-save"></i>',
    cancelButtonContent: '<i class="fa fa-undo" aria-hidden="true"></i>',
    confirmSave: true,
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

  
  agents : Agent[]=[];
  agences : Agence[]=[];
  agence : any;
  loading$ = this.loader.loading$;
  constructor(private agentService:AgentsService, private router :Router,public loader:LoadingService) { 
    this.agence=this.router.getCurrentNavigation().extras.state;
  }
  
  ngOnInit(): void {
    this.getAgents();
  }

  getAgents(){
    this.agentService.getAgent(this.agence.id).subscribe(
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
  onAddAgent(event){
   // console.log(this.settings.columns.agence.editor.config.list) 
    if(window.confirm('êtes-vous sur de vouloir creér cet agent ?')){
      if(event.newData.adresse===""||event.newData.cin===""||event.newData.email===""||event.newData.nom===""||event.newData.telephone===""||event.newData.prenom===""||event.newData.username===""||event.newData.password===""){
        alert('un champ est invalide, verifiez vos données !!')
      }
      else if(this.validateEmail(event.newData.email)===false){
        alert('Champ email invalide !!! , verifiez vos données !!')
      }
      else if(this.validateNumber(event.newData.telephone)===false){
        alert('Champ téléphone invalide !!! , verifiez vos données !!')
      }
      else{
      console.log(event.newData)
      event.newData.agence=this.agence
      console.log(event.newData.agence)
      this.agentService.addAgent(event.newData).subscribe(
        response => {
          this.getAgents();
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          
          }
      )
    }
    }
  }

  onUpdateAgent(event){
    if(event.newData.adresse===""||event.newData.cin===""||event.newData.email===""||event.newData.nom===""||event.newData.telephone===""||event.newData.prenom===""||event.newData.username===""||event.newData.password===""){
      alert('un champ est invalide, verifiez vos données !!')
    }
    else if(this.validateEmail(event.newData.email)===false){
      alert('Champ email invalide !!! , verifiez vos données !!')
    }
    else if(this.validateNumber(event.newData.telephone)===false){
      alert('Champ téléphone invalide !!! , verifiez vos données !!')
    }
    else if(window.confirm('êtes-vous sur de vouloir modifier cet agent ?')){
      this.agentService.updateAgent(event.newData).subscribe(
        response => {
          console.log("Edit : "+ response);
          this.getAgents();
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          
          }
      )
    }
  }

  onDeleteAgent(event){
    if(window.confirm('êtes-vous sur de vouloir supprimer cet agent ?')){
      this.agentService.deleteAgent(event.data.id).subscribe(
        response => {
          console.log("delete : "+ response);
          this.getAgents();
        },
        (error:HttpErrorResponse) => {
          alert("Veuillez supprimer les clients liés à cet agent en premier")
          console.log(error);
          
          }
      )
    }
  }

  getListAgences(){
    
    this.agentService.getAgence().subscribe(
      (response:Agence[])=>{
        this.agences=response;
        var listObj = [];
        console.log(this.agences)  
        
        this.agences.forEach(function(agence,index){
          console.log("agence : " +agence.id)
         
         console.log('JSON : '+ JSON.stringify(agence)) 
         
          listObj.push({
                title: agence.id,
                Value: agence
                
              })
                
        });
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
      }
    );
  }

  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

    validateNumber(number) {
    const re = /^[0-9\b]+$/;
    return re.test(String(number));
  }
}

