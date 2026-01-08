export interface AsignacionesDTareaRes{
    id:number;
    tareaId:number;
    avance:number;
    tiempoAsig: number;
    prioridad:number;
    creadoFe:Date;
    estatus:number;
    fechaAsig
    estatusTxt:string;
    nombreUsuario:string;
    puestoId:number;
    puestoTitulo:string;
    puestoEsPool:boolean;
}