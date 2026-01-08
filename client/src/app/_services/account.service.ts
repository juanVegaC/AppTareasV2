import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';
import { UserData } from '../_models/userData';
import { HttpClient } from '@angular/common/http';
import { UserAdminService } from './user-admin.service';
import { UsuarioCreateReq } from '../_models/Usuario/UsuarioCreate/UsuarioCreateReq';
import { UsuarioCreateRes } from '../_models/Usuario/UsuarioCreate/UsuarioCreateRes';
import { UsuarioEditReq } from '../_models/Usuario/UsuarioEdit/UsuarioEditReq';
import { UsuarioEditRes } from '../_models/Usuario/UsuarioEdit/UsuarioEditRes';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  userData: UserData;


constructor(
  private readonly http: HttpClient,
  private readonly userAdminService: UserAdminService
) {}


login(model: any){
  return this.http.post(this.baseUrl + 'account/login', model).pipe(
    map((response:User)=> {
      const user = response;
      console.log(response);
      if(user){
        this.setCurrentUser(user);
        /* this.presence.createHubConnection(user); */
      }
    })
  );
}

setCurrentUser(user: User){    
  user.roles = [];
  const roles = this.getDecodedToken(user.token).role;
  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('userBioTareas', JSON.stringify(user));
  console.log("en AcountService-setCurrentUser, user:");
  console.log(user);
  this.currentUserSource.next(user);
  this.getUserData(user.username).subscribe(response =>{});
}

getUserData(username:string){
  this.userData = null;
  console.log("en AcountService-getUserData 1, username: " + username);
  return this.userAdminService.getUser(username).pipe(
    map(result =>{
    this.userData = result;
    console.log("en AcountService-getUserData 2, result:");
    console.log(result);
  }));
}

  
  register(data: UsuarioCreateReq){
    return this.http.post<UsuarioCreateRes>(this.baseUrl + 'account/register', data);
  }

  userUpdate(data: UsuarioEditReq){
    return this.http.post<UsuarioEditRes>(this.baseUrl + 'account/editUser', data);
  }
  getUserInitial(){
    if(this.userData){
      var userNames = this.userData.name.split(" ");
      //console.log(userNames);
      if (userNames.length > 1){
        return userNames[0].substring(0,1) + userNames[1].substring(0,1);
      }else{
        return userNames[0].substring(0,1);
      }
    }
    else
      return "";
	}



  getUserName(){
    if(this.userData)
      return this.userData.username;
    else
      return "";
  }

  getUserNames(){
    if(this.userData)
      return this.userData.name;
    else
      return "";
  }

  getPuestoId():number{
    if(this.userData)
      return this.userData.puestoId;
    else
      return 0;
  }

  getUserId():number{
    if(this.userData)
      return this.userData.id;
    else
      return 0;
  }

  getUserPuesto(){
    if(this.userData)
      return this.userData.puesto;
    else
      return "";
  }

  isAdmin():boolean{
    if(this.userData)
      return this.userData.admin;
    else
      return false    
  }

  logout(){
    this.userData = null;
    localStorage.removeItem('userBioTareas');
    this.currentUserSource.next(null);
    /* this.presence.stopHubConnection(); */
  }

  isLoged(): boolean {
    var user = localStorage.getItem('userBioTareas');

    if (user)
      return true
    else
      return false
  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }

  /* 
  confirmLogout(title): Observable<string> { 
    

    const config = {
      initialState : {
        title
      }
    }

    this.bsModalRef = this.modalService.show(ConfirmLogoutComponent, config);

    return new Observable<string>(this.confirmLogoutGetResult());

}



private confirmLogoutGetResult(){
  return (observer) => {
      const suscription = this.bsModalRef.onHidden.subscribe(() => {
        //this.idleTime.resumeTimer(environment.idleTimeSeconds);
        observer.next(this.bsModalRef.content.password);
        observer.complete();
      });
    }
  }


  getDefaultAction(){
    var action = "";
    //console.log(this.userData);
    if(!this.userData)
      return action;

    if(this.userData.check_in &&
      !this.userData.inbound_bu &&
      !this.userData.outbo_bu &&
      !this.userData.loc_adm_but &&
      !this.userData.param_bu)
      action = "check_in";

    if(!this.userData.check_in &&
      this.userData.inbound_bu &&
      !this.userData.outbo_bu &&
      !this.userData.loc_adm_but &&
      !this.userData.param_bu)
      action = "inbound";

    if(!this.userData.check_in &&
      !this.userData.inbound_bu &&
      this.userData.outbo_bu &&
      !this.userData.loc_adm_but &&
      !this.userData.param_bu)
      action = "outbound";

    if(!this.userData.check_in &&
      !this.userData.inbound_bu &&
      !this.userData.outbo_bu &&
      this.userData.loc_adm_but &&
      !this.userData.param_bu)
      action = "loc_admin";

    return action;
  }


  hasInbound(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.inbound_bu)
      result = true;
      
    return result;
  }
  hasCheckIn(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.check_in)
      result = true;

    return result;
  }
  hasOutbound(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.outbo_bu)
      result = true;

    return result;
  }
  hasLocAdmin(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.loc_adm_but)
      result = true;

    return result;
  }
  hasZones(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.zone_bu)
      result = true;

    return result;
  }

  hasAdmin(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.param_bu)
      result = true;

    return result;
  }

  hasReports(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.param_bu)
      result = true;

    return result;
  }

  hasExtCheckIn(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.ext_check_in)
      result = true;

    return result;
  }

  hasUnloPrior(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.unlo_prior)
      result = true;

    return result;
  }
  hasLocEdit(){
    var result = false;

    if(!this.userData)
      return result;

    if(this.userData.upd_loc)
      result = true;

    return result;
  }
 */
}
