import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'
import { AlertsService } from 'angular-alert-module';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataS: dataservices,private alerts: AlertsService,private router: Router) { }

  ngOnInit() {
    this.alerts.setMessage('All the fields are required','error');
    this.alerts.setMessage('Configurations saved successfully!','success');
    this.alerts.setMessage('Please save all the changes before closing','warn');
  
  }

  getHospital(){
    var id= ((document.getElementById("ID") as HTMLInputElement).value);
    var HolderHospital= ((document.getElementById("HolderHospital") as HTMLInputElement).value);
    this.dataS.GetHospital(id).subscribe(data=>{

      if (HolderHospital==data.Password){
        this.router.navigate(['/Hospital'])
      } 
      else {this.alerts.setMessage('Mot de passe érroné','warn')}  
    
    }, 
    err => {
        // Log errors if any
        console.log(err);
        this.alerts.setDefaults('timeout',0);
        this.alerts.setMessage("Nom d'Hopital introuvable",'error');
        //console.log("Nom d'Hopital introuvable")
    });
  
  }

  getAgence(){
    var id= ((document.getElementById("ID1") as HTMLInputElement).value);
    var HolderHospital= ((document.getElementById("HolderHospital1") as HTMLInputElement).value);
    this.dataS.GetAB(id).subscribe(data=>{

      if (HolderHospital==data.Password){
        this.router.navigate(['/agenceBiometrie'])
      } 
      else {this.alerts.setMessage('Mot de passe érroné','warn')}  
    
    }, 
    err => {
        // Log errors if any
        console.log(err);
        this.alerts.setDefaults('timeout',0);
        this.alerts.setMessage("Nom de l'agence introuvable",'error');
        //console.log("Nom d'Hopital introuvable")
    });
  
  }

}
