import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TareaData } from '../../_models/TareaData';
import { SPuestoPorUsuarioDto } from '../../_models/Puesto/SPuestoPorUsuarioDto';
import { DatePipe } from '@angular/common';
import { PuestoService } from '../../_services/puesto.service';
import { PuestosGetParams } from '../../_models/Puesto/PuestosGetParams';
import { TareaService } from '../../_services/tarea.service';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { TareaCreateReqDat } from '../../_models/Tarea/TareaCreate/TareaCreateReqDat';
import { AccountService } from '../../_services/account.service';
import { PuestoTabGetAllRes } from '../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllRes';
import { PuestoTabGetAllReq } from '../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllReq';
import { PuestoTabService } from '../../_services/puesto-tab.service';

@Component({
    selector: 'app-tarea-reg',
    templateUrl: './tarea-reg.component.html',
    styleUrl: './tarea-reg.component.css',
    standalone: false
})
export class TareaRegComponent implements OnInit, OnChanges {

  constructor(
    private tareaService: TareaService,
    private puestoService: PuestoService,
    private puestoTabService: PuestoTabService,
    public accountService : AccountService,
    private _renderer: Renderer2){}

  @Input() tarea: TareaCreateReqDat;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogTareaNumeroInput') oDialogTareaNumeroInput: ElementRef;
  @ViewChild('dialogTareaDocuUrlInput') oDialogTareaDocuUrlInput: ElementRef;
  @ViewChild('dialogTareaTextInput') oDialogTareaTextInput: ElementRef;
  @ViewChild('selectAsignarA') oSelectAsignarA: ElementRef;
  @ViewChild('selectTablero') oSelectTablero: ElementRef;

  puestos: Array<SPuestoPorUsuarioDto>;
  puestoTableros: Array<PuestoTabGetAllRes>

  ngOnChanges(changes: SimpleChanges) {
    if ( this.tarea) {
      this.ngOnInit(); // Llama a ngOnInit manualmente
    }
  }

  ngOnInit(){
    if(this.tarea.ctrl_app_active){
      this.clearDialogTareaAdd();
      this.loadPuestos();
      this.loadTablerosDePuesto(this.tarea.asignadoA);
      //this.oSelectAsignarA.nativeElement.value = this.oselectPuesto.nativeElement.value;
      this._renderer.removeAttribute(this.oSelectAsignarA.nativeElement, 'readonly');   
    }
  }
  

  loadPuestos(){
    var params : PuestosGetParams = {
      ctrl_app_action: "PUESTOS_P_CREA_TAREA",
      tareaId: 0
    };
    this.puestos = []
    this.puestoService.getPuestosPorUsuario(params).subscribe(puestos => {
      console.log(puestos);
      this.puestos = puestos;
      
/*       const defaultPuestoId = this.accountService.getPuestoId();
      if (defaultPuestoId) {
        
      } */

    });

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
      });
    }

  AsignarAChanged(event){
    console.log("AsignarAChanged raised");
    var puestoId : number;
    this.puestoTableros = [];
    
    if(this.oSelectAsignarA.nativeElement.value){
      puestoId = Number(this.oSelectAsignarA.nativeElement.value);
      if(puestoId != 0){
        this.loadTablerosDePuesto(puestoId);
      }
    }

    console.log(event.detail.selectedOption._state.value);
  }


  clearDialogTareaAdd(){
    this.oDialogTareaNumeroInput.nativeElement.value = "";
    this.oDialogTareaTextInput.nativeElement.value= "";
    this.oDialogTareaDocuUrlInput.nativeElement.value = "";
    //this.oSelectAsignarA.nativeElement.value = "";
    //this._renderer.setAttribute(this.oSelectAsignarA.nativeElement, 'value', '0');
    //this.oDialogTareaCreatedOn.nativeElement.value= this.datePipe.transform( new Date(),"yyyy-MM-dd");

    this._renderer.setAttribute(this.oDialogTareaNumeroInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogTareaTextInput.nativeElement, 'value-state', 'None');   
    this._renderer.setAttribute(this.oSelectAsignarA.nativeElement, 'value-state', 'None');    
    this._renderer.setAttribute(this.oSelectTablero.nativeElement, 'value-state', 'None');    
  }


  cancelar(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });
  }

  guardar(){
   this.saveTarea();
  }

  clearErrores(){
    this._renderer.setAttribute(this.oDialogTareaNumeroInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogTareaTextInput.nativeElement, 'value-state', 'None');   
    this._renderer.setAttribute(this.oSelectAsignarA.nativeElement, 'value-state', 'None');    
    this._renderer.setAttribute(this.oSelectTablero.nativeElement, 'value-state', 'None');    
  }

  saveTarea(){
    
    var error = false;
    this.clearErrores();

    this.tarea.numero = this.oDialogTareaNumeroInput.nativeElement.value;
    this.tarea.texto = this.oDialogTareaTextInput.nativeElement.value;
    this.tarea.docuUrl = this.oDialogTareaDocuUrlInput.nativeElement.value;
    //this.tarea.creadoFeSTR = this.oDialogTareaCreatedOn.nativeElement.value;
    
    if(this.oSelectAsignarA.nativeElement.value != ""){
      this.tarea.asignadoA = this.oSelectAsignarA.nativeElement.value;
    }else{
      this.tarea.asignadoA = 0;
    } 

    if(this.oSelectTablero.nativeElement.value != ""){
      this.tarea.tableroId = this.oSelectTablero.nativeElement.value;
    }else{
      this.tarea.tableroId = 0;
    }

    console.log(this.tarea);


    if (this.tarea.numero == ""){
      this._renderer.setAttribute(this.oDialogTareaNumeroInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if (this.tarea.texto == ""){
      this._renderer.setAttribute(this.oDialogTareaTextInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }

/*     if(this.tarea.creadoFeSTR == ""){
      this._renderer.setAttribute(this.oDialogTareaCreatedOn.nativeElement, 'value-state', 'Negative');
      error = true;
    }else{
      this.tarea.creadoFe = this.dateSTRtoDATE(this.tarea.creadoFeSTR);
    }
 */
    if (this.tarea.asignadoA == 0){
      this._renderer.setAttribute(this.oSelectAsignarA.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if (this.tarea.tableroId == 0){
      this._renderer.setAttribute(this.oSelectTablero.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if (!error){
      this.tareaService.saveTarea(this.tarea).subscribe(response =>{
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
