import { TareasPuestoTabDet } from "./TareasPuestoTabDet";

export interface TareasPuestoTabData{
    tabEstadoId:number;
    tableroId:number;
    estadoId:number;
    estado:string;
    posicion:number;
    poolAsigId:number;

    tareas:TareasPuestoTabDet[];

}