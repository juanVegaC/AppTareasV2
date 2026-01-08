import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EstadosGetAllRes } from '../_models/Estado/EstadosGetAll/EstadosGetAllRes';
import { EstadoCreateReq } from '../_models/Estado/EstadoCreate/EstadoCreateReq';
import { EstadoCreateRes } from '../_models/Estado/EstadoCreate/EstadoCreateRes';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAll(pParams: string){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
     return this.http.get<EstadosGetAllRes[]>(this.baseUrl + 'estados',{headers, params});

  }

    Create(estado: EstadoCreateReq){
      return this.http.post<EstadoCreateRes>(this.baseUrl + 'estados',estado);
    }

}
