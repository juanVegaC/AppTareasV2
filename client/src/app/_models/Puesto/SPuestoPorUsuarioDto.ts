export interface SPuestoPorUsuarioDto{
    usuarioId: number;
    usuario: string;
    nombre: string;
    empleadoId: number;
    puestoId: number;
    puestoTitulo: string;
    principal: boolean;
    puestoPropio:boolean;
    esPool:boolean;
    tableroId: number;
}