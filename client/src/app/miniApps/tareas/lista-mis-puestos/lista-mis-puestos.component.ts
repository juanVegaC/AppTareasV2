import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SPuestoPorUsuarioDto } from '../../../_models/Puesto/SPuestoPorUsuarioDto';
import { TareaCreateReqDat } from '../../../_models/Tarea/TareaCreate/TareaCreateReqDat';
import { PuestoService } from '../../../_services/puesto.service';
import { MessageService } from '../../../_services/message.service';
import { PuestosGetParams } from '../../../_models/Puesto/PuestosGetParams';
import { PuestoTabGetAllRes } from '../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllRes';
import { PuestoTabService } from '../../../_services/puesto-tab.service';
import { PuestoTabGetAllReq } from '../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllReq';

@Component({
  selector: 'app-lista-mis-puestos',
  templateUrl: './lista-mis-puestos.component.html',
  styleUrl: './lista-mis-puestos.component.css'
})
export class ListaMisPuestosComponent {
  
    constructor(
    private puestoService: PuestoService,
    private puestoTabService: PuestoTabService,
    private messageService: MessageService){}  

  @Output() selectedPuestoChanged = new EventEmitter();
  
  puestos: Array<SPuestoPorUsuarioDto>;
  puestoTableros: Array<PuestoTabGetAllRes>;

  oTareaCreate: TareaCreateReqDat;

  puestoSelected: SPuestoPorUsuarioDto={
    usuarioId: 0,
    usuario: "",
    nombre: "",
    empleadoId: 0,
    puestoId: 0,
    puestoTitulo: "",
    principal: false,
    puestoPropio:false,
    esPool:false,
    tableroId: 0
  }

/*   puestoTabSelected: PuestoTabGetAllRes={
    id:0,
    puestoId:0,
    puestoTitulo:"",
    tableroId:0,
    tableroNombre:"",
    principal:false,  
    borrado:false
  } */

  @ViewChild('selectPuesto') oselectPuesto: ElementRef;
  @ViewChild('selectTablero') oselectTablero: ElementRef;
  @ViewChild('dialogTareaAdd') oDialogTareaAdd: ElementRef;




    ngOnInit(): void {

      console.log("in lista-tareas");
    
      this.loadPuestosPUsuario();
      this.initTareaCreateData();
      this.loadTareas();
    }

    
  loadPuestosPUsuario(){
    var params : PuestosGetParams = {
      ctrl_app_action: "PUESTOS_P_USUARIO",
      tareaId: 0
    };

    this.puestoService.getPuestosPorUsuario(params).subscribe(puestos => {
      //tareas2 = response.result;
      console.log(puestos);
      this.puestos = puestos;
       setTimeout(() => 
        {
          //this.loadTareasData();
          this.handlePuestoSelChange(null);
        },
        1500); 
      
      //this.tareas = response.result;
      //console.log(this.tareas)
    });

  }

  getPuestoFromId(puestoId):SPuestoPorUsuarioDto{
    console.log(puestoId);
    var result : SPuestoPorUsuarioDto;
    this.puestos.forEach(puesto => {
      if(puesto.puestoId == puestoId){

        result= puesto;
      }
  });  
    return result;
  }

  handlePuestoSelChange(event){
    console.log(event);
    var puestoId: number;


    if(this.oselectPuesto.nativeElement.value){
      puestoId = Number(this.oselectPuesto.nativeElement.value);
      this.puestoSelected = this.getPuestoFromId(puestoId);
      this.puestoTableros = [];
      this.loadTablerosDePuesto(puestoId);
    }else{
      puestoId=0;
    }

    //this.loadTareasData();
  }

  handleTableroSelChange(event){
    console.log(event);
    var tableroId: number;


    if(this.oselectTablero.nativeElement.value){
      tableroId = Number(this.oselectTablero.nativeElement.value);
      //this.puestoTabSelected = this.getPuestoTabFromId(tableroId);
      this.puestoSelected.tableroId = tableroId;
    }else{
      tableroId=0;
    }

    this.loadTareasData();
  }


  loadTablerosDePuesto(puestoId: number){

      this.puestoTableros = [];

      if(!puestoId || puestoId === 0){
        
        return;
      }

      var req : PuestoTabGetAllReq = {
        puestoId: puestoId,
        ctrl_app_action: ""
      }

      this.puestoTabService.getAll(req).subscribe(puestoTab => {
        console.log("load puesto tab for puestoId: " + puestoId);
        this.puestoTableros = puestoTab;
        console.log(this.puestoTableros);
        setTimeout(() => 
        {
          this.handleTableroSelChange(null);
        },
        1500); 
      });
    }

    getPuestoTabFromId(id):PuestoTabGetAllRes{
      var result : PuestoTabGetAllRes;
      this.puestoTableros.forEach(tab => {
        if(tab.id == id){

          result= tab;
        }
    });
      return result;
    } 

  initTareaCreateData(){
    this.oTareaCreate = {
      id: 0,
      numero: "",
      texto: "",
      docuUrl: "",
      asignadoA:0,
      tableroId:0,
      ctrl_app_action: "TAREA_CREATE",   
      ctrl_app_active: false,   
    }
  }

  handleTareaAdd(){

    this.oTareaCreate = {
      id: 0,
      numero: "",
      texto: "",
      docuUrl: "",
      asignadoA:this.puestoSelected.puestoId,
      tableroId:this.puestoSelected.tableroId,
      ctrl_app_action: "TAREA_CREATE",   
      ctrl_app_active: true,   
    }

    //this.setTitleDialogTarea("Crear Tarea");
    this.oDialogTareaAdd.nativeElement.open = true;
  }

  handleCloseTareaReg($event){
    var resultMsg = $event.resultMsg;
    this.oTareaCreate.ctrl_app_active = false;
    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTareasData();
    }
    this.oDialogTareaAdd.nativeElement.open = false;
  }


  loadTareas(){

    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.loadTareasData();
      }
    }, 60000);
  }

  loadTareasData(){
    if (this.puestoSelected.puestoId && this.puestoSelected.tableroId){
      console.log("load tareas data from puestoId: " + this.puestoSelected.puestoId + " tableroId: " + this.puestoSelected.tableroId);

      this.selectedPuestoChanged.emit({
        puestoSelected:this.puestoSelected,
        tareasReload: true
        });


    }
  }

}
