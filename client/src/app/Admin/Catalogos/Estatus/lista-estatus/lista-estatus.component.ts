import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';
import { MessageService } from '../../../../_services/message.service';
import { EstatusGetAllRes } from '../../../../_models/Estatus/EstatusGetAll/EstatusGetAllRes';
import { EstatusGetAllReq } from '../../../../_models/Estatus/EstatusGetAll/EstatusGetAllReq';
import { EstatusService } from '../../../../_services/estatus.service';
import { EstatusCreateReq } from '../../../../_models/Estatus/EstatusCreate/EstatusCreateReq';
import { EstatusEditReq } from '../../../../_models/Estatus/EstatusEdit/EstatusEditReq';

@Component({
  selector: 'app-lista-estatus',
  templateUrl: './lista-estatus.component.html',
  styleUrl: './lista-estatus.component.css'
})
export class ListaEstatusComponent implements AfterViewInit{

  constructor(
    private navService: NavigationService,
    private estatusService: EstatusService,
    private messageService: MessageService) { }


    @ViewChild('busy_indicator') busy_indicator: ElementRef;
    @ViewChild('dialogAdd') oDialogAdd: ElementRef;
    @ViewChild('dialogEdit') oDialogEdit: ElementRef;

    
    estatus: Array<EstatusGetAllRes>;
    estatusAdd: EstatusCreateReq = {
      tipo:"ASIGNACION",
      estatus:0,
      textoId:0,   
      ctrl_app_active:false,    
    }

    estatusEdit: EstatusEditReq = {
      id:0,
      tipo:"",
      estatus:0,
      textoId:0,   
      borrado:false,
      ctrl_app_active:false,    
    }


  handleRegresar(){
    this.navService.goToCatMenu();
  }

  handleAdd(){
    this.estatusAdd = {
      tipo:"ASIGNACION",
      estatus:0,
      textoId:0,
      ctrl_app_active:false,
     }

    this.estatusAdd.ctrl_app_active = true;
    this.oDialogAdd.nativeElement.open = true;

  }

  handleCloseAdd($event){
    var resultMsg = $event.resultMsg;
    this.estatusAdd.ctrl_app_active = false;
    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadData){
      this.reLoadData();
    }  
    this.oDialogAdd.nativeElement.open = false;
  }

  ngAfterViewInit() {
    this.loadData();
  }

  reLoadData(){
    this.estatus = [];
    this.loadData();
  }

  loadData(){
    var param : EstatusGetAllReq ={
      ctrl_app_action: "ESTATUS_GET_ALL"
    }

    this.busy_indicator.nativeElement.active = true;
    this.estatusService.getCatEstatus(param).subscribe(estatus => {
      this.busy_indicator.nativeElement.active = false;
      //console.log(textos);
      this.estatus = estatus;
      //console.log(this.usuarios)
    });

  }


  handleEdit($event, id){
    var estatus = this.getEstatusFromId(id);

    this.estatusEdit = {
      id:estatus.id,
      tipo:estatus.tipo,
      estatus:estatus.estatus,
      textoId:estatus.textoId,   
      borrado:estatus.borrado,
      ctrl_app_active:false,    
    }

    this.oDialogEdit.nativeElement.open = true;
  }

  handleCloseEdit($event){
    var resultMsg = $event.resultMsg;
    this.estatusEdit.ctrl_app_active = false;
    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadData){
      this.reLoadData();
    }  
    this.oDialogEdit.nativeElement.open = false;
  }


  getEstatusFromId(id):EstatusGetAllRes{
    var result : EstatusGetAllRes;
    this.estatus.forEach(estatus => {
      if(estatus.id == id){

        result= estatus;
      }
  });  
    return result;
  }


}
