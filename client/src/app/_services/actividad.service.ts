import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TareaAvanceCreateData } from '../_models/Tarea/TareaAvance/TareaAvanceCreateData';
import { TareaAvanceCreateResData } from '../_models/Tarea/TareaAvance/TareaAvanceCreateResData';
import { ActvPorAsigGetRes } from '../_models/Actividad/ActvPorAsigGet/ActvPorAsigGetRes';
import { ActvPorAsigGetReq } from '../_models/Actividad/ActvPorAsigGet/ActvPorAsigGetReq';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  saveAvance(avance: TareaAvanceCreateData){
    return this.http.post<TareaAvanceCreateResData>(this.baseUrl + 'actividades', avance);
  }

  getActvDeAsig(pParams: ActvPorAsigGetReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
     return this.http.get<ActvPorAsigGetRes[]>(this.baseUrl + 'actividades',{headers, params});
  }

}
