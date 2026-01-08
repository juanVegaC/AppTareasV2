export interface TareaAvanceCreateData{
    tareaId:number;
    texto:string;
    tareaNumero:string;
    tareaPuestoId:number;
    fecha:Date;
    fechaSTR:string;
    asigId:number;
    estatus:number;
    avance:number;
    actvHrs:number;
    actvMins:number;
    newPuestoId:number;
    ctrl_app_active: boolean;
}