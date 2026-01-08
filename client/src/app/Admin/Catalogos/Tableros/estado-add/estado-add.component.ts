import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TablerosGetAllRes } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllRes';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { appMessage } from '../../../../_models/appMessage';
import { EstadosService } from '../../../../_services/estados.service';
import { EstadosGetAllReq } from '../../../../_models/Estado/EstadosGetAll/EstadosGetAllReq';
import { EstadosGetAllRes } from '../../../../_models/Estado/EstadosGetAll/EstadosGetAllRes';
import { TabEstadoCreateReq } from '../../../../_models/TabEstado/TabEstadoCreate/TabEstadoCreateReq';
import { TabEstadosService } from '../../../../_services/tab-estados.service';

@Component({
  selector: 'app-estado-add',
  templateUrl: './estado-add.component.html',
  styleUrl: './estado-add.component.css'
})
export class EstadoAddComponent {
    constructor(
      private _renderer: Renderer2,
      private estadosService: EstadosService,
      private tabEstadosService: TabEstadosService
     ){
    }


    @Input() tablero: TablerosGetAllRes;

    @Output() cerrar = new EventEmitter();

    @ViewChild('oDialogEstadoInput') oSelectEstadoId: ElementRef;
    @ViewChild('oDialogPosicionInput') oSelectPosicionInput: ElementRef;
    @ViewChild('dialogCreateEstado') oDialogCreateEstado: ElementRef;

    estados: Array<EstadosGetAllRes>;

    posiciones: Array<Number> = [1,2,3,4,5,6,7,8,9,10,11,12];

    tabEstadoAsigna: TabEstadoCreateReq = {
      tableroId:0,
      estadoId:0,
      posicion:0,
    }
    nombreErrMsg: string = ""
  
  
    message: appMessage = {
      type: "",
      text: "",
      number: 0,
      displayStyle: ""
    }


    ngOnInit(){
      this.loadData();
    }
  

    loadData(){
  
      //this.busy_indicator.nativeElement.active = true;
      this.estadosService.getAll("").subscribe(estados => {
        //this.busy_indicator.nativeElement.active = false;
        console.log(estados);
        this.estados = estados;
        //console.log(this.usuarios)
      });
  
    }
  
    clearDialog(){
       //this.oSelectEstadoId.nativeElement.value= 0;
  
      this._renderer.setAttribute(this.oSelectEstadoId.nativeElement, 'value-state', 'None'); 
    }  
    
    handleCrearEstado(){
      this.oDialogCreateEstado.nativeElement.open = true;
    }
  
    resetStatusDialog(){
       this._renderer.setAttribute(this.oSelectEstadoId.nativeElement, 'value-state', 'None');
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
      this.resetStatusDialog();
      this.cerrar.emit({
        resultMsg:resultMessages,
        reloadData: 0
      });
    } 
  
    guardar(){
      var error : boolean = false
      this.resetStatusDialog();


      this.tabEstadoAsigna.estadoId = Number(this.oSelectEstadoId.nativeElement.value);
      this.tabEstadoAsigna.posicion = Number(this.oSelectPosicionInput.nativeElement.value);
      this.tabEstadoAsigna.tableroId = this.tablero.id;
      console.log(this.tabEstadoAsigna);

      if (!this.tabEstadoAsigna.estadoId || this.tabEstadoAsigna.estadoId == 0){
        this._renderer.setAttribute(this.oSelectEstadoId.nativeElement, 'value-state', 'Negative');
        error = true
      }

      if (!error){
        this.tabEstadosService.Create(this.tabEstadoAsigna).subscribe(response =>{
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

}
