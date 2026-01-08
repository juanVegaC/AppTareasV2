import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';
import { MessageService } from '../../../../_services/message.service';
import { PuestoService } from '../../../../_services/puesto.service';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { PuestosGetAllReq } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllReq';
import { PuestoEditReq } from '../../../../_models/Puesto/PuestoEdit/PuestoEditReq';
import { PuestoCreateReq } from '../../../../_models/Puesto/PuestoCreate/PuestoCreateReq';

@Component({
  selector: 'app-lista-puestos',
  templateUrl: './lista-puestos.component.html',
  styleUrl: './lista-puestos.component.css'
})
export class ListaPuestosComponent implements AfterViewInit {

  constructor(
    private navService: NavigationService,
    private puestoService: PuestoService,
    private messageService: MessageService) { }

  @ViewChild('busy_indicator') busy_indicator: ElementRef;
  @ViewChild('dialogEdit') oDialogEdit: ElementRef;
  @ViewChild('dialogAdd') oDialogAdd: ElementRef;

  puestos: Array<PuestosGetAllRes>;
  sortOrder = 'asc';

  puestoSelected: PuestosGetAllRes = {
    id:0,
    titulo:"",
    borrado:false,
    puestoSupId:0,
    puestoSupTitulo:"",
    publico:false,
    
  }

  puestoAdd: PuestoCreateReq ={
    titulo:"",
    puestoSupId:0,
    publico:false,  
    ctrl_app_active:false,         
  }

  puestoEdit: PuestoEditReq ={
    id:0,
    titulo:"",
    borrado:false,
    puestoSupId:0,
    publico:false,  
    ctrl_app_active:false,         
  }


  ngAfterViewInit() {
    this.loadData();
  }

  ordenarPorPuestoSuperior() {
    this.puestos.sort((a, b) => {
      const valA = a.puestoSupTitulo ? a.puestoSupTitulo.toLowerCase() : '';
      const valB = b.puestoSupTitulo ? b.puestoSupTitulo.toLowerCase() : '';
      if (valA < valB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  handleRegresar(){
    this.navService.goToCatMenu();
  }

  handleAdd(){
    this.puestoAdd.ctrl_app_active = true;
     this.oDialogAdd.nativeElement.open = true;
  }

  reLoadData(){
    this.puestos = [];
    this.puestoSelected = {
    id:0,
    titulo:"",
    borrado:false,
    puestoSupId:0,
    puestoSupTitulo:"",
    publico:false,
    
    }

    this.loadData();
  }

  loadData(){

    var param : PuestosGetAllReq ={
      ctrl_app_action: "PUESTOS_ALL"
    }
    this.busy_indicator.nativeElement.active = true;
    this.puestoService.getPuestos(param).subscribe(puestos => {
      this.busy_indicator.nativeElement.active = false;
      console.log(puestos);
      this.puestos = puestos;
      //console.log(this.usuarios)
    });

  }

handleSelectPuesto(puestoId){
      console.log("select puesto id: " + puestoId);
      this.puestoSelected = this.getPuestoFromId(puestoId);
    }

  handleEdit($event, id){
      
    var puesto = this.getPuestoFromId(id);
    //console.log(puesto);
    this.puestoEdit ={
      id:puesto.id,
      titulo:puesto.titulo,
      borrado:puesto.borrado,
      puestoSupId:puesto.puestoSupId,
      publico:puesto.publico,  
      ctrl_app_active:true,  
    }
    this.oDialogEdit.nativeElement.open = true;

  }

  getPuestoFromId(id):PuestosGetAllRes{
    var result : PuestosGetAllRes;
    this.puestos.forEach(puesto => {
      if(puesto.id == id){

        result= puesto;
      }
  });  
    return result;
  }

  handleCloseEdit($event){
    var resultMsg = $event.resultMsg;
    this.puestoEdit ={
    id:0,
    titulo:"",
    borrado:false,
    puestoSupId:0,
    publico:false,  
    ctrl_app_active:false,         
  }

    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadData){
      this.reLoadData();
    }  
    this.oDialogEdit.nativeElement.open = false;
  }

  handleCloseAdd($event){
    var resultMsg = $event.resultMsg;
    this.puestoAdd ={
    titulo:"",
    puestoSupId:0,
    publico:false,  
    ctrl_app_active:false,         
  }
    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadData){
      this.reLoadData();
    }  
    this.oDialogAdd.nativeElement.open = false;
  }

}
