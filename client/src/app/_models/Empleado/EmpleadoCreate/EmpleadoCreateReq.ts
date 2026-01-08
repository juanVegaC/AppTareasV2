export interface EmpleadoCreateReq{
    userId:number;
    puestoId:number;
    principal:boolean;
    validoDesde:Date;
    validoHasta:Date;
    validoDesdeStr:string;
    validoHastaStr:string;    
}