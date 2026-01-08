import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PuestoTabGetAllReq } from '../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllReq';
import { PuestoTabGetAllRes } from '../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllRes';
import { PuestoTabCreateReq } from '../_models/PuestoTab/PuestoTabCreate/PuestoTabCreateReq';
import { TabEstadoCreateRes } from '../_models/TabEstado/TabEstadoCreate/TabEstadoCreateRes';
import { PuestoTabEditRes } from '../_models/PuestoTab/PuestoTabEdit/PuestoTabEditRes';
import { PuestoTabEditReq } from '../_models/PuestoTab/PuestoTabEdit/PuestoTabEditReq';

@Injectable({
  providedIn: 'root'
})
export class PuestoTabService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAll(pParams: PuestoTabGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<PuestoTabGetAllRes[]>(this.baseUrl + 'puestotab',{headers, params});
  }

   Create(puestoTab: PuestoTabCreateReq){
    return this.http.post<TabEstadoCreateRes>(this.baseUrl + 'puestotab',puestoTab);
  }

  Edit(puestoTab: PuestoTabEditReq){
    return this.http.put<PuestoTabEditRes>(this.baseUrl + 'puestotab',puestoTab);
  }

}
