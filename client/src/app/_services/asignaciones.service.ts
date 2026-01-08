import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AsignacionesDTareaReq } from '../_models/Asignacion/AsignacionesDTareaReq';
import { AsignacionesDTareaRes } from '../_models/Asignacion/AsignacionesDTareaRes';
import { UpdateAsignacionesPrioridad } from '../_models/Asignacion/AsigUpdPrioridad/UpdateAsignacionesPrioridad';
import { UpdateAsignacionesPriorResData } from '../_models/Asignacion/AsigUpdPrioridad/UpdateAsignacionesPriorResData';
import { UpdateAsignacionCloseReq } from '../_models/Asignacion/AsignacionClose/UpdateAsignacionCloseReq';
import { UpdateAsignacionCloseRes } from '../_models/Asignacion/AsignacionClose/UpdateAsignacionCloseRes';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAsigDeTarea(pParams: AsignacionesDTareaReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
     return this.http.get<AsignacionesDTareaRes[]>(this.baseUrl + 'asignaciones',{headers, params});

  }

    updateAsignacionesPrioridad(tarea: UpdateAsignacionesPrioridad){
      return this.http.put<UpdateAsignacionesPriorResData>(this.baseUrl + 'asignaciones', tarea);
    }



}
