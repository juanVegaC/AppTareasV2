export interface PuestoEditReq{
    id:number;
    titulo:string;
    borrado:boolean;
    puestoSupId:number;
    publico:boolean;  
    ctrl_app_active:boolean;     
}