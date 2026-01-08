import { Injectable } from '@angular/core';
import { getPaginatedResults, getPaginationHeaders } from '../_helpers/paginationHelper';
import { TareaData } from '../_models/TareaData';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeleteTareaData } from '../_models/Tarea/TareaDelete/DeleteTareaDto';
import { STareasPorPuestoDto } from '../_models/Tarea/STareasPorPuestoDto';
import { UpdateTareaPrioridad } from '../_models/Tarea/UpdateTareaPrioridad';
import { AsignarTareaData } from '../_models/Tarea/TareaAsigna/AsignarTareaData';
import { AsignarTareaResData } from '../_models/Tarea/TareaAsigna/AsignarTareaResData';
import { UpdateTareaPriorResData } from '../_models/Tarea/UpdateTareaPriorResData';
import { DesAsignarTareaResData } from '../_models/Tarea/TareaDesAsigna/DesAsignarTareaResData';
import { TareaEditReqDat } from '../_models/Tarea/TareaEdit/TareaEditReqDat';
import { TareaEditResDat } from '../_models/Tarea/TareaEdit/TareaEditResDat';
import { TareaCreateReqDat } from '../_models/Tarea/TareaCreate/TareaCreateReqDat';
import { TareaCreateResDat } from '../_models/Tarea/TareaCreate/TareaCreateResDat';
import { DeleteTareaResData } from '../_models/Tarea/TareaDelete/DeleteTareaResData';
import { DesAsignarTareaReqData } from '../_models/Tarea/TareaDesAsigna/DesAsignarTareaReqData';

@Injectable({
  providedIn: 'root'
})

export class TareaService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTareas(pageNumber, pageSize, filterResult){
    let params = getPaginationHeaders(pageNumber, pageSize, filterResult);
    return getPaginatedResults<STareasPorPuestoDto[]>(this.baseUrl + 'tareas', params, this.http);
  }

  saveTarea(tarea: TareaCreateReqDat){
    return this.http.post<TareaCreateResDat>(this.baseUrl + 'tareas', tarea);
  }

  updateTarea(tarea: TareaEditReqDat){
    return this.http.put<TareaEditResDat>(this.baseUrl + 'tareas', tarea);
  }

  updateTareaPrioridad(tarea: UpdateTareaPrioridad){
    return this.http.put<UpdateTareaPriorResData>(this.baseUrl + 'tareas', tarea);
  }
  
  deleteTarea(tarea: DeleteTareaData){
    return this.http.put<DeleteTareaResData>(this.baseUrl + 'tareas', tarea);
  }
  desasignaTarea(tarea: DesAsignarTareaReqData){
    return this.http.put<DesAsignarTareaResData>(this.baseUrl + 'tareas', tarea);
  }

  asignarTarea(tarea: AsignarTareaData){
    return this.http.put<AsignarTareaResData>(this.baseUrl + 'tareas', tarea);
  }

}
