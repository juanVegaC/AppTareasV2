export interface TabEstadoEditReq{
    id:number;
    tableroId:number;
    estadoId:number;
    posicion:number;
    poolAsigId:number;
    poolAsigTabId:number;
    poolAsigEdoId:number;
    asigAPuestoId:number;
    asigATabId:number;
    asigAEdoId:number;
    cierraAsig:boolean;
}