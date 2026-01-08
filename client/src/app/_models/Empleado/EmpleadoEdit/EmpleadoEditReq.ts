export interface EmpleadoEditReq{
    id:number;
    userId:number;
    puestoId:number;
    principal:boolean;
    validoDesde:Date;
    validoHasta:Date;
    validoDesdeStr:string;
    validoHastaStr:string; 
    borrado:boolean;   
}