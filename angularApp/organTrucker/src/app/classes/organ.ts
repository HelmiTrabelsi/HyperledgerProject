

export class organ{
    ID:string;
    HolderHospital:string;
    LifeSpan:number ;
    Type:string;
    Used:boolean;
    TimeStamp:Date;
    HLA:string
    GroupeABO:string
    constructor( ID:string,HolderHospital:string,LifeSpan:number ,Type:string,Used:boolean,TimeStamp:Date,HLA:string,GroupeABO:string){
          this.ID=ID;
          this.HolderHospital=HolderHospital,
          this.LifeSpan=LifeSpan;
          this.Type=Type;
          this.Used=Used;
          this.TimeStamp=TimeStamp;
          this.HLA=HLA;
          this.GroupeABO=GroupeABO;
    }
    
}