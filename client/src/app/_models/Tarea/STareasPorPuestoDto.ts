export interface STareasPorPuestoDto{
    id: number;
    numero: string;
    texto: string;
    docuUrl: string;
    puestoId:number;
    asigId: number;
    prioridad:number;
    asignadoA:number;
    asignadoFe:Date;
    asignadoANombre:string;
    asignadoAPuesto:string;
    prioridadPuesto:number;
    avancePuesto:number;
    asigIdPuesto:number;
    puestoIdPuesto:number;
    estatus:number;
    estatusTxt:string;
/*     asigName:string;
    creaName:string; 
    asigCount:number;
    */    
    avance:number;
    asigCount:number;
    miTarea:boolean;
    miAsignacion:boolean;
    prioridadNew:number;
    prioridadPrev:number;
    optPrioridades:Array<number>;

}