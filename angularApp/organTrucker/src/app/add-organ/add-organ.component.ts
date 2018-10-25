import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {dataservices} from '../services/dataservice'
import { FlashMessagesService } from 'angular2-flash-messages';





@Component({
  selector: 'app-add-organ',
  templateUrl: './add-organ.component.html',
  styleUrls: ['./add-organ.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddOrganComponent implements OnInit {
  powers = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  Types = ['Coeur','Reins','Intestins','Poumans','Foie','Pancréas'];
  HLAs = ['HLA_A','HLA_B','HLA_C','HLA_DP','HLA_DQ','HLA_DR'];
  closeResult: string;


  constructor(
    private dataS: dataservices, private _flashMessagesService: FlashMessagesService,) { }

  ngOnInit() {
    
  }

  addOrgan(){
    var ID= ((document.getElementById("ID") as HTMLInputElement).value);
    var HolderHospital= ((document.getElementById("HolderHospital") as HTMLInputElement).value);
    var LifeSpan= ((document.getElementById("LifeSpan") as HTMLInputElement).value);
    var Type= ((document.getElementById("Type") as HTMLInputElement).value);
    var HLA= ((document.getElementById("HLA") as HTMLInputElement).value);
    var GroupeABO= ((document.getElementById("GroupeABO") as HTMLInputElement).value);
    this.dataS.AddOrgan(ID,HolderHospital,LifeSpan,Type,HLA,GroupeABO).subscribe(data=>{
    })
    this._flashMessagesService.show( 'Ajouté avec succés',{cssClass :'alert-success',timeout:5000});
    
    setInterval(location.reload(), 1000)
   }  





}
