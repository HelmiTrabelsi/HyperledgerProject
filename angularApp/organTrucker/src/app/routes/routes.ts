
import { ReceiverComponent } from '../receiver/receiver.component';
import { HospitalComponent } from '../hospital/hospital.component';
import { AddOrganComponent } from '../add-organ/add-organ.component';
import { SendOrganComponent } from '../send-organ/send-organ.component';
import { AgenceBiometrieComponent } from '../agence-biometrie/agence-biometrie.component';
import { OrganOperationComponent } from '../organ-operation/organ-operation.component';
import { ReceiverOperationComponent } from '../receiver-operation/receiver-operation.component';
import { LoginComponent } from '../login/login.component';
import { AddHospitalComponent } from '../add-hospital/add-hospital.component';
import { AddABComponent } from '../add-ab/add-ab.component';




export const ROUTES=[


  {
    path : 'receiver',
    component : ReceiverComponent
  },
  {
    path : 'Hospital',
    component : HospitalComponent
  },
  {
    path : 'addOrgan',
    component : AddOrganComponent
  },
  {
    path : 'sendOrgan',
    component : SendOrganComponent
  },
  {
    path : 'agenceBiometrie',
    component : AgenceBiometrieComponent
  },
  {
    path : 'organOperation',
    component : OrganOperationComponent
  },
  {
    path : 'receiverOperation',
    component : ReceiverOperationComponent
  },
  {
    path : 'Login',
    component : LoginComponent
  },
  {
    path : 'addHospital',
    component : AddHospitalComponent
  },
  {
    path : 'addAB',
    component : AddABComponent
  },

 
]
