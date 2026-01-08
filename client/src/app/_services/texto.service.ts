import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TextosGetAllReq } from '../_models/Textos/TextosGetAll/TextosGetAllReq';
import { TextosGetAllRes } from '../_models/Textos/TextosGetAll/TextosGetAllRes';
import { TextoCreateReq } from '../_models/Textos/TextoCreate/TextoCreateReq';
import { TextoCreateRes } from '../_models/Textos/TextoCreate/TextoCreateRes';
import { TextoEditReq } from '../_models/Textos/TextoEdit/TextoEditReq';
import { TextoEditRes } from '../_models/Textos/TextoEdit/TextoEditRes';

@Injectable({
  providedIn: 'root'
})
export class TextoService {

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getTextos(pParams: TextosGetAllReq){
    const parameters = JSON.stringify(pParams);
    const headers = new HttpHeaders();
    const params = new HttpParams().append('parameters', parameters);
    return this.http.get<TextosGetAllRes[]>(this.baseUrl + 'textos',{headers, params});
  }

  textoCreate(texto: TextoCreateReq){
    return this.http.post<TextoCreateRes>(this.baseUrl + 'textos',texto);
  }

  textoEdit(texto: TextoEditReq){
    return this.http.put<TextoEditRes>(this.baseUrl + 'textos',texto);
  }


}
