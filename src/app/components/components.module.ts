import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AgentComponent } from './agent/agent.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AllagentComponent } from './allagent/allagent.component';
import { AgenceComponent } from './agence/agence.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from '../services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,Ng2SmartTableModule,MatProgressSpinnerModule,FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, AgentComponent, AllagentComponent, AgenceComponent,LoginComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
})

export class ComponentsModule {}
