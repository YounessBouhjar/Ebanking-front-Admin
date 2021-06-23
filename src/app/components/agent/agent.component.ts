import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { AgentsService } from 'src/app/services/agents.service';
import { Agent } from 'src/app/models/agent';
import { Agence } from 'src/app/models/agence';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';

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
  agenceNom:string=sessionStorage.getItem("agenceNom")
  loading$ = this.loader.loading$;
  constructor(private agentService:AgentsService, private router :Router,public loader:LoadingService) { 
    this.agence=this.router.getCurrentNavigation().extras.state;
  }
  
  ngOnInit(): void {
    this.getAgents();
  }

  getAgents(){
    this.agentService.getAgent(parseInt(sessionStorage.getItem("agence"))).subscribe(
      (response : Agent[])=>{
        this.agents=response;
        console.log(response);
      },
      (error:HttpErrorResponse) => {
        if(error.error.status==404){
          this.agents=[];
        }
        console.log(error.message);
      }
    );

}
alert:boolean=false;
alertEmail:boolean=false;
alertPhone:boolean=false;
  onAddAgent(event){
    Swal.fire({
      title: 'Do you want to add this agent ?',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
     
    }).then((valeur)=>{
      if(valeur.isConfirmed){
      if(event.newData.adresse===""||event.newData.cin===""||event.newData.email===""||event.newData.nom===""||event.newData.telephone===""||event.newData.prenom===""||event.newData.username===""||event.newData.password===""){
        this.alert=true
      }
      else if(this.validateEmail(event.newData.email)===false){
       this.alertEmail=true
      }
      else if(this.validateNumber(event.newData.telephone)===false){
        this.alertPhone=true;
      }
      else{
        this.alert=false;
        this.alertEmail=false;
        this.alertPhone=false;
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
  })
  }

  onUpdateAgent(event){
    Swal.fire({
      title: 'Do you want to edit this agent ?',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
     
    }).then((valeur)=>{
      if(valeur.isConfirmed){
    if(event.newData.adresse===""||event.newData.cin===""||event.newData.email===""||event.newData.nom===""||event.newData.telephone===""||event.newData.prenom===""||event.newData.username===""||event.newData.password===""){
      this.alert=true
    }
    else if(this.validateEmail(event.newData.email)===false){
     
      this.alertEmail=true
    }
    else if(this.validateNumber(event.newData.telephone)===false){
    
      this.alertPhone=true
    }
    else{
        this.alert=false;
        this.alertEmail=false;
        this.alertPhone=false;
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
})
  }

  onDeleteAgent(event){
     Swal.fire({
      title: 'Do you want to delete agent: '+event.data.nom+' '+event.data.prenom+' ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.agentService.deleteAgent(event.data.id).subscribe(
        response => {
          Swal.fire(
            'Deleted!',
            'Your client has been deleted.',
            'success'
          )
          console.log("delete : "+ response);
          this.getAgents();
        },
        (error:HttpErrorResponse) => {
          Swal.fire(
            'Deleted!',
            'Please delete clients related to this agent.',
            'error'
          )
          console.log(error);
          
          }
      )
    }
  })
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

