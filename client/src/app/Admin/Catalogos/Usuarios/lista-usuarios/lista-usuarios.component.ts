import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';
import { UserAdminService } from '../../../../_services/user-admin.service';
import { usuariosGetAllRes } from '../../../../_models/Usuario/UsuariosGetAll/UsuariosGetAllRes';
import { UsuarioCreateReq } from '../../../../_models/Usuario/UsuarioCreate/UsuarioCreateReq';
import { MessageService } from '../../../../_services/message.service';
import { UsuarioEditReq } from '../../../../_models/Usuario/UsuarioEdit/UsuarioEditReq';

@Component({
    selector: 'app-lista-usuarios',
    templateUrl: './lista-usuarios.component.html',
    styleUrl: './lista-usuarios.component.css',
    standalone: false
})
export class ListaUsuariosComponent implements OnInit,AfterViewInit{

  constructor(
    private navService: NavigationService,
    private userAdminService: UserAdminService,
    private messageService: MessageService) { }

    @ViewChild('busy_indicator') busy_indicator: ElementRef;
    @ViewChild('dialogAdd') oDialogAdd: ElementRef;
    @ViewChild('dialogEdit') oDialogEdit: ElementRef;


    usuarios: Array<usuariosGetAllRes>;
    usuarioAdd: UsuarioCreateReq ={
      userName:"",
      name:"",
      password:"",
      ctrl_app_active:false
    }
    usuarioEdit: UsuarioEditReq ={
      id:0,
      userName:"",
      name:"",
      password:"",
      admin:false,
      locked:false,
      ctrl_app_active:false
    }

    ngOnInit(): void {
      //this.loadData();
    }
    ngAfterViewInit() {
      this.loadData();
    }

    reLoadData(){
      this.usuarios = [];
      this.loadData();
    }
    
    loadData(){
      
      this.busy_indicator.nativeElement.active = true;
      this.userAdminService.getUsers().subscribe(usuarios => {
        this.busy_indicator.nativeElement.active = false;
        console.log(usuarios);
        this.usuarios = usuarios;
        //console.log(this.usuarios)
      });
  
    }

    handleEdit($event, id){
      
      var usuario = this.getUsuarioFromId(id);
      console.log(usuario);
      this.usuarioEdit ={
        id:usuario.id,
        userName:usuario.userName,
        name:usuario.name,
        password:"",
        admin:usuario.admin,
        locked:usuario.locked,
        ctrl_app_active:true  
      }
      this.oDialogEdit.nativeElement.open = true;

    }

    getUsuarioFromId(id):usuariosGetAllRes{
      var result : usuariosGetAllRes;
      this.usuarios.forEach(usuario => {
        if(usuario.id == id){
  
          result= usuario;
        }
    });  
      return result;
    }
  

    handleAdd(){
      this.usuarioAdd.ctrl_app_active = true;
      this.oDialogAdd.nativeElement.open = true;
    }

    handleRegresar(){
      this.navService.goToCatMenu();
    }

    handleCloseAdd($event){
      var resultMsg = $event.resultMsg;
      this.usuarioAdd.ctrl_app_active = false;
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
      if($event.reloadData){
        this.reLoadData();
      }  
      this.oDialogAdd.nativeElement.open = false;
    }

    handleCloseEdit($event){
      var resultMsg = $event.resultMsg;
      this.usuarioEdit.ctrl_app_active = false;
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
      if($event.reloadData){
        this.reLoadData();
      }  
      this.oDialogEdit.nativeElement.open = false;
    }
}
