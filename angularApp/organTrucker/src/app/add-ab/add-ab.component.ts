import { Component, OnInit } from '@angular/core';
import {dataservices} from '../services/dataservice'
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-ab',
  templateUrl: './add-ab.component.html',
  styleUrls: ['./add-ab.component.css']
})
export class AddABComponent implements OnInit {

  constructor(private dataS: dataservices,private router: Router) { }

  ngOnInit() {
  }

  addAB(){
    var HospitalName= ((document.getElementById("ID2") as HTMLInputElement).value);
    var Password= ((document.getElementById("HolderHospital2") as HTMLInputElement).value);
    this.dataS.AddAB(HospitalName, Password).subscribe(
      this.router.navigate(['/agenceBiometrie'])
    )
  }

}
