export interface UsuarioEditReq{
    id:number;
    name:string;
    userName:string;
    password:string;  
    admin:boolean;
    locked:boolean;
    ctrl_app_active:boolean; 
}