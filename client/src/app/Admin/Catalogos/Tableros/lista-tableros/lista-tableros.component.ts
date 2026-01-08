import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';
import { TableroService } from '../../../../_services/tablero.service';
import { MessageService } from '../../../../_services/message.service';
import { TableroCreateReq } from '../../../../_models/Tableros/TableroCreate/TableroCreateReq';
import { TablerosGetAllRes } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllRes';
import { TablerosGetAllReq } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllReq';
import { TablerosEstatusGetAllRes } from '../../../../_models/TableroEstatus/TableroEstatusGet/TableroEstatusGetAll';
import { TableroEditReq } from '../../../../_models/Tableros/TableroEdit/TableroEditReq';

@Component({
  selector: 'app-lista-tableros',
  templateUrl: './lista-tableros.component.html',
  styleUrl: './lista-tableros.component.css'
})
export class ListaTablerosComponent {

    constructor(
      private navService: NavigationService,
      private tableroService: TableroService,
      private messageService: MessageService) { }
  
      @ViewChild('busy_indicator') busy_indicator: ElementRef;
      @ViewChild('dialogAdd') oDialogAdd: ElementRef;      
      @ViewChild('dialogEdit') oDialogEdit: ElementRef;
  
      tableros: Array<TablerosGetAllRes>;
      tableroEstatus: Array<TablerosEstatusGetAllRes>;

      

      tableroSelected: TablerosGetAllRes = {
        id:0,
        nombre:"",
        version:0,
        borrado:false

      }
  
      tableroAdd: TableroCreateReq ={
        nombre:"",
        ctrl_app_active:false,         
      }

      tableroEdit: TableroEditReq = {
        id:0,
        nombre:"",
        borrado:false,         
      }

/*       textoEdit: TextoEditReq ={
        id:0,
        textoId:0,
        idioma:"",
        texto:"",  
        borrado:false,
        ctrl_app_active:false,         
      } */
    
  
    handleRegresar(){
      this.navService.goToCatMenu();
    }
  
    ngAfterViewInit() {
      this.loadData();
    }
  
  
    loadData(){
      var param : TablerosGetAllReq ={
        Id: 0
      }
  
      this.busy_indicator.nativeElement.active = true;
      this.tableroService.getAll(param).subscribe(tableros => {
        this.busy_indicator.nativeElement.active = false;
        console.log(tableros);
        this.tableros = tableros;
        //console.log(this.usuarios)
      });
  
    }
  
  handleSelectTablero(tableroId){
      console.log("select tablero id: " + tableroId);
      this.tableroSelected = this.getTableroFromId(tableroId);
/*       if (this.tableroSelected.id!=0){
      this.loadTabEstados(tableroId);      
      } */

    }
  
    handleAdd(){
      this.tableroAdd ={
        nombre:"",
        ctrl_app_active:false,         
      }
      this.tableroAdd.ctrl_app_active = true;
       this.oDialogAdd.nativeElement.open = true;
    }
    

    reLoadData(){
      this.tableros = [];
      this.loadData();
    }
  
    handleEdit($event, id){
      var tablero = this.getTableroFromId(id);
      //console.log(puesto);
       this.tableroEdit ={
        id:tablero.id,
        nombre:tablero.nombre,
        borrado:tablero.borrado,         
      }
      this.oDialogEdit.nativeElement.open = true;
  
    }

/*     handleRowClick($event){
      const id = $event.detail.row.cells[0].innerText;
      console.log("row click: " + $event);
      //console.log("row click id: " + id);
      this.loadTableroEstatus(id);
    } */

  
    handleCloseAdd($event){
      var resultMsg = $event.resultMsg;
      this.tableroAdd.ctrl_app_active = false;
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
      this.tableroEdit = {
        id:0,
        nombre:"",
        borrado:false,         
      }
      /* this.textoEdit.ctrl_app_active = false; */
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });

      if($event.reloadData){
        this.reLoadData();
      }  
      this.oDialogEdit.nativeElement.open = false;
    }
  
    getTableroFromId(id):TablerosGetAllRes{
      var result : TablerosGetAllRes;
      this.tableros.forEach(tablero => {
        if(tablero.id == id){
  
          result= tablero;
        }
    });  
      return result;
    }
  
}
