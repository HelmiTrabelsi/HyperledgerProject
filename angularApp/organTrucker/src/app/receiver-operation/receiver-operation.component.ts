import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-receiver-operation',
  templateUrl: './receiver-operation.component.html',
  styleUrls: ['./receiver-operation.component.css']
})
export class ReceiverOperationComponent implements OnInit {
  Groupes = ['A+','A_','B_','B-','AB+','AB_','O+','O_'];
  Types = ['Coeur','Reins','Intestins','Poumans','Foie','Pancréas'];
  HLAs = ['HLA_A','HLA_B','HLA_C','HLA_DP','HLA_DQ','HLA_DR'];
  Virs=['Positive','Negative'];
  Degre=['1','2','3','4','5','6']
  constructor(
    private dataS: dataservices,private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  /*change_receiver_state(){
    var id= ((document.getElementById("ID") as HTMLInputElement).value);
    this.dataS.Change_receiver_state(id).subscribe(data=>{  
      this._flashMessagesService.show( 'changé avec succés',{cssClass :'alert-success',timeout:5000});
      setInterval(location.reload(), 2000)
    })
  }*/

  addReceiver(){
    var key= ((document.getElementById("key") as HTMLInputElement).value);
    var Poids= ((document.getElementById("Poids") as HTMLInputElement).value);
    var Taille= ((document.getElementById("Taille") as HTMLInputElement).value);
    var GroupeABO= ((document.getElementById("GroupeABO") as HTMLInputElement).value);
    var StatusVirologique= ((document.getElementById("StatusVirologique") as HTMLInputElement).value);
    var DegreDurgence= ((document.getElementById("DegreDurgence") as HTMLInputElement).value);
    var HLA= ((document.getElementById("HLA") as HTMLInputElement).value);
    var OrganDemande= ((document.getElementById("OrganDemande") as HTMLInputElement).value);
    this.dataS.AddReceiver(key, Poids, Taille, GroupeABO, StatusVirologique, DegreDurgence, HLA, OrganDemande).subscribe(data=>{
    })
    //setInterval(location.reload(), 2000)
    this._flashMessagesService.show( 'ajouté avec succés',{cssClass :'alert-success',timeout:10000});
    
   } 
}
