import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../_models/userData';
import { usuariosGetAllRes } from '../_models/Usuario/UsuariosGetAll/UsuariosGetAllRes';
import { UsuarioChangePassReq } from '../_models/Usuario/UsuarioChangePass/UsuarioChangePassReq';
import { UsuarioChangePassRes } from '../_models/Usuario/UsuarioChangePass/UsuarioChangePassRes';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  getUsers(){
    return this.http.get<usuariosGetAllRes[]>(this.baseUrl + 'users/');
    
   }

   getUser(username: string){
    return this.http.get<UserData>(this.baseUrl + 'users/' + username);
   }

   create(usr: UserData){
    return this.http.post<UserData>(this.baseUrl + 'users/',usr);
  }

  changePassword(usr: UsuarioChangePassReq){
    return this.http.put<UsuarioChangePassRes>(this.baseUrl + 'users/',usr);
  }

}
