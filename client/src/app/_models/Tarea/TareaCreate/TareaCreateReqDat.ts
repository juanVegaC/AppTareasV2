export interface TareaCreateReqDat{
    id: number;
    numero: string;
    texto: string;
    docuUrl: string;
    asignadoA:number;
    tableroId: number;
    ctrl_app_action: string;
    ctrl_app_active: boolean;
}