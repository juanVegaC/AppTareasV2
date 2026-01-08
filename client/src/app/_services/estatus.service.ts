import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EstatusGetParams } from '../_models/Estatus/EstatusGetParams';
import { SEstatusParaAsigDto } from '../_models/Estatus/SEstatusParaAsigDto';
import { EstatusGetAllReq } from '../_models/Estatus/EstatusGetAll/EstatusGetAllReq';
import { EstatusGetAllRes } from '../_models/Estatus/EstatusGetAll/EstatusGetAllRes';
import { EstatusCreateReq } from '../_models/Estatus/EstatusCreate/EstatusCreateReq';
import { EstatusCreateRes } from '../_models/Estatus/EstatusCreate/EstatusCreateRes';
import { EstatusEditReq } from '../_models/Estatus/EstatusEdit/EstatusEditReq';
import { EstatusEditRes } from '../_models/Estatus/EstatusEdit/EstatusEditRes';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getEstatus(pParams: EstatusGetParams){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
     return this.http.get<SEstatusParaAsigDto[]>(this.baseUrl + 'estatus',{headers, params});

  }

  getCatEstatus(pParams: EstatusGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
     return this.http.get<EstatusGetAllRes[]>(this.baseUrl + 'estatus',{headers, params});

  }

  estatusCreate(estatus: EstatusCreateReq){
    return this.http.post<EstatusCreateRes>(this.baseUrl + 'estatus',estatus);
  }

  estatusEdit(texto: EstatusEditReq){
    return this.http.put<EstatusEditRes>(this.baseUrl + 'estatus',texto);
  }


}
