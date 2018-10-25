import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {
  array = []
  receiver={
    CIN:' ',
    DateAjout:' ',
    DegreDurgence:' ',
    GroupeABO:' ',
    HLA:' ',
    organDemande:' ',
    Poids:' ',
    StatusVirologique:' ',
    Taille:' ',
}

  constructor(
    private dataS: dataservices,
  ) { }

  ngOnInit() {
    this.getAllReceiver()
  }
  getAllReceiver(){
    
    this.dataS.GetAllReceiver().subscribe(data=>{

     
      let receiver
      for (var i = 0; i < Object.keys(data).length   ; i++){
        parseInt(data[i].Key);
        data[i].Record.Key = parseInt(data[i].Key);
        receiver=this.dataS.GetReceiver(data[i])
        console.log(receiver)
        this.array.push(data[i].Record);
      }
console.log(this.array)

    }); 

}

getreceiver(){
  var id= ((document.getElementById("str1") as HTMLInputElement).value);
  this.dataS.GetReceiver(id).subscribe(data=>{
     //receiver=new receiver(data.ID ,data.HolderHospital,data.LifeSpan,data.type,data.used,data.timestamp )
      this.receiver.CIN= data.CIN    
      this.receiver.DateAjout=data.DateAjout
      this.receiver.DegreDurgence=data.DegréDurgence
      this.receiver.GroupeABO=data.GroupeABO
      this.receiver.HLA=data.HLA 
      this.receiver.organDemande=data.organDemande
      this.receiver.Poids=data.Poids
      this.receiver.StatusVirologique=data.StatusVirologique
      this.receiver.Taille=data.Taille
      
     console.log(this.receiver)
     
    })
    return this.receiver
   
  }
}
