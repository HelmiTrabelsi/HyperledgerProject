import {Injectable} from '@angular/core'
//import { Http } from '@angular/http'
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router'
import { Observable } from 'rxjs';
import { organ } from '../classes/organ';







@Injectable()


export class dataservices{

    constructor(
        private http:HttpClient     
       // private router:Router,
       
    ){}
    GetAllOrgan( ):any {
     
        return this.http.get("http://localhost:3000/get_all_tuna/")
       
        
     };
     GetOrgan( id:string ):any {
        return this.http.get("http://localhost:3000/get_tuna/"+ id)
       
        
     };
     GetHistory( id:string ):any {
        return this.http.get("http://localhost:3000/get_history/"+ id)
       
        
     };
     AddOrgan(key:string, HolderHospital:string, LifeSpan:string, Type:string,HLA:string,GroupeABO:string):any {
        
       var url
       url= key+"-"+HolderHospital+"-"+LifeSpan+"-"+Type+"-"+HLA+"-"+GroupeABO ; 
       return this.http.get("http://localhost:3000/add_tuna/"+url )
       
      
        
     };
     Organ_as_used( id:string ):any {
        return this.http.get("http://localhost:3000/organ_as_used/"+ id)
       
        
     };
     Send_organ( id:string, hospital: string ):any {
        return this.http.get("http://localhost:3000/change_holder/"+ id+"-"+hospital)
       
        
     };

     GetAllReceiver( ):any {
        return this.http.get("http://localhost:3000/get_all_receiver")
       
        
     };
     GetReceiver( id:string ):any {
        return this.http.get("http://localhost:3000/get_receiver/"+ id)
       
        
     };
    
     AddReceiver(key:string, Poids:string, Taille:string, GroupeABO:string, StatusVirologique:string, DegréDurgence:string, HLA:string, OrganDemande:string):any {
        
        var url
        url= key+"-"+Poids+"-"+Taille+"-"+GroupeABO+"-"+StatusVirologique+"-"+DegréDurgence+"-"+HLA+"-"+OrganDemande; 
        return this.http.get("http://localhost:3000/add_receiver/"+url )

      };
     
      Change_receiver_state( id:string ):any {
        return this.http.get("http://localhost:3000/change_receiver_state/"+ id)
       
        
     };
     AddHospital(HospitalName:string, Password:string, City:string):any {
        
      var url
      url= HospitalName+"-"+Password+"-"+City; 
      return this.http.get("http://localhost:3000/add_hospital/"+url )

    };
    GetHospital( id:string ):any {
      return this.http.get("http://localhost:3000/get_hospital/"+ id)   
   };

   AddAB(ABName:string, Password:string):any {
        
    var url
    url= ABName+"-"+Password; 
    return this.http.get("http://localhost:3000/add_AB/"+url )

  };

  GetAB( id:string ):any {
    return this.http.get("http://localhost:3000/get_AB/"+ id)   
 };
    }
 
    