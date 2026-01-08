import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TareaAvanceCreateData } from '../../_models/Tarea/TareaAvance/TareaAvanceCreateData';
import { SEstatusParaAsigDto } from '../../_models/Estatus/SEstatusParaAsigDto';
import { SPuestoPorUsuarioDto } from '../../_models/Puesto/SPuestoPorUsuarioDto';
import { EstatusService } from '../../_services/estatus.service';
import { ActividadService } from '../../_services/actividad.service';
import { AccountService } from '../../_services/account.service';
import { PuestoService } from '../../_services/puesto.service';
import { AsignacionesService } from '../../_services/asignaciones.service';
import { AsignacionesGetParams } from '../../_models/Asignacion/AsignacionesGetParams';
import { AppMsg } from '../../_models/Messages/AppMsg';

@Component({
  selector: 'app-actividad-reg-n',
  templateUrl: './actividad-reg-n.component.html',
  styleUrl: './actividad-reg-n.component.css'
})
export class ActividadRegNComponent {


  @Input() actividad: TareaAvanceCreateData;
  @Output() cerrar = new EventEmitter();

  estatus: Array<SEstatusParaAsigDto>;
  puestosParaTarea: Array<SPuestoPorUsuarioDto>;



  @ViewChild('dialogFechaInput') oDialogFechaInput: ElementRef;
  @ViewChild('dialogAvanceInput') oDialogAvanceInput: ElementRef;
  @ViewChild('dialogHrsInput') oDialogHrsInput: ElementRef;
  @ViewChild('dialogMinsInput') oDialogMinsInput: ElementRef;
  @ViewChild('dialogTextoInput') oDialogTextoInput: ElementRef;

  constructor(
    private actividadService: ActividadService,
    public accountService : AccountService,
    private _renderer: Renderer2){}

    ngOnChanges(changes: SimpleChanges) {
      if ( this.actividad) {
        this.ngOnInit(); // Llama a ngOnInit manualmente
      }
    }

    
  ngOnInit(): void {
    if(this.actividad.ctrl_app_active){
      this.clearDialogAvanceReg();
    }
  }



  AsignarAChanged(event){
    console.log(event.detail.selectedOption._state.value);
  }


  clearDialogAvanceReg(){
    if (this.oDialogFechaInput == undefined) return;
    this._renderer.setAttribute(this.oDialogFechaInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogAvanceInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogHrsInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogMinsInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogTextoInput.nativeElement, 'value-state', 'None');
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
   
    console.log(this.actividad);


    if (this.actividad.fechaSTR == ""){
      this._renderer.setAttribute(this.oDialogFechaInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }else{
        this.actividad.fecha = this.dateSTRtoDATE(this.actividad.fechaSTR);      
    }



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
