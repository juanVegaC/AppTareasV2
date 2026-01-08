import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PuestoTabService } from '../../../../_services/puesto-tab.service';
import { MessageService } from '../../../../_services/message.service';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { PuestoTabGetAllRes } from '../../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllRes';
import { PuestoTabGetAllReq } from '../../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllReq';
import { PuestoTabEditReq } from '../../../../_models/PuestoTab/PuestoTabEdit/PuestoTabEditReq';

@Component({
  selector: 'app-lista-puestotab',
  templateUrl: './lista-puestotab.component.html',
  styleUrl: './lista-puestotab.component.css'
})
export class ListaPuestotabComponent implements OnChanges {
    constructor(
      private puestoTabService: PuestoTabService,
      private messageService: MessageService) { }

    @ViewChild('dialogAdd') oDialogAdd: ElementRef;
    @ViewChild('dialogEdit') oDialogEdit: ElementRef;

    @Input() puesto: PuestosGetAllRes;

    puestoTab: Array<PuestoTabGetAllRes>;

    puestoTabEdit: PuestoTabEditReq = {
      id:0,
      puestoId:0,
      tableroId:0,
      principal:false,
      borrado:false
    }; 

   ngOnChanges(changes: SimpleChanges) {
    if (changes['puesto'] && changes['puesto'].currentValue) {
      this.loadData(this.puesto.id);
    }
  } 
    


    loadData(puestoId: number){

      this.puestoTab = [];

      if(!puestoId || puestoId === 0){
        
        return;
      }

      var req : PuestoTabGetAllReq = {
        puestoId: puestoId,
        ctrl_app_action: ""
      }

      this.puestoTabService.getAll(req).subscribe(puestoTab => {
        console.log("load puesto tab for puestoId: " + puestoId);
        this.puestoTab = puestoTab;
        console.log(this.puestoTab);
      });
    }

   handleAdd(){

       if(this.puesto.id==0){
        this.messageService.setMessage({type:"E",text:"Debe seleccionar un puesto para agregar un tablero",number:101, displayStyle:""});
        return;
      }

      this.oDialogAdd.nativeElement.open = true; 
      
  }
  
     handleCloseAdd($event){

      var resultMsg = $event.resultMsg;
      //this.tableroAdd.ctrl_app_active = false;
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
     if($event.reloadData){
        this.loadData(this.puesto.id);
      } 
      this.oDialogAdd.nativeElement.open = false; 
  }
     


    handleCloseEdit($event){

    var resultMsg = $event.resultMsg;

    this.puestoTabEdit = {
      id:0,
      puestoId:0,
      tableroId:0,
      principal:false,
      borrado:false
    }; 
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
     if($event.reloadData){
        this.loadData(this.puesto.id);
      } 
      this.oDialogEdit.nativeElement.open = false; 

  }  

       handleEdit($event, id){

       var puestoTab = this.getPuestoTabFromId(id);
      console.log(puestoTab);
    this.puestoTabEdit = {
      id: puestoTab.id,
      puestoId: puestoTab.puestoId,
      tableroId: puestoTab.tableroId,
      principal: puestoTab.principal,
      borrado:puestoTab.borrado
    }; 
      this.oDialogEdit.nativeElement.open = true; 
  
    } 


   getPuestoTabFromId(id):PuestoTabGetAllRes{
      var result : PuestoTabGetAllRes;
      this.puestoTab.forEach(tab => {
        if(tab.id == id){

          result= tab;
        }
    });
      return result;
    } 

}
