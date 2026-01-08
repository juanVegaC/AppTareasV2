export interface TextoEditReq{
    id:number;
    textoId:number;
    idioma:string;
    texto:string;   
    borrado:boolean;   
    ctrl_app_active:boolean; 
}