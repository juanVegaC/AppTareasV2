import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { EmpleadosService } from '../../../../_services/empleados.service';
import { EmpleadoCreateReq } from '../../../../_models/Empleado/EmpleadoCreate/EmpleadoCreateReq';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { PuestoService } from '../../../../_services/puesto.service';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { PuestosGetAllReq } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllReq';
import { usuariosGetAllRes } from '../../../../_models/Usuario/UsuariosGetAll/UsuariosGetAllRes';
import { UserAdminService } from '../../../../_services/user-admin.service';

@Component({
    selector: 'app-empleado-add',
    templateUrl: './empleado-add.component.html',
    styleUrl: './empleado-add.component.css',
    standalone: false
})
export class EmpleadoAddComponent implements OnInit {

  constructor(
    private _renderer: Renderer2,
    private puestoService: PuestoService,
    private userAdminService: UserAdminService,
    private empleadoService: EmpleadosService ){
  }

  @Input() empleado: EmpleadoCreateReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogUsuarioIdInput') oDialogUsuarioIdInput: ElementRef;
  @ViewChild('dialogPuestoIdInput') oDialogPuestoIdInput: ElementRef;
  @ViewChild('dialogPrincipalInput') oDialogPrincipalInput: ElementRef;
  @ViewChild('dialogValidoDesdeInput') oDialogValidoDesdeInput: ElementRef;
  @ViewChild('dialogValidoHastaInput') oDialogValidoHastaInput: ElementRef;

  catPuestos: Array<PuestosGetAllRes>;
  catUsuarios: Array<usuariosGetAllRes>;

  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

  ngOnInit() {
      this.loadData();
  }


  loadData(){

    this.LoadCatPuestos();
    this.loadCatUsuarios();

  }

  loadCatUsuarios(){
    
    this.userAdminService.getUsers().subscribe(usuarios => {
      console.log(usuarios);
      this.catUsuarios = usuarios;

      const vacio: usuariosGetAllRes = {
        id: 0,
        name: '',
        userName: '',
        admin: false,
        locked: false,
      };
  
      if (this.catUsuarios) {
        this.catUsuarios.unshift(vacio);
      }        
    });

  }

LoadCatPuestos(){

    var param : PuestosGetAllReq ={
      ctrl_app_action: "PUESTOS_ALL"
    }
    this.puestoService.getPuestos(param).subscribe(puestos => {
      console.log(puestos);
      this.catPuestos = puestos;

      const vacio: PuestosGetAllRes = {
        id: 0,
        titulo: '',
        puestoSupId: 0,
        puestoSupTitulo: '',
        publico: false,
        borrado: false,
      };
  
      if (this.catPuestos) {
        this.catPuestos.unshift(vacio);
      }      

    });  
}


  closeAppMessage(){
    this.message  = {
      type: "",
      text: "",
      number: 0,
      displayStyle: ""
    }
  }

  clearDialog(){
    this.oDialogUsuarioIdInput.nativeElement.value= 0;
    this.oDialogPuestoIdInput.nativeElement.value= 0;
    this.oDialogPrincipalInput.nativeElement.checked= false;
    this.oDialogValidoDesdeInput.nativeElement.value= "";
    this.oDialogValidoHastaInput.nativeElement.value= ""; 

    this._renderer.setAttribute(this.oDialogUsuarioIdInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogPuestoIdInput.nativeElement, 'value-state', 'None');  
    this._renderer.setAttribute(this.oDialogValidoDesdeInput.nativeElement, 'value-state', 'None');  
    this._renderer.setAttribute(this.oDialogValidoHastaInput.nativeElement, 'value-state', 'None');
  }

  close(){
    var resultMessages: AppMsg[] = [];
    this.clearDialog();
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadData: 0
    });
  }

  dateSTRtoDATE(pDate: string): Date{
    var dateSTRaux = pDate.substring(6,10) + "-" + pDate.substring(3,5) + "-" + pDate.substring(0,2);
    return new Date(dateSTRaux);
  }

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogUsuarioIdInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogPuestoIdInput.nativeElement, 'value-state', 'None');

  }

  guardar(){
    var error : boolean = false

    this.resetStatusDialog();

    this.empleado.userId = Number(this.oDialogUsuarioIdInput.nativeElement.value)
    this.empleado.puestoId = Number(this.oDialogPuestoIdInput.nativeElement.value)
    this.empleado.principal = this.oDialogPrincipalInput.nativeElement.checked
    this.empleado.validoDesdeStr = this.oDialogValidoDesdeInput.nativeElement.value
    this.empleado.validoHastaStr = this.oDialogValidoHastaInput.nativeElement.value

    if (this.empleado.userId == 0){
      this._renderer.setAttribute(this.oDialogUsuarioIdInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if(this.empleado.puestoId == 0){
      this._renderer.setAttribute(this.oDialogPuestoIdInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if(this.empleado.validoDesdeStr == ""){
      this._renderer.setAttribute(this.oDialogValidoDesdeInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }else{
      this.empleado.validoDesde = this.dateSTRtoDATE(this.empleado.validoDesdeStr);
    }

    if(this.empleado.validoHastaStr == ""){
      this._renderer.setAttribute(this.oDialogValidoHastaInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }else{
      this.empleado.validoHasta = this.dateSTRtoDATE(this.empleado.validoHastaStr);
    }


    if(!error){
      console.log(this.empleado);
       this.empleadoService.empleadoCreate(this.empleado).subscribe(response =>{
        //console.log(result);
        var lvError = false

        response.messages.forEach(msg => {
          if (msg.type == "E"){
              lvError = true
              this.message  = {
                type: msg.type,
                text: msg.text,
                number: 0,
                displayStyle: "Negative"
              }        
          }
        });

        if (!lvError){
          this.closeAppMessage();
          this.clearDialog();
          this.cerrar.emit({
            resultMsg: response.messages,
            reloadData: 1
          });  
        }

      });
       
    }
  }
    
}
