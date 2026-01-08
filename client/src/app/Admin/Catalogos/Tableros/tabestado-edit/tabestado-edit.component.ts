import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { EstadosService } from '../../../../_services/estados.service';
import { TabEstadosService } from '../../../../_services/tab-estados.service';
import { TabEstadoEditReq } from '../../../../_models/TabEstado/TabEstadoEdit/TabEstadoEditReq';
import { appMessage } from '../../../../_models/appMessage';
import { EstadosGetAllRes } from '../../../../_models/Estado/EstadosGetAll/EstadosGetAllRes';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { PuestosGetAllReq } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllReq';
import { PuestoService } from '../../../../_services/puesto.service';
import { PuestoTabGetAllRes } from '../../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllRes';
import { PuestoTabGetAllReq } from '../../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllReq';
import { PuestoTabService } from '../../../../_services/puesto-tab.service';
import { TabEstadosGetAllRes } from '../../../../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllRes';
import { TabEstadosGetAllReq } from '../../../../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllReq';

@Component({
    selector: 'app-tabestado-edit',
    templateUrl: './tabestado-edit.component.html',
    styleUrl: './tabestado-edit.component.css',
    standalone: false
})
export class TabestadoEditComponent implements OnChanges  {
    constructor(
      private _renderer: Renderer2,
      private estadosService: EstadosService,
      private puestoService: PuestoService,
      private puestoTabService: PuestoTabService,
      private tabEstadoService: TabEstadosService,
      private tabEstadosService: TabEstadosService
     ){
    }


    @Input() tabEstado: TabEstadoEditReq;

    @Output() cerrar = new EventEmitter();

    @ViewChild('oDialogEstadoInput') oSelectEstadoId: ElementRef;
    @ViewChild('oDialogPosicionInput') oSelectPosicionInput: ElementRef;
    @ViewChild('dialogCreateEstado') oDialogCreateEstado: ElementRef;
    @ViewChild('dialogPuestoIdInput') oDialogPuestoIdInput: ElementRef;
    @ViewChild('dialogTableroInput') oDialogTableroInput: ElementRef;
    @ViewChild('dialogEstadoInput') oDialogEstadoInput: ElementRef;
    @ViewChild('dialogAsigPuestoIdInput') oDialogAsigPuestoIdInput: ElementRef;
    @ViewChild('dialogAsigTableroInput') oDialogAsigTableroInput: ElementRef;
    @ViewChild('dialogAsigEstadoInput') oDialogAsigEstadoInput: ElementRef;
    @ViewChild('dialogCierraAsigInput') oDialogCierraAsigInput: ElementRef;

    estados: Array<EstadosGetAllRes>;
    catPuestos: Array<PuestosGetAllRes>;
    catPuestoTab: Array<PuestoTabGetAllRes>;
    catAsigPuestoTab: Array<PuestoTabGetAllRes>;
    catTabEstados: Array<TabEstadosGetAllRes>;
    catAsigTabEstados: Array<TabEstadosGetAllRes>;
    
    posiciones: Array<Number> = [1,2,3,4,5,6,7,8,9,10,11,12];


    nombreErrMsg: string = ""
  
  
    message: appMessage = {
      type: "",
      text: "",
      number: 0,
      displayStyle: ""
    }


    ngOnChanges(changes: SimpleChanges) {
    if (changes['tabEstado'] && changes['tabEstado'].currentValue) {
      this.LoadCatPuestoTab(this.tabEstado.poolAsigId);
      this.LoadCatTabEstados(this.tabEstado.poolAsigTabId);
    }
    }

    ngOnInit(){
      this.loadData();
      this.LoadCatPuestos();
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
        this.catPuestos = this.catPuestos.filter(p => p.publico);
    
        if (this.catPuestos) {
          this.catPuestos.unshift(vacio);
        }      
  
      });  
  }

    LoadCatPuestoTab(puestoId: number){

      this.catPuestoTab = [];
      this.catTabEstados = [];

      if(!puestoId || puestoId === 0){
        
        return;
      }

      var req : PuestoTabGetAllReq = {
        puestoId: puestoId,
        ctrl_app_action: ""
      }

      this.puestoTabService.getAll(req).subscribe(puestoTab => {
        console.log("load puesto tab for puestoId: " + puestoId);
        this.catPuestoTab = puestoTab;

        const vacio : PuestoTabGetAllRes = {
          id:0,
          puestoId:0,
          puestoTitulo: '',
          tableroId:0,
          tableroNombre: '',
          principal: false,
          borrado: false
        };

        if (this.catPuestoTab) {
          this.catPuestoTab.unshift(vacio);
        }
        
        console.log(this.catPuestoTab);
      });
    }  

    LoadCatAsigPuestoTab(puestoId: number){

      this.catAsigPuestoTab = [];
      this.catAsigTabEstados = [];

      if(!puestoId || puestoId === 0){
        
        return;
      }

      var req : PuestoTabGetAllReq = {
        puestoId: puestoId,
        ctrl_app_action: ""
      }

      this.puestoTabService.getAll(req).subscribe(puestoTab => {
        console.log("load puesto tab for puestoId: " + puestoId);
        this.catAsigPuestoTab = puestoTab;

        const vacio : PuestoTabGetAllRes = {
          id:0,
          puestoId:0,
          puestoTitulo: '',
          tableroId:0,
          tableroNombre: '',
          principal: false,
          borrado: false
        };

        if (this.catAsigPuestoTab) {
          this.catAsigPuestoTab.unshift(vacio);
        }

        console.log(this.catAsigPuestoTab);
      });
    }  

    LoadCatTabEstados(tableroId: number){

      this.catTabEstados = [];

      if(!tableroId || tableroId === 0){
        
        return;
      }

      var req : TabEstadosGetAllReq = {
        tableroId: tableroId,
        ctrl_app_action: ""
      }

      this.tabEstadoService.getAll(req).subscribe(estados => {
        console.log("load tablero estatus for tableroId: " + tableroId);
        this.catTabEstados = estados;
        //console.log(estados);
      });
    }

    LoadCatAsigTabEstados(tableroId: number){

      this.catAsigTabEstados = [];

      if(!tableroId || tableroId === 0){
        
        return;
      }

      var req : TabEstadosGetAllReq = {
        tableroId: tableroId,
        ctrl_app_action: ""
      }

      this.tabEstadoService.getAll(req).subscribe(estados => {
        console.log("load tablero estatus for tableroId: " + tableroId);
        this.catAsigTabEstados = estados;
        //console.log(estados);
      });
    }

    loadData(){
      this.posiciones = [1,2,3,4,5,6,7,8,9,10,11,12];
  
      //this.busy_indicator.nativeElement.active = true;
      this.estadosService.getAll("").subscribe(estados => {
        //this.busy_indicator.nativeElement.active = false;
        console.log(estados);
        this.estados = estados;
        //this.setSelectValues();
        //console.log(this.usuarios)
      });
  
    }
  
    clearDialog(){
       //this.oSelectEstadoId.nativeElement.value= 0;
       this.oSelectEstadoId.nativeElement.value = 0;
       this.oSelectPosicionInput.nativeElement.value = 0;
       this.oDialogPuestoIdInput.nativeElement.value = 0;
       this.oDialogTableroInput.nativeElement.value = 0;
       this.oDialogEstadoInput.nativeElement.value = 0;
       this.oDialogAsigPuestoIdInput.nativeElement.value = 0;
       this.oDialogAsigTableroInput.nativeElement.value = 0;
       this.oDialogAsigEstadoInput.nativeElement.value = 0;
       this.oDialogCierraAsigInput.nativeElement.checked = false;
  
      this._renderer.setAttribute(this.oSelectEstadoId.nativeElement, 'value-state', 'None'); 
      this._renderer.setAttribute(this.oSelectPosicionInput.nativeElement, 'value-state', 'None');
    }  
    
    handleCrearEstado(){
      this.oDialogCreateEstado.nativeElement.open = true;
    }
  
    resetStatusDialog(){
       this._renderer.setAttribute(this.oSelectEstadoId.nativeElement, 'value-state', 'None');
       this._renderer.setAttribute(this.oSelectPosicionInput.nativeElement, 'value-state', 'None');
      this.nombreErrMsg = "";
  
    }
  
    closeAppMessage(){
      this.message  = {
        type: "",
        text: "",
        number: 0,
        displayStyle: ""
      }
    }
  
  
  
    close(){
      var resultMessages: AppMsg[] = [];
      this.clearDialog();
      this.cerrar.emit({
        resultMsg:resultMessages,
        reloadData: 0
      });
    } 
  
    guardar(){
      var error : boolean = false
      this.resetStatusDialog();


      this.tabEstado.estadoId = Number(this.oSelectEstadoId.nativeElement.value);
      this.tabEstado.posicion = Number(this.oSelectPosicionInput.nativeElement.value);
      this.tabEstado.poolAsigId = Number(this.oDialogPuestoIdInput.nativeElement.value);
      this.tabEstado.poolAsigTabId = Number(this.oDialogTableroInput.nativeElement.value);
      this.tabEstado.poolAsigEdoId = Number(this.oDialogEstadoInput.nativeElement.value);
      this.tabEstado.asigAPuestoId = Number(this.oDialogAsigPuestoIdInput.nativeElement.value);
      this.tabEstado.asigATabId = Number(this.oDialogAsigTableroInput.nativeElement.value);
      this.tabEstado.asigAEdoId = Number(this.oDialogAsigEstadoInput.nativeElement.value);
      this.tabEstado.cierraAsig = this.oDialogCierraAsigInput.nativeElement.checked;

      console.log(this.tabEstado);

      if (!this.tabEstado.estadoId || this.tabEstado.estadoId == 0){
        this._renderer.setAttribute(this.oSelectEstadoId.nativeElement, 'value-state', 'Negative');
        error = true
      }

      if (!error){
        this.tabEstadosService.Edit(this.tabEstado).subscribe(response =>{
          console.log(response);

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
            //this.clearDialog();
            this.cerrar.emit({
              resultMsg: response.messages,
              reloadData: 1
            });  
          }
      
        });
      }

    }
  
    handleCloseCreateEstado($event){
      var resultMsg = $event.resultMsg;

      resultMsg.forEach(msg => {
          this.message  = {
            type: msg.type,
            text: msg.text,
            number: 0,
            displayStyle: ""
          }        

        });
     if($event.reloadData){
        this.loadData();
      } 
        
      this.oDialogCreateEstado.nativeElement.open = false; 
  }

  // Evento cuando cambia la selección del listado "Pool Asig Puesto"
  onPoolAsigPuestoChange(event: any): void {
    // Para web components de UI5, el valor puede venir en target.value y el texto en detail.selectedOption
    const selectEl = event?.target as any;
    const value = selectEl?.value;
    //const selectedOption = event?.detail?.selectedOption as HTMLElement | undefined;
    //const text = selectedOption?.textContent?.trim();

      this.tabEstado.poolAsigId = Number(value);
      this.LoadCatPuestoTab(this.tabEstado.poolAsigId);
      console.log('Pool Asig Puesto changed:', { value });

  }

  onAsigAPuestoChange(event: any): void {
    // Para web components de UI5, el valor puede venir en target.value y el texto en detail.selectedOption
    const selectEl = event?.target as any;
    const value = selectEl?.value;
    //const selectedOption = event?.detail?.selectedOption as HTMLElement | undefined;
    //const text = selectedOption?.textContent?.trim();

      this.tabEstado.asigAPuestoId = Number(value);
      this.LoadCatAsigPuestoTab(this.tabEstado.asigAPuestoId);
      console.log(' Asig A Puesto changed:', { value });

  }

  onPoolAsigTableroChange(event: any): void {
    // Para web components de UI5, el valor puede venir en target.value y el texto en detail.selectedOption
    const selectEl = event?.target as any;
    const value = selectEl?.value;
    //const selectedOption = event?.detail?.selectedOption as HTMLElement | undefined;
    //const text = selectedOption?.textContent?.trim();
    this.tabEstado.poolAsigTabId = Number(value);
    this.LoadCatTabEstados(this.tabEstado.poolAsigTabId);
    console.log('Pool Asig Tablero changed:', { value });
  }

  onAsigATableroChange(event: any): void {
    // Para web components de UI5, el valor puede venir en target.value y el texto en detail.selectedOption
    const selectEl = event?.target as any;
    const value = selectEl?.value;
    //const selectedOption = event?.detail?.selectedOption as HTMLElement | undefined;
    //const text = selectedOption?.textContent?.trim();|
    this.tabEstado.asigATabId = Number(value);
    this.LoadCatAsigTabEstados(this.tabEstado.asigATabId);
    console.log('Asig A Tablero changed:', { value });
  }


}
