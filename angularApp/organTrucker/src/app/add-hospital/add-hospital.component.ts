import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'
import { Router } from "@angular/router";


@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  powers = ['Nabeul','Tunis','Mednine','Zaghouan','Sfax','Sousse','Kairouan','Bizerte','Gabes','Ariana','Gafsa','Monastir'
,'Gafsa','Nabeul','Tataouine','Béja','Kef','Jendouba','Tozeur'];
  
  constructor(private dataS: dataservices,private router: Router) { }

  ngOnInit() {
  }
addHospital(){
  var HospitalName= ((document.getElementById("ID") as HTMLInputElement).value);
  var Password= ((document.getElementById("HolderHospital") as HTMLInputElement).value);
  var City= ((document.getElementById("GroupeABO") as HTMLInputElement).value);
  this.dataS.AddHospital(HospitalName, Password, City).subscribe(
    this.router.navigate(['/Hospital'])
  )
}
}
