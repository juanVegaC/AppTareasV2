import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActividadesAsigParam } from '../../../_models/Actividad/ActividadesAsigParam';
import { ActividadService } from '../../../_services/actividad.service';
import { ActvPorAsigGetReq } from '../../../_models/Actividad/ActvPorAsigGet/ActvPorAsigGetReq';
import { AppMsg } from '../../../_models/Messages/AppMsg';
import { ActvPorAsigGetRes } from '../../../_models/Actividad/ActvPorAsigGet/ActvPorAsigGetRes';
import { STareasPorPuestoDto } from '../../../_models/Tarea/STareasPorPuestoDto';
import { TareaAvanceCreateData } from '../../../_models/Tarea/TareaAvance/TareaAvanceCreateData';
import { DatePipe } from '@angular/common';
import { MessageService } from '../../../_services/message.service';
import { SListaActividadesViewConfig } from '../../../_views/config/SListaActividadesViewConfig';
import { UpdateAsignacionCloseReq } from '../../../_models/Asignacion/AsignacionClose/UpdateAsignacionCloseReq';
import { AsignacionesService } from '../../../_services/asignaciones.service';
import { UpdateAsignacionesPrioridad } from '../../../_models/Asignacion/AsigUpdPrioridad/UpdateAsignacionesPrioridad';

@Component({
    selector: 'app-lista-actividades',
    templateUrl: './lista-actividades.component.html',
    styleUrl: './lista-actividades.component.css',
    standalone: false
})
export class ListaActividadesComponent implements OnChanges {

  constructor(
    private actvService: ActividadService,
    private _renderer: Renderer2,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private asignacionesService: AsignacionesService){}

  @Input() actvParam: ActividadesAsigParam;
  @Input() oTareaSelected: STareasPorPuestoDto;
  @Input() configView: SListaActividadesViewConfig = { showCierraAsigBtn: false, showRegAvanceBtn: false };
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogRegAvance') oDialogRegAvance: ElementRef;

  actividades: Array<ActvPorAsigGetRes>;
  oAvanceCreate: TareaAvanceCreateData;
  reloadTareas: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if ( this.actvParam) {
      this.init(); // Llama a ngOnInit manualmente
    }
  }

  init(){
    console.log(this.oTareaSelected);
    this.loadActvDAsig(this.actvParam);  
    this.reloadTareas = false;
    this.initOActvNew();
  }


    getTareaTextPreview(tareaText:string){
    if(!tareaText) return "";
    if(tareaText.length > 50){
      return tareaText.substring(0,50).concat(" ...");
    }else{
      return tareaText;
    }
  }

  get_tiempo_act(actv:ActvPorAsigGetRes){

    var result : string =  ""
    if (actv.actvHrs > 0){
      result = actv.actvHrs.toString() + " hrs. "
    }

    if(actv.actvMins > 0){
      if (result){
        result = result + " " + actv.actvMins.toString() + " mins."        
      }else{
        result = actv.actvMins.toString() + " mins."
      }
    }

    return result;
  }

  get_total_tiempo() {
    let totalMins = 0;
    let totalHrs = 0;
    if (!this.actividades) return '';
    this.actividades.forEach(actv => {
      totalHrs += actv.actvHrs || 0;
      totalMins += actv.actvMins || 0;
    });
    totalHrs += Math.floor(totalMins / 60);
    totalMins = totalMins % 60;
    let result = '';
    if (totalHrs > 0) result += `${totalHrs} hrs. `;
    if (totalMins > 0) result += `${totalMins} mins.`;
    return result.trim();
  }

    get_total_avance() {
    let avance = 0;
    let prevActId = 0;
    if (!this.actividades) return '';
    this.actividades.forEach(actv => {
      if(prevActId < actv.id){
       avance = actv.avance || 0;
      } 
      prevActId = actv.id;
      
    });

    return avance + "%";
  }

  loadActvDAsig(actvParam: ActividadesAsigParam){
    
    var loParams : ActvPorAsigGetReq = {
      asigId: actvParam.asigId,
      ctrl_app_action: "ACTIVIDAD_D_ASIG"
    }

    this.actividades = [];

    this.actvService.getActvDeAsig(loParams).subscribe(actividades =>{
      console.log(actividades);
      this.actividades = actividades;
    });

  }

  close(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: this.reloadTareas 
    });

  }

  HandleRegistraAvance(){
    this.fTareaRegAvance();
  }

  fTareaRegAvance(){
  this.oAvanceCreate = {
    tareaId:this.oTareaSelected.id,
    tareaNumero:this.oTareaSelected.numero,
    tareaPuestoId:this.oTareaSelected.puestoId,
    texto:"",
    fecha:new Date(),
    fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
    asigId: 0,
    estatus: this.oTareaSelected.estatus,
    avance: 0,
    actvHrs:0,
    actvMins:0,    
    newPuestoId:0,  
    ctrl_app_active: true
  };  
  this.oDialogRegAvance.nativeElement.open = true;
}

  handleCloseActvReg($event){
    var resultMsg = $event.resultMsg;
    this.oAvanceCreate.ctrl_app_active = false;
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadActvDAsig(this.actvParam);
      this.reloadTareas = true;
    }
    this.oDialogRegAvance.nativeElement.open = false;
  }

    initOActvNew(){
      this.oAvanceCreate = {
        tareaId:0,
        tareaNumero:"",
        tareaPuestoId:0,
        texto: "",
        fecha:new Date(),
        fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
        asigId: 0,
        estatus: 0,
        avance: 0,
        actvHrs:0,
        actvMins:0,
        newPuestoId:0,
        ctrl_app_active:false
      }


  }

  HandleAsignacionClose(){
    this.AsignacionClose();
  }

  AsignacionClose(){

    var closedAsignacion: UpdateAsignacionCloseReq = {
      Id: this.oTareaSelected.asigIdPuesto
    };

    var updatedAsignacion: UpdateAsignacionesPrioridad = {
      data_str: JSON.stringify(closedAsignacion),
      ctrl_app_action: "ASIGNACION_CLOSE"
    };

        this.asignacionesService.updateAsignacionesPrioridad(updatedAsignacion).subscribe(response => {
          //console.log(response);
          response.messages.forEach( msg =>{
            this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
          }); 
          
          this.cerrar.emit({
            resultMsg: response.messages,
            reloadTareas: 1
          });
          

    });
  }

}
