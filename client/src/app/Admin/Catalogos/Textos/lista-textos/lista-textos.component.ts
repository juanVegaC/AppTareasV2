import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';
import { MessageService } from '../../../../_services/message.service';
import { TextosGetAllRes } from '../../../../_models/Textos/TextosGetAll/TextosGetAllRes';
import { TextosGetAllReq } from '../../../../_models/Textos/TextosGetAll/TextosGetAllReq';
import { TextoService } from '../../../../_services/texto.service';
import { TextoCreateReq } from '../../../../_models/Textos/TextoCreate/TextoCreateReq';
import { TextoEditReq } from '../../../../_models/Textos/TextoEdit/TextoEditReq';

@Component({
    selector: 'app-lista-textos',
    templateUrl: './lista-textos.component.html',
    styleUrl: './lista-textos.component.css',
    standalone: false
})
export class ListaTextosComponent implements AfterViewInit {

  constructor(
    private navService: NavigationService,
    private textoService: TextoService,
    private messageService: MessageService) { }

    @ViewChild('busy_indicator') busy_indicator: ElementRef;
    @ViewChild('dialogAdd') oDialogAdd: ElementRef;
    @ViewChild('dialogEdit') oDialogEdit: ElementRef;

    textos: Array<TextosGetAllRes>;

    textoAdd: TextoCreateReq ={
      textoId:0,
      idioma:"ES",
      texto:"",  
      ctrl_app_active:false,         
    }
  
    textoEdit: TextoEditReq ={
      id:0,
      textoId:0,
      idioma:"",
      texto:"",  
      borrado:false,
      ctrl_app_active:false,         
    }
  

  handleRegresar(){
    this.navService.goToCatMenu();
  }

  ngAfterViewInit() {
    this.loadData();
  }


  loadData(){
    var param : TextosGetAllReq ={
      ctrl_app_action: "TEXTOS_GET_ALL"
    }

    this.busy_indicator.nativeElement.active = true;
    this.textoService.getTextos(param).subscribe(textos => {
      this.busy_indicator.nativeElement.active = false;
      console.log(textos);
      this.textos = textos;
      //console.log(this.usuarios)
    });

  }


  handleAdd(){
    this.textoAdd ={
      textoId:0,
      idioma:"ES",
      texto:"",  
      ctrl_app_active:false,         
    }
    this.textoAdd.ctrl_app_active = true;
     this.oDialogAdd.nativeElement.open = true;
  }
  

  reLoadData(){
    this.textos = [];
    this.loadData();
  }

  handleEdit($event, id){
    var texto = this.getTextoFromId(id);
    //console.log(puesto);
    this.textoEdit ={
      id:texto.id,
      textoId:texto.textoId,
      idioma:texto.idioma,
      texto:texto.texto,  
      borrado:texto.borrado,
      ctrl_app_active:true,         
    }
    this.oDialogEdit.nativeElement.open = true;

  }

  handleCloseAdd($event){
    var resultMsg = $event.resultMsg;
    this.textoAdd.ctrl_app_active = false;
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
    this.textoEdit.ctrl_app_active = false;
    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadData){
      this.reLoadData();
    }  
    this.oDialogEdit.nativeElement.open = false;
  }

  getTextoFromId(id):TextosGetAllRes{
    var result : TextosGetAllRes;
    this.textos.forEach(texto => {
      if(texto.id == id){

        result= texto;
      }
  });  
    return result;
  }

}
