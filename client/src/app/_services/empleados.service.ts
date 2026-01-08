import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmpleadosGetAllReq } from '../_models/Empleado/EmpleadosGetall/EmpleadosGetAllReq';
import { EmpleadosGetAllRes } from '../_models/Empleado/EmpleadosGetall/EmpleadosGetAllRes';
import { EmpleadoCreateReq } from '../_models/Empleado/EmpleadoCreate/EmpleadoCreateReq';
import { EmpleadoCreateRes } from '../_models/Empleado/EmpleadoCreate/EmpleadoCreateRes';
import { EmpleadoEditReq } from '../_models/Empleado/EmpleadoEdit/EmpleadoEditReq';
import { EmpleadoEditRes } from '../_models/Empleado/EmpleadoEdit/EmpleadoEditRes';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  getEmpleados(pParams: EmpleadosGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<EmpleadosGetAllRes[]>(this.baseUrl + 'empleados',{headers, params});
  }

  empleadoCreate(empleado: EmpleadoCreateReq){
    return this.http.post<EmpleadoCreateRes>(this.baseUrl + 'empleados',empleado);
  }
  empleadoEdit(empleado: EmpleadoEditReq){
    return this.http.put<EmpleadoEditRes>(this.baseUrl + 'empleados',empleado);
  }


}
