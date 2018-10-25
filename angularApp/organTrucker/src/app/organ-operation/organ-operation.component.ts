import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'
import { ngControlStatusHost } from '@angular/forms/src/directives/ng_control_status';
import {Value}  from "../classes/Value"
import {History}from "../classes/History"
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-organ-operation',
  templateUrl: './organ-operation.component.html',
  styleUrls: ['./organ-operation.component.css']
})
export class OrganOperationComponent implements OnInit {
  array = []
  constructor(
    private dataS: dataservices,private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }
change_organ_state(){
  var id= ((document.getElementById("ID") as HTMLInputElement).value);
  this.dataS.Organ_as_used(id).subscribe(data=>{  
    this._flashMessagesService.show( 'changé avec succés',{cssClass :'alert-success',timeout:5000});
    setInterval(location.reload(),2000)
  })
}

get_history(){
  var id1= ((document.getElementById("ID1") as HTMLInputElement).value);
   
 
     
      this.dataS.GetHistory(id1).subscribe(data=>{

        this.array.length=0
        console.log(data)
        for (var i = 0; i < Object.keys(data).length   ; i++){  
        var value = new Value (data[i].value.HolderHospital,data[i].value.LifeSpan,data[i].value.type,data[i].value.used,this.formaterDate(data[i].value.timestamp)) 
        var History1= new History(data[i].txId,value)
        this.array[i]=History1;
    }
    
    console.log(this.array)
 })
}
formaterDate(dates: string): any {
  var date = new Date(dates); // had to remove the colon (:) after the T in order to make it work
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  var seconds = date.getSeconds();
  var myFormattedDate = day + "-" + (monthIndex + 1) + "-" + year + "/" + hours + ":" + minutes + ":" + seconds;
  return myFormattedDate
}
}
