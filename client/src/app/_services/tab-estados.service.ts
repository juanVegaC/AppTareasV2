import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TabEstadosGetAllReq } from '../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllReq';
import { TabEstadosGetAllRes } from '../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllRes';
import { TabEstadoCreateReq } from '../_models/TabEstado/TabEstadoCreate/TabEstadoCreateReq';
import { TabEstadoCreateRes } from '../_models/TabEstado/TabEstadoCreate/TabEstadoCreateRes';
import { TabEstadoEditReq } from '../_models/TabEstado/TabEstadoEdit/TabEstadoEditReq';
import { TabEstadoEditRes } from '../_models/TabEstado/TabEstadoEdit/TabEstadoEditRes';

@Injectable({
  providedIn: 'root'
})
export class TabEstadosService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAll(pParams: TabEstadosGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<TabEstadosGetAllRes[]>(this.baseUrl + 'tabestados',{headers, params});
  }

  Create(tabEstado: TabEstadoCreateReq){
    return this.http.post<TabEstadoCreateRes>(this.baseUrl + 'tabestados',tabEstado);
  }

  Edit(tabEstado: TabEstadoEditReq){
    return this.http.put<TabEstadoEditRes>(this.baseUrl + 'tabestados',tabEstado);
  }


}
