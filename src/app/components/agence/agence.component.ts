import { Component, OnInit } from '@angular/core';
import { AgencesService } from 'src/app/services/agences.service';
import { Agence } from 'src/app/models/agence';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: 'Actions',

      custom: [
        {
          name: 'ADD Agent',
          title: '<i class="fa fa-plus" aria-hidden="true"></i> Add Agent'
          
        }
       
      ],
      
    },
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
      adresse: {
        title: 'Adresse'
      },
      email: {
        title: 'Email'
      },
      fax: {
        title: 'Fax'
      },
      nom:{
        title: 'Nom'
      },
      telephone:{
        title: 'Telephone'
      },
      
    }
  };

  agences : Agence[]=[];
  loading$ = this.loader.loading$;
  constructor(private agenceService:AgencesService,private router:Router,public loader:LoadingService) { }

  ngOnInit(): void {
    this.getAgences();
 
  }

  getAgences(){
    this.agenceService.getAgence().subscribe(
      (response:Agence[]) =>{
        this.agences = response;
        console.log(response);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
      }
    );
  }
  onAddAgence(event){
    if(window.confirm("êtes-vous sur de vouloir creér cette agence ?")){
      if(event.newData.adresse===""||event.newData.fax===""||event.newData.email===""||event.newData.nom===""||event.newData.telephone===""){
        alert('un champ est invalide, verifiez vos données !!')
      }
      else if(this.validateEmail(event.newData.email)===false){
        alert('Champ email invalide !!! , verifiez vos données !!')
      }
      else if(this.validateNumber(event.newData.telephone)===false){
        alert('Champ téléphone invalide !!! , verifiez vos données !!')
      }
      else if(this.validateNumber(event.newData.fax)===false){
        alert('Champ téléphone invalide !!! , verifiez vos données !!')
      }
      else if(this.validateNumber(event.newData.telephone)===false && this.validateNumber(event.newData.telephone)===false){
        alert('Champ téléphone et email invalide !!! , verifiez vos données !!')
      }
      else{
    
      
        this.agenceService.addAgence(event.newData).subscribe(
          response => {
            console.log("Ajout : "+ response);
            this.getAgences();
          },
          (error:HttpErrorResponse) => {
            console.log(error);
            if(error.error.status === 409){
              alert('Conflict client déjà existant !!')
    
            }
            
            }
        );
      }
    }
  }

  onUpdateAgence(event){
    if(event.newData.adresse===""||event.newData.fax===""||event.newData.email===""||event.newData.nom===""||event.newData.telephone===""){
      alert('un champ est invalide, verifiez vos données !!')
    }
    else if(this.validateEmail(event.newData.email)===false){
      alert('Champ email invalide !!! , verifiez vos données !!')
    }
    else if(this.validateNumber(event.newData.telephone)===false){
      alert('Champ téléphone invalide !!! , verifiez vos données !!')
    }
    else if(this.validateNumber(event.newData.fax)===false){
      alert('Champ téléphone invalide !!! , verifiez vos données !!')
    }
    else if(this.validateNumber(event.newData.telephone)===false && this.validateNumber(event.newData.telephone)===false){
      alert('Champ téléphone et email invalide !!! , verifiez vos données !!')
    }
    else if(window.confirm("êtes-vous sur de vouloir modifier cette agence ?")){
      
      console.log(event.newData)
      this.agenceService.updateAgence(event.newData).subscribe(
        response => {
          console.log("Edit : " + response)
          this.getAgences();
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          
          }
      );
    }
    }
  onDeleteAgence(event){
    if(window.confirm("êtes-vous sur de vouloir supprimer cette agence ?")){
      console.log(event.data.id)
      this.agenceService.deleteAgence(event.data.id).subscribe(
        response =>{
          console.log ("Delete : " + response)
          this.getAgences();
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          
          }
      )
    }
  }

  onCustomAction(event:any):void{
    console.log(event);
    console.log('row selected: '+event.data.id);
    this.router.navigate(['/agent'],{ state: event.data });
    
  }
  onUserRowSelect(event:any):void{
    console.log(event);
    console.log('row selected: '+event.data.id);
    this.router.navigate(['/agent'],{ state: event.data });
    
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
