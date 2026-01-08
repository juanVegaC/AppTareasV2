import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TablerosGetAllRes } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllRes';
import { TabEstadosGetAllReq } from '../../../../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllReq';
import { TabEstadosService } from '../../../../_services/tab-estados.service';
import { MessageService } from '../../../../_services/message.service';
import { TabEstadosGetAllRes } from '../../../../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllRes';
import { TabEstadoEditReq } from '../../../../_models/TabEstado/TabEstadoEdit/TabEstadoEditReq';

@Component({
  selector: 'app-lista-tabestados',
  templateUrl: './lista-tabestados.component.html',
  styleUrl: './lista-tabestados.component.css'
})
export class ListaTabestadosComponent implements OnChanges {


    constructor(
      private tabEstadoService: TabEstadosService,
      private messageService: MessageService) { }

    @ViewChild('dialogAddEstado') oDialogAddEstado: ElementRef;
    @ViewChild('dialogEditEstado') oDialogEdit: ElementRef;

    @Input() tablero: TablerosGetAllRes;

    tabEstados: Array<TabEstadosGetAllRes>;

    tabEstadoEdit: TabEstadoEditReq = {
      id:0,
      tableroId:0,
      estadoId:0,
      posicion:0,
      poolAsigId:0,
      poolAsigTabId:0,
      poolAsigEdoId:0,
      asigAPuestoId:0,
      asigATabId:0,
      asigAEdoId:0,
      cierraAsig:false
    };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tablero'] && changes['tablero'].currentValue) {
      this.loadData(this.tablero.id);
    }
  }
    


    loadData(tableroId: number){

      this.tabEstados = [];

      if(!tableroId || tableroId === 0){
        
        return;
      }

      var req : TabEstadosGetAllReq = {
        tableroId: tableroId,
        ctrl_app_action: ""
      }

      this.tabEstadoService.getAll(req).subscribe(estados => {
        console.log("load tablero estatus for tableroId: " + tableroId);
        this.tabEstados = estados;
        //console.log(estados);
      });
    }

    handleAddEstado(){
      if(this.tablero.id==0){
        this.messageService.setMessage({type:"E",text:"Debe seleccionar un tablero para agregar un estado",number:101, displayStyle:""});
        return;
      }

      this.oDialogAddEstado.nativeElement.open = true;
      
  }
  
    handleCloseAdd($event){
      var resultMsg = $event.resultMsg;
      //this.tableroAdd.ctrl_app_active = false;
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
     if($event.reloadData){
        this.loadData(this.tablero.id);
      } 
      this.oDialogAddEstado.nativeElement.open = false;
  }
    
    handleCloseEdit($event){
      var resultMsg = $event.resultMsg;
      this.tabEstadoEdit= {
      id:0,
      tableroId:0,
      estadoId:0,
      posicion:0,
      poolAsigId:0,
      poolAsigTabId:0,
      poolAsigEdoId:0,
      asigAPuestoId:0,
      asigATabId:0,
      asigAEdoId:0,
      cierraAsig:false
      };

      //this.tableroAdd.ctrl_app_active = false;
      console.log(this.tabEstadoEdit);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
     if($event.reloadData){
        this.loadData(this.tablero.id);
      } 
      this.oDialogEdit.nativeElement.open = false;
  }  

      handleEdit($event, id){
      var estado = this.getTabEstadoFromId(id);
      console.log(estado);
       this.tabEstadoEdit ={
        id: estado.id,
        tableroId: estado.tableroId,
        estadoId: estado.estadoId,
        posicion: estado.posicion,
        poolAsigId: estado.poolAsigId,
        poolAsigTabId: estado.poolAsigTabId,
        poolAsigEdoId: estado.poolAsigEdoId,
        asigAPuestoId: estado.asigAPuestoId,
        asigATabId: estado.asigATabId,
        asigAEdoId: estado.asigAEdoId,
        cierraAsig: estado.cierraAsig
      }
      this.oDialogEdit.nativeElement.open = true;
  
    }


  getTabEstadoFromId(id):TabEstadosGetAllRes{
      var result : TabEstadosGetAllRes;
      this.tabEstados.forEach(estado => {
        if(estado.id == id){

          result= estado;
        }
    });
      return result;
    }

}
