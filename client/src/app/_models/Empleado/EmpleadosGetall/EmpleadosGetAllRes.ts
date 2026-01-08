export interface EmpleadosGetAllRes{
    id:number;
    validoDesde:Date;
    validoHasta:Date;
    borrado:boolean;
    userId:number;
    usuario_name:string;
    puestoId:number;
    puesto_titulo:string;
    principal:boolean;
}
