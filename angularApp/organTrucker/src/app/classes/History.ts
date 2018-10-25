import  {Value} from "./Value"

export class History{
    txId :string;
    value :Value;
    constructor( txId:string,value:Value ){
          this.txId=txId;
          this.value=value;
    }
    
}