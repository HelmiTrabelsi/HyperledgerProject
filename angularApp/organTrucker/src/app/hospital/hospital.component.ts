import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice';
import {UICarouselModule} from 'ui-carousel';



@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  array = []
  organ1={
    ID:'',
    HolderHospital:'',
    LifeSpan:'' ,
    Type:'',
    Used:'',
    TimeStamp:'',
    HLA:'',
    GroupeABO:''
}
  constructor(
    private dataS: dataservices,private UICarousel:UICarouselModule
  ) { }

  ngOnInit() {

    this.getAllOrgan() 
     
  }


  getAllOrgan(){
    
    this.dataS.GetAllOrgan().subscribe(data=>{
     let organ2
      for (var i = 0; i < Object.keys(data).length   ; i++){
        parseInt(data[i].Key);
        data[i].Record.Key = parseInt(data[i].Key);
        organ2=this.dataS.GetOrgan(data[i])
        data[i].Record.timestamp = this.formaterDate(data[i].Record.timestamp)
        this.array.push(data[i].Record);
        //console.log(data[i].Key)
      }
      
//console.log(this.array  )

    }); 

}

  getOrgan(){
    var id= ((document.getElementById("str") as HTMLInputElement).value);
     this.dataS.GetOrgan(id).subscribe(data=>{
     //organ1=new organ(data.ID ,data.HolderHospital,data.LifeSpan,data.type,data.used,data.timestamp )
     
        
      this.organ1.HolderHospital=data.HolderHospital
      this.organ1.LifeSpan=data.LifeSpan
      this.organ1.Type=data.type
      this.organ1.Used=data.used 
      this.organ1.TimeStamp=data.timestamp
      this.organ1.HLA=data.HLA
      this.organ1.GroupeABO=data.GroupeABO   
     //console.log(this.organ1)
     
    })
    return this.organ1
   
  }
  
  formaterDate(dates: string): any {
    var date = new Date(dates); // had to remove the colon (:) after the T in order to make it work
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var myFormattedDate = day + "-" + (monthIndex + 1) + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
    return myFormattedDate
  }
}
