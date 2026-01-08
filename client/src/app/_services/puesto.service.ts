import { Injectable } from '@angular/core';
import { SPuestoPorUsuarioDto } from '../_models/Puesto/SPuestoPorUsuarioDto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PuestosGetParams } from '../_models/Puesto/PuestosGetParams';
import { PuestosGetAllRes } from '../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { PuestosGetAllReq } from '../_models/Puesto/PuestosGetAll/PuestosGetAllReq';
import { PuestoEditReq } from '../_models/Puesto/PuestoEdit/PuestoEditReq';
import { PuestoEditRes } from '../_models/Puesto/PuestoEdit/PuestoEditRes';
import { PuestoCreateReq } from '../_models/Puesto/PuestoCreate/PuestoCreateReq';
import { PuestoCreateRes } from '../_models/Puesto/PuestoCreate/PuestoCreateRes';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getPuestosPorUsuario(pParams: PuestosGetParams){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
/*     return this.http.get<SPuestoPorUsuarioDto[]>(this.baseUrl + 'puestos/' + usuarioId);
 */    return this.http.get<SPuestoPorUsuarioDto[]>(this.baseUrl + 'puestos',{headers, params});

  }

  getPuestos(pParams: PuestosGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<PuestosGetAllRes[]>(this.baseUrl + 'puestos',{headers, params});
  }

  puestoEdit(puesto: PuestoEditReq){
    return this.http.put<PuestoEditRes>(this.baseUrl + 'puestos',puesto);
  }
  
  puestoCreate(puesto: PuestoCreateReq){
    return this.http.post<PuestoCreateRes>(this.baseUrl + 'puestos',puesto);
  }

  getPuestosParaTarea(tareaId: number){
         return this.http.get<SPuestoPorUsuarioDto[]>(this.baseUrl + 'puestos/' + tareaId);
        //return this.http.get<SPuestoPorUsuarioDto[]>(this.baseUrl + 'puestos');
    
      }
    
}
