import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {dataservices} from './services/dataservice'
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router'
import {ROUTES} from './routes/routes'
import {HttpModule} from '@angular/http';
import { HttpHeaders,HttpClient,HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ReceiverComponent } from './receiver/receiver.component';
import { HospitalComponent } from './hospital/hospital.component';
import { FormsModule }   from '@angular/forms';
import { AddOrganComponent } from './add-organ/add-organ.component';
import { SendOrganComponent } from './send-organ/send-organ.component';
import { AgenceBiometrieComponent } from './agence-biometrie/agence-biometrie.component';
import { OrganOperationComponent } from './organ-operation/organ-operation.component';
import { ReceiverOperationComponent } from './receiver-operation/receiver-operation.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UICarouselModule} from 'ui-carousel';
import { ModalComponent } from './_directives';
import { ModalService } from './_services';
import { LoginComponent } from './login/login.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { AlertsModule } from 'angular-alert-module';
import { AddABComponent } from './add-ab/add-ab.component';



@NgModule({
  declarations: [
    AppComponent,
    ReceiverComponent,
    HospitalComponent,
    AddOrganComponent,
    SendOrganComponent,
    AgenceBiometrieComponent,
    OrganOperationComponent,
    ReceiverOperationComponent,
    ModalComponent,
    LoginComponent,
    AddHospitalComponent,
    AddABComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    HttpClientModule,
    FormsModule ,
    FlashMessagesModule.forRoot(),
    UICarouselModule,
    AlertsModule.forRoot()
   
   
  ],
  providers: [dataservices,ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
