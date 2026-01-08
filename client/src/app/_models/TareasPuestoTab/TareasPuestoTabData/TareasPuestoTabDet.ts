export interface TareasPuestoTabDet {
    tareaId: number;
    numero: string;
    texto: string;
    asigId: number;
    puestoId: number;
    tableroId: number;
    estadoId: number;
    estado: string;
    estadoPos: number;
    prioridad: number;
    avance: number;
    edoDias: number;
    edoHoras: number;
    edoMinutos: number;
    actvHoras: number;
    actvMinutos: number;
    asignadoAUsrId: number;
    asignadoANombre: string;
    tipoAsig: number;

    otrasAsig: Array<TareasPuestoTabDet>
    
}
