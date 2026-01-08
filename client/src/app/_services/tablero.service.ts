import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TableroCreateReq } from '../_models/Tableros/TableroCreate/TableroCreateReq';
import { TableroCreateRes } from '../_models/Tableros/TableroCreate/TableroCreateRes';
import { TablerosGetAllReq } from '../_models/Tableros/TablerosGetAll/TablerosGetAllReq';
import { TablerosGetAllRes } from '../_models/Tableros/TablerosGetAll/TablerosGetAllRes';
import { TableroEditReq } from '../_models/Tableros/TableroEdit/TableroEditReq';
import { TableroEditRes } from '../_models/Tableros/TableroEdit/TableroEditRes';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAll(pParams: TablerosGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<TablerosGetAllRes[]>(this.baseUrl + 'tableros',{headers, params});
  }

  Create(tablero: TableroCreateReq){
    return this.http.post<TableroCreateRes>(this.baseUrl + 'tableros',tablero);
  }

  Edit(tablero: TableroEditReq){
    return this.http.put<TableroEditRes>(this.baseUrl + 'tableros',tablero);
  }


}
