import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'

@Component({
  selector: 'app-send-organ',
  templateUrl: './send-organ.component.html',
  styleUrls: ['./send-organ.component.css']
})
export class SendOrganComponent implements OnInit {

  constructor(
    private dataS: dataservices,
  ) { }

  ngOnInit() {
  }

  send_organ(){
    var id= ((document.getElementById("ID") as HTMLInputElement).value);
    var hospital= ((document.getElementById("sendTo") as HTMLInputElement).value);
    this.dataS.Send_organ(id,hospital).subscribe(data=>{  
      alert("organ is send with trasaction Id "+ data)
      setInterval(location.reload(), 3000)
      
      }) 
    }

}
