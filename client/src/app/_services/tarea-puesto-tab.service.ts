import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TareasPuestoTabGetReq } from '../_models/TareasPuestoTab/TareasPuestoTabGet/TareasPuestoTabGetReq';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TareasPuestoTabGetRes } from '../_models/TareasPuestoTab/TareasPuestoTabGet/TareasPuestoTabGetRes';
import { TareasPuestoTabMoveRes } from '../_models/TareasPuestoTab/TareasPuestoTabMove/TareasPuestoTabMoveRes';
import { TareasPuestoTabMoveReq } from '../_models/TareasPuestoTab/TareasPuestoTabMove/TareasPuestoTabMoveReq';

@Injectable({
  providedIn: 'root'
})
export class TareaPuestoTabService {


  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  get(pParams: TareasPuestoTabGetReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<TareasPuestoTabGetRes[]>(this.baseUrl + 'tareaspuestotab',{headers, params});
  }

/*    Create(puestoTab: PuestoTabCreateReq){
    return this.http.post<TabEstadoCreateRes>(this.baseUrl + 'puestotab',puestoTab);
  }*/

  Move(tarea: TareasPuestoTabMoveReq){
    return this.http.put<TareasPuestoTabMoveRes>(this.baseUrl + 'tareaspuestotab',tarea);
  } 
}
