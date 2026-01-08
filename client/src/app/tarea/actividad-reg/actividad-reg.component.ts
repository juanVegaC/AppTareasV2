import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { SActvRegDto } from '../../_models/Actividad/SActvRegDto';
import { SEstatusParaAsigDto } from '../../_models/Estatus/SEstatusParaAsigDto';
import { DatePipe } from '@angular/common';
import { EstatusService } from '../../_services/estatus.service';
import { EstatusGetParams } from '../../_models/Estatus/EstatusGetParams';
import { TareaAvanceCreateData } from '../../_models/Tarea/TareaAvance/TareaAvanceCreateData';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { ActividadService } from '../../_services/actividad.service';
import { AccountService } from '../../_services/account.service';
import { AsignacionesService } from '../../_services/asignaciones.service';
import { AsignacionesGetParams } from '../../_models/Asignacion/AsignacionesGetParams';
import { AsignacionesDTareaRes } from '../../_models/Asignacion/AsignacionesDTareaRes';
import { SPuestoPorUsuarioDto } from '../../_models/Puesto/SPuestoPorUsuarioDto';
import { PuestoService } from '../../_services/puesto.service';
import { PuestosGetParams } from '../../_models/Puesto/PuestosGetParams';

@Component({
    selector: 'app-actividad-reg',
    templateUrl: './actividad-reg.component.html',
    styleUrl: './actividad-reg.component.css',
    standalone: false
})
export class ActividadRegComponent implements OnInit{

  @Input() actividad: TareaAvanceCreateData;
  @Output() cerrar = new EventEmitter();

  estatus: Array<SEstatusParaAsigDto>;
  puestosParaTarea: Array<SPuestoPorUsuarioDto>;



  @ViewChild('dialogFechaInput') oDialogFechaInput: ElementRef;
  @ViewChild('selectEstatus') oSelectEstatus: ElementRef;
  @ViewChild('dialogAvanceInput') oDialogAvanceInput: ElementRef;
  @ViewChild('dialogHrsInput') oDialogHrsInput: ElementRef;
  @ViewChild('dialogMinsInput') oDialogMinsInput: ElementRef;
  @ViewChild('dialogTextoInput') oDialogTextoInput: ElementRef;
  @ViewChild('selectReAsignarA') oSelectReAsignarA: ElementRef;

  constructor(
    private estatusService: EstatusService,
    private actividadService: ActividadService,
    public accountService : AccountService,
    private puestoService: PuestoService,
    private asigService: AsignacionesService,
    private _renderer: Renderer2){}

    ngOnChanges(changes: SimpleChanges) {
      if ( this.actividad) {
        this.ngOnInit(); // Llama a ngOnInit manualmente
      }
    }

    
  ngOnInit(): void {
    if(this.actividad.ctrl_app_active){
      this.clearDialogAvanceReg();
      this.loadAsigDPuesto(this.actividad.tareaId,this.accountService.getPuestoId());
      this.loadEstatusPRegActv(this.actividad.asigId);
      this.loadPuestosPAsigTarea(this.actividad.tareaId);  
    }
  }



  loadAsigDPuesto(tareaId: number, puestoId:number){
    var params : AsignacionesGetParams = {
      ctrl_app_action: "ASIGNACIONES_D_TAREA",
      tareaId: tareaId
    };
    //console.log("PuestoID: " + puestoId);
    //var asignaciones: Array<AsignacionesDTareaRes> = [];
    //console.log(params);
    this.asigService.getAsigDeTarea(params).subscribe(asignaciones => {
      //tareas2 = response.result;
      console.log(asignaciones);
      //asignaciones = asignaciones;
      
      asignaciones.forEach(asignacion => {
        if(asignacion.puestoId == puestoId){
          this.actividad.avance = asignacion.avance;
          this.actividad.asigId = asignacion.id;
          console.log(this.actividad);
        }
      })
  
      //console.log(this.tareas)
    });

  }

  AsignarAChanged(event){
    console.log(event.detail.selectedOption._state.value);
  }

  loadPuestosPAsigTarea(tareaId: number){
    var params : PuestosGetParams = {
      ctrl_app_action: "PUESTOS_P_REGRESAR_TAREA",
      tareaId: tareaId
    };
    console.log(params);
    this.puestosParaTarea = []
    this.puestoService.getPuestosPorUsuario(params).subscribe(puestos => {
      //tareas2 = response.result;
      console.log(puestos);
      this.puestosParaTarea = puestos;
      
      //console.log(this.tareas)
    });

  }

  clearDialogAvanceReg(){
    this._renderer.setAttribute(this.oDialogFechaInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oSelectEstatus.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogAvanceInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogHrsInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogMinsInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogTextoInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oSelectReAsignarA.nativeElement, 'value-state', 'None'); 
  }

  loadEstatusPRegActv(asigId: number){
    var params : EstatusGetParams = {
      ctrl_app_action: "ESTATUS_P_ASIG_ID",
      asigId: asigId
    };
    console.log(params);
    this.estatus = []
    this.estatusService.getEstatus(params).subscribe(estatus => {
      //tareas2 = response.result;
      console.log(estatus);
      this.estatus = estatus;
      
      //console.log(this.tareas)
    });

  }


  EstatusChanged(event){
    console.log(event.detail.selectedOption._state.value);
  }

  cancelar(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });
  }

  guardar(){
    var error = false;
    this.clearDialogAvanceReg();
    this.actividad.fechaSTR = this.oDialogFechaInput.nativeElement.value;
    this.actividad.avance = this.oDialogAvanceInput.nativeElement.value;
    this.actividad.actvHrs = this.oDialogHrsInput.nativeElement.value;
    this.actividad.actvMins = this.oDialogMinsInput.nativeElement.value;
    this.actividad.texto = this.oDialogTextoInput.nativeElement.value;
   
    if(this.oSelectEstatus.nativeElement.value != ""){
      this.actividad.estatus = this.oSelectEstatus.nativeElement.value;
    }else{
      this.actividad.estatus = 0;
    }

    if(this.oSelectReAsignarA.nativeElement.value == ""){
      this._renderer.setAttribute(this.oSelectReAsignarA.nativeElement, 'value-state', 'Negative');
      error = true;    
    }else{
      this.actividad.newPuestoId = this.oSelectReAsignarA.nativeElement.value;
    }
    console.log(this.actividad);


    if (this.actividad.fechaSTR == ""){
      this._renderer.setAttribute(this.oDialogFechaInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }else{
        this.actividad.fecha = this.dateSTRtoDATE(this.actividad.fechaSTR);      
    }

    if (this.actividad.estatus == 0){
      this._renderer.setAttribute(this.oSelectEstatus.nativeElement, 'value-state', 'Negative');
      error = true;
    }
/*     if (this.actividad.avance == 0){
      this._renderer.setAttribute(this.oDialogAvanceInput.nativeElement, 'value-state', 'Negative');
      error = true;
    } 
 */
/*      if (this.actividad.actvHrs == 0 && this.actividad.actvMins == 0){
      this._renderer.setAttribute(this.oDialogHrsInput.nativeElement, 'value-state', 'Negative');
      this._renderer.setAttribute(this.oDialogMinsInput.nativeElement, 'value-state', 'Negative');
      error = true;
    } 
 */
/*     if (this.actividad.texto == ""){
      this._renderer.setAttribute(this.oDialogTextoInput.nativeElement, 'value-state', 'Negative');
      error = true;
    } */

     if (!error){
      this.actividadService.saveAvance(this.actividad).subscribe(response =>{
        console.log(response);

        this.cerrar.emit({
          resultMsg: response.messages,
          reloadTareas: 1
        });
    
      });   
    }
  
}

  dateSTRtoDATE(pDate: string): Date{
    var dateSTRaux = pDate.substring(6,10) + "-" + pDate.substring(3,5) + "-" + pDate.substring(0,2);
    return new Date(dateSTRaux);
  }

}
