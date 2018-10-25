import { Component, OnInit } from '@angular/core';
import { dataservices } from '../services/dataservice'
import {UICarouselModule} from 'ui-carousel';

@Component({
  selector: 'app-agence-biometrie',
  templateUrl: './agence-biometrie.component.html',
  styleUrls: ['./agence-biometrie.component.css']
})
export class AgenceBiometrieComponent implements OnInit {
  array = []
  array1 = []
  tab=[]
  timestimps=[]
 trestant={
   NbHour:'',
   NbMin:'',
   NbSec:''
 }
  ref={
    Key:'',
    timestamp:''
  }
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

  Receiver1 = {
    key: '',
    Poids: ' ',
    Taille: ' ',
    GroupeABO: ' ',
    StatusVirologique: ' ',
    DegreDurgence: ' ',
    HLA: ' ',
    OrganDemande: ' ',
    State: '',
    DateAjout: '',
  }
  


  constructor(
    private dataS: dataservices,private uicaresel:UICarouselModule
  ) { }

  ngOnInit() {
    this.getAllOrgan()
    this.getAllReceiver()
    //this.calculeLifeSpan('444')
    this.matching()
   
  }

  getAllReceiver() {

    this.dataS.GetAllReceiver().subscribe(data => {
      let receiver

      for (var i = 0; i < Object.keys(data).length; i++) {
        parseInt(data[i].Key);
        //console.log(data[i])
        data[i].Record.Key = parseInt(data[i].Key);
        receiver = this.dataS.GetReceiver(data[i])
        data[i].Record.DateAjout = this.formaterDate(data[i].Record.DateAjout)
        
        this.array.push(data[i].Record);
      }

    });

  }

  getReceiver() {
    var id = ((document.getElementById("str") as HTMLInputElement).value);
    this.dataS.GetReceiver(id).subscribe(data => {

      this.Receiver1.Poids = data.Poids
      this.Receiver1.Taille = data.Taille
      this.Receiver1.GroupeABO = data.GroupeABO
      this.Receiver1.StatusVirologique = data.StatusVirologique
      this.Receiver1.DegreDurgence = data.DegreDurgence
      this.Receiver1.HLA = data.HLA
      this.Receiver1.OrganDemande = data.OrganDemande
      this.Receiver1.State = data.State
      this.Receiver1.DateAjout = this.formaterDate(data.DateAjout)



    })
    return this.Receiver1

  }
  addReceiver() {
    var key = ((document.getElementById("ID") as HTMLInputElement).value);
    var Poids = ((document.getElementById("Poids") as HTMLInputElement).value);
    var Taille = ((document.getElementById("Taille") as HTMLInputElement).value);
    var GroupeABO = ((document.getElementById("GroupeABO") as HTMLInputElement).value);
    var StatusVirologique = ((document.getElementById("StatusVirologique") as HTMLInputElement).value);
    var DegréDurgence = ((document.getElementById("DegréDurgence") as HTMLInputElement).value);
    var HLA = ((document.getElementById("HLA") as HTMLInputElement).value);
    var OrganDemande = ((document.getElementById("OrganDemande") as HTMLInputElement).value);
    this.dataS.AddReceiver(key, Poids, Taille, GroupeABO, StatusVirologique, DegréDurgence, HLA, OrganDemande).subscribe(data => {

    })
  }
  getAllOrgan() {

    this.dataS.GetAllOrgan().subscribe(data => {
      let organ2
      let timestamp
      
     
      for (var i = 0; i < Object.keys(data).length; i++) {
        this.array=[]
        parseInt(data[i].Key);
        data[i].Record.Key = parseInt(data[i].Key);
        organ2 = this.dataS.GetOrgan(data[i])
        data[i].Record.timestamp=this.formaterDate(data[i].Record.timestamp)
        this.array1.push(data[i].Record);    
        //this.dateDiff(new Date(),new Date(timestamp))    
        //setTimeout( () => { this.dateDiff(Date.now(),new Date(timestamp))}, 1000 );
        //console.log(data[i].Key)
      }
      
      //console.log(this.timestimps.length)
      
    });
  
  }

  getOrgan() {
    var id = ((document.getElementById("str1") as HTMLInputElement).value);
    this.dataS.GetOrgan(id).subscribe(data => {
      //this.organ1 = new organ(data.ID, data.HolderHospital, data.LifeSpan, data.type, data.used, this.formaterDate(data.timestamp), data.HLA, data.GroupeABO)


      this.organ1.HolderHospital=data.HolderHospital
       this.organ1.LifeSpan=data.LifeSpan
        this.organ1.Type=data.type
        this.organ1.Used=data.used 
        this.organ1.TimeStamp=this.formaterDate(data.timestamp) 
        this.organ1.HLA=data.HLA
        this.organ1.GroupeABO=data.GroupeABO
      //console.log(this.organ1)

    })
    return this.organ1

  }

  matching() {
    //console.log("MAtchiiiiiiiiiing")

    this.dataS.GetAllOrgan().subscribe(data => {
      this.dataS.GetAllReceiver().subscribe(data1 => {
        console.log(data1)
        console.log(data)
        for (var i = 0; i < Object.keys(data).length; i++) {
          for (var j = 0; j < Object.keys(data1).length; j++) {
            if (data[i].Record.HLA == data1[j].Record.HLA && data[i].Record.used == "Disponible" &&
              data1[j].Record.State == "En attente" && data[i].Record.type == data1[j].Record.OrganDemande &&
              data[i].Record.GroupeABO == data1[j].Record.GroupeABO) {
              var Oid = data[i].Key
              var Rid = data1[j].Key
              this.dataS.Organ_as_used(data[i].Key).subscribe(data2 => {
                console.log("Organ " + Oid + " state has changed")
              })
              this.dataS.Change_receiver_state(data1[j].Key).subscribe(data3 => {
                console.log("Receiver " + Rid + " state has changed")
              })
              //console.log("compatible")

            }
          }
        }

      })
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
    var myFormattedDate = year + "-" + (monthIndex + 1) + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return myFormattedDate
  }

  dateDiff(date2:any,date1:any){
    
    var tmp = date2 - date1;
    //console.log(date1)
    tmp = Math.floor(tmp/1000); 
    //this.Trestant.id=(this.timestimps[i]).toString()
    this.trestant.NbHour=(Math.trunc(tmp/3600)).toString()
    this.trestant.NbMin=(Math.trunc((tmp%86400)%3600/60)).toString()
    this.trestant. NbSec=(Math.trunc((tmp%86400)%3600%60)).toString()
     
    //console.log(this.trestant)
   // setTimeout( () => { this.dateDiff()}, 1000 ) 
    return this.trestant
 }
calculeLifeSpan(id:string){
  var timeNow  = new Date();
  var date1
  var Nbh
  
  this.dataS.GetOrgan(id).subscribe(data=>{
    //console.log(id)
      date1=this.formaterDate(data.timestamp);
      var LS=data.LifeSpan
      var date2=new Date(date1)
      Nbh=this.dateDiff(timeNow,date2).NbHour
      console.log(this.dateDiff(timeNow,date2))
      //var nbh1=Nbh.toString()
                if(Number (Nbh)==Number (LS)){
          //alert("L'organe "+id+" est perimé")  
      }     
  })
     setTimeout( () => { this.calculeLifeSpan(id)}, 1000 );    
 }


   

 

}
