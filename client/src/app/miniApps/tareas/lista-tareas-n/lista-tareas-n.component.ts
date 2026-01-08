import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { STareasPorPuestoDto } from '../../../_models/Tarea/STareasPorPuestoDto';
import { SPuestoPorUsuarioDto } from '../../../_models/Puesto/SPuestoPorUsuarioDto';
import { filterTareas } from '../../../_models/filters/filterTareas';
import { TareaActionData } from '../../../_models/Tarea/TareaAction/TareaActionData';
import { TareaEditReqDat } from '../../../_models/Tarea/TareaEdit/TareaEditReqDat';
import { AsignarTareaData } from '../../../_models/Tarea/TareaAsigna/AsignarTareaData';
import { TareaAvanceCreateData } from '../../../_models/Tarea/TareaAvance/TareaAvanceCreateData';
import { TareaSelectedData } from '../../../_models/Tarea/TareaSelected/TareaSelectedDat';
import { TareaService } from '../../../_services/tarea.service';
import { DatePipe } from '@angular/common';
import { MessageService } from '../../../_services/message.service';
import { DeleteTareaData } from '../../../_models/Tarea/TareaDelete/DeleteTareaDto';
import { UpdateTareaPrioridad } from '../../../_models/Tarea/UpdateTareaPrioridad';
import { ActividadesAsigParam } from '../../../_models/Actividad/ActividadesAsigParam';
import { SListaTareasNViewConfig } from '../../../_views/config/SListaTareasNViewConfig';
import { SListaActividadesViewConfig } from '../../../_views/config/SListaActividadesViewConfig';
import { SListaPrioridadesViewConfig } from '../../../_views/config/SListaPrioridadesViewConfig';

@Component({
    selector: 'app-lista-tareas-n',
    templateUrl: './lista-tareas-n.component.html',
    styleUrl: './lista-tareas-n.component.css',
    standalone: false
})
export class ListaTareasNComponent {
  //@Input() tareas;
	@Output() deletedItem = new EventEmitter();
	@Output() changeSelection = new EventEmitter();
	@Output() editPressed = new EventEmitter();
  @Input() puestoSelected: SPuestoPorUsuarioDto;
  @Input() configView: SListaTareasNViewConfig;
  

  @ViewChild('busy_indicator') busy_indicator: ElementRef;
  @ViewChild('dialogTareaEdit') oDialogTareaEdit: ElementRef;
  @ViewChild('dialogTareaAsigna') oDialogTareaAsigna: ElementRef;
  @ViewChild('dialogRegAvance') oDialogRegAvance: ElementRef;
  @ViewChild('dialogAsignaciones') oDialogAsignaciones: ElementRef;
  @ViewChild('dialogListaActividades') oDialogListaActividades: ElementRef;
  @ViewChild('dialogTareaDetails') oDialogTareaDetails: ElementRef;

  //@ViewChild('btnTareaAcciones') oBtnTareaAcciones: ElementRef;
  @ViewChild('btnTareaAcciones') oBtnTareaAccCurrent: ElementRef;

  @ViewChild('menuTarea') oMenuTarea: ElementRef;
  @ViewChild('popOverTareaActConf') oPopOverTareaActConf: ElementRef;
  @ViewChild('dialogTareaConfAct') oDialogTareaConfAct: ElementRef;
  @ViewChild('dialogTareaPrioridades') oDialogTareaPrioridades: ElementRef;


  tareas: Array<STareasPorPuestoDto>;

  poConfirmTareaActionConfig:TareaActionData = {
    title: "",
    text_line1: "",
  };



  oTareaCurrent: STareasPorPuestoDto;
  oTareaEdit: TareaEditReqDat;
  oTareaAsigna: AsignarTareaData;
  oAvanceCreate: TareaAvanceCreateData;

  oActvAsigParam: ActividadesAsigParam ={
    asigId: 0
  };

  oTareaSelected: TareaSelectedData = {
    id: 0,
    asigId: 0,
    ctrl_app_action: ""
  }

  oLstActvConfigView: SListaActividadesViewConfig = {
    showCierraAsigBtn : false,
    showRegAvanceBtn : false
  }

  oLstPriorConfigView: SListaPrioridadesViewConfig = {
    puestoId: 0,
    asigANombre: ""
  }

  constructor(private tareaService: TareaService,
              private datePipe: DatePipe,
              private messageService: MessageService,
              private _renderer: Renderer2){}

  ngOnChanges(changes: SimpleChanges) {
    if ( this.puestoSelected) {
      this.loadTareasData(); // Llama a ngOnInit manualmente
    }
  }
              
  
  ngOnInit(): void {
    console.log("ConfigView:");
    console.log(this.configView);
    console.log("in lista-tareas");
    this.iniOTareaCurrent();
    this.initTareaEditData();
    this.initTareaAsigna();
    this.initOActvNew();
  }

  initTareaAsigna(){
    this.oTareaAsigna = {
      id: 0,
      asigId:0,
      numero: "",
      puestoId: 0,
      newPuestoId: 0,
      ctrl_app_action: "TAREA_ASIGNA",  
      ctrl_app_active: false  
    }
  }
  initTareaEditData(){
    this.oTareaEdit = {
      id: 0,
      numero: "",
      texto: "",
      docuUrl: "",
      ctrl_app_action: "TAREA_EDIT",  
      ctrl_app_active: false    
    }
  }

  handleShowActividades(asigId:number, tareaId:number){
    //console.log("asigId: " + asigId);
    var tarea = this.getTareaFromId(tareaId);
    this.setOTareaCurrent(tarea);
    this.oLstActvConfigView = {
    showCierraAsigBtn : true,
    showRegAvanceBtn : true
    }

    this.oActvAsigParam = {
      asigId: asigId
    }
    this.oDialogListaActividades.nativeElement.open = true;
  }

    handleShowActvAtendiendo(asigId:number, tareaId:number){
    //console.log("asigId: " + asigId);
    var tarea = this.getTareaFromId(tareaId);
    this.setOTareaCurrent(tarea);
    this.oLstActvConfigView = {
    showCierraAsigBtn : false,
    showRegAvanceBtn : false
    }

    this.oActvAsigParam = {
      asigId: asigId
    }
    this.oDialogListaActividades.nativeElement.open = true;
  }


  


  handleShowPrioridades(tareaId:number){
    //console.log("asigId: " + asigId);
    var tarea = this.getTareaFromId(tareaId);
    this.setOTareaCurrent(tarea);
    this.oLstPriorConfigView = {
      puestoId: tarea.asignadoA,
      asigANombre: tarea.asignadoANombre
    }
    //console.log(this.oTareaCurrent);
    this.oDialogTareaPrioridades.nativeElement.open = true;
  }

    handleShowTareaDetails(tareaId:number){
    //console.log("asigId: " + asigId);
    var tarea = this.getTareaFromId(tareaId);
    this.setOTareaCurrent(tarea);

    this.oDialogTareaDetails.nativeElement.open = true;
  }



    handleShowPrioridadesPuesto(tareaId:number){
    //console.log("asigId: " + asigId);
    var tarea = this.getTareaFromId(tareaId);
    //tarea.asignadoA = this.puestoSelected.puestoId;
    this.oLstPriorConfigView = {
      puestoId: tarea.puestoIdPuesto,
      asigANombre: this.puestoSelected.nombre
    }

    this.setOTareaCurrent(tarea);
    //console.log(this.oTareaCurrent);
    this.oDialogTareaPrioridades.nativeElement.open = true;
  }


  getDATA(){
    return this.poConfirmTareaActionConfig.title; 
  }


  setOTareaCurrent(tarea: STareasPorPuestoDto){
    this.oTareaCurrent = tarea;
  }

  setOActvNewData(tarea: STareasPorPuestoDto,p_ctrl_app_action: string){
  }

  iniOTareaCurrent(){
      this.oTareaCurrent = {
        id: 0,
        numero: "",
        texto: "",
        docuUrl: "",
        puestoId:0,
        asigId: 0,
        prioridad:0,
        asignadoA:0,
        asignadoFe:new Date(),
        asignadoANombre:"",
        asignadoAPuesto:"",
        prioridadPuesto:0,
        avancePuesto:0,
        asigIdPuesto:0,
        puestoIdPuesto:0,
        estatus:0,
        estatusTxt:"",
        avance:0,
        asigCount:0,
        miTarea:false,
        miAsignacion:false,
        prioridadNew:0 ,
        prioridadPrev:0,
      optPrioridades:[] }
  }


  getTareaTextPreview(tareaText:string){
    if(tareaText.length > 50){
      return tareaText.substring(0,50).concat(" ...");
    }else{
      return tareaText;
    }
  }

  initOActvNew(){
      this.oAvanceCreate = {
        tareaId:0,
        tareaNumero:"",
        tareaPuestoId:0,
        texto: "",
        fecha:new Date(),
        fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
        asigId: 0,
        estatus: 0,
        avance: 0,
        actvHrs:0,
        actvMins:0,
        newPuestoId:0,
        ctrl_app_active:false
      }
  }



/*   setTitleDialogTarea(title:string){
    this._renderer.setAttribute(this.oDialogTareaAdd.nativeElement, 'header-text', title);    
  }
 */


  dateSTRtoDATE(pDate: string): Date{
    var dateSTRaux = pDate.substring(6,10) + "-" + pDate.substring(3,5) + "-" + pDate.substring(0,2);
    return new Date(dateSTRaux);
  }


  isPrioridadDisabled(tarea:STareasPorPuestoDto, tarea2:STareasPorPuestoDto){
    if(tarea.id == tarea2.id)
      return true;

    return false;
  }




  handleTareaMenu(event, tareaId, asigId) {
    this.oBtnTareaAccCurrent = event.target
    //console.log(event);
    //console.log("TareaId: " + tareaId);
    this.oTareaSelected.id = tareaId;
    this.oTareaSelected.asigId = asigId;
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.setOTareaCurrent(tarea);

    this.oMenuTarea.nativeElement.open = !this.oMenuTarea.nativeElement.open;
	}


  getUserInitial(userName: string){
    if(userName){
      var userNames = userName.split(" ");
      //console.log(userNames);
      if (userNames.length > 1){
        return userNames[0].substring(0,1) + userNames[1].substring(0,1);
      }else{
        return userNames[0].substring(0,1);
      }
    }
    else
      return "";
	}




  loadTareasData(){

    this.tareas = [];

    if(this.puestoSelected.puestoId == 0){
      return;
    }

    var filterTareas : filterTareas = {
      type: "TAREAS_DE_PUESTO",
      puestoId: String(this.puestoSelected.puestoId)
      }

    console.log(filterTareas)
    this.busy_indicator.nativeElement.active = true;
    this.tareaService.getTareas(1, 10, JSON.stringify(filterTareas)).subscribe(response => {
      //tareas2 = response.result;
      console.log(response.result);
      this.tareas = response.result;
      this.busy_indicator.nativeElement.active = false;

      //console.log(this.tareas)
    });

      //this.pagination = response.pagination;

  }

	handleDeleteItem(itemId) {
		this.deletedItem.emit(itemId);
	}

  cancelTareaAction(){
    this.oPopOverTareaActConf.nativeElement.open = false;
  }

  fTareaDeleteConfirm(){
    var tareaDelete: DeleteTareaData = {
      id:this.oTareaSelected.id,
      ctrl_app_action:this.oTareaSelected.ctrl_app_action
    }
    this.tareaService.deleteTarea(tareaDelete).subscribe(response =>{
      //console.log(response);
      response.messages.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
  
      this.loadTareasData();
    }); 
  }


  handleTareaEdit(event){
    console.log(event);
    if (event.detail.text == "Borrar"){
      this.fTareaDelete();
    }else if(event.detail.text == "Editar"){      
      this.fTareaEdit();
    }else if(event.detail.text == "Asignar"){
      this.fTareaAsigna();
    }else if(event.detail.text == "Desasignar"){
      this.fTareaDesAsigna();
    }else if(event.detail.text == "Reg.Avance"){
      this.fTareaRegAvance();
    }
  }

  fTareaRegAvance(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.oAvanceCreate = {
      tareaId:tarea.id,
      tareaNumero:tarea.numero,
      tareaPuestoId:tarea.puestoId,
      texto:"",
      fecha:new Date(),
      fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
      asigId: 0,
      estatus: tarea.estatus,
      avance: 0,
      actvHrs:0,
      actvMins:0,    
      newPuestoId:0,  
      ctrl_app_active: true
    };  
    this.oDialogRegAvance.nativeElement.open = true;
  }

  fTareaAsigna(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    
    this.oTareaAsigna = {
      id: tarea.id,
      asigId: tarea.asigId,
      numero:tarea.numero,
      puestoId: this.puestoSelected.puestoId,
      newPuestoId: 0,
      ctrl_app_action: "TAREA_ASIGNA",
      ctrl_app_active: true 
    }
    //console.log(tarea);
    this.oDialogTareaAsigna.nativeElement.open = true;
  }

  disableTMenu(tarea: STareasPorPuestoDto){
/*     var puesto = this.getPuestoFromId(tarea.puestoId);
    if(!puesto){
      return true;
    }else if(puesto.esPool || puesto.puestoPropio){
      return false;
    }
    return true;
 */  
    return false;
  }

  disableTMenuRegAct(){
/*     if(!this.oTareaCurrent.puestoId || !this.oTareaCurrent.id){
      return true;
    }
    var puesto = this.getPuestoFromId(this.oTareaCurrent.puestoId);
    if(this.oTareaCurrent.miAsignacion && !puesto.esPool){
      return false;
    }else{
      return true;
    }
 */  
    return false;
  }



  disableTMenuEditar(){
/*     if(!this.oTareaCurrent.id){
      return true;
    }
    if( this.oTareaCurrent.miAsignacion && this.oTareaCurrent.miTarea){
      return false;
    }else{
      return true;
    }
 */  
    return false;
  }

  disableTMenuBorrar(){

/*     if(!this.oTareaCurrent.id){
      return true;
    }

    if( this.oTareaCurrent.miAsignacion && this.oTareaCurrent.miTarea){
      return false;
    }else{
      return true;
    }
 */  
    return false;
  }

  disableTMenuAsignar(){
/*     if(!this.oTareaCurrent.puestoId || !this.oTareaCurrent.id){
      return true;
    }
    var puesto = this.getPuestoFromId(this.oTareaCurrent.puestoId);

    if( this.oTareaCurrent.miAsignacion || puesto.esPool){
      return false;
    }else{
      return true;
    } */
   return false;
  }

  disableTMenuDesAsignar(){

/*     if(!this.oTareaCurrent.id){
      return true;
    }

    if( this.oTareaCurrent.miAsignacion){
      return false;
    }else{
      return true;
    }
 */  
    return false;
  }

  fTareaDesAsigna(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.oTareaSelected.ctrl_app_action = "TAREA_DESASIGNA";
    this.poConfirmTareaActionConfig.title= "Confirmación";
    this.poConfirmTareaActionConfig.text_line1= "Desea desasignar la tarea " + tarea.numero +"?";
    //this.oPopOverTareaActConf.nativeElement.showAt(this.oBtnTareaAccCurrent)
    this.oDialogTareaConfAct.nativeElement.open = true;
  }


  handleEdit($event, id){


  }

  fTareaDelete(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.oTareaSelected.ctrl_app_action = "TAREA_DELETE";
    this.poConfirmTareaActionConfig.title= "Confirmación";
    this.poConfirmTareaActionConfig.text_line1= "Desea borrar la tarea " + tarea.numero +"?";
    //this.oPopOverTareaActConf.nativeElement.showAt(this.oBtnTareaAccCurrent)
    this.oDialogTareaConfAct.nativeElement.open = true;
  }

  fTareaEdit(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    //console.log(tarea);
    //this.setTitleDialogTarea("Editar Tarea " + tarea.numero);
    this.oTareaEdit = {
      id: tarea.id,
      numero: tarea.numero,
      texto: tarea.texto,
      docuUrl: tarea.docuUrl,
      ctrl_app_action: "TAREA_EDIT",  
      ctrl_app_active: true      
    }
    //console.log(this.oTareaCurrent);
    
    this.oDialogTareaEdit.nativeElement.open = true;
  }

  guardaRegAvance(){
    this.oDialogRegAvance.nativeElement.open  = false;
  }
  cancelRegAvance(){
    this.oDialogRegAvance.nativeElement.open  = false;  
  }

  getTareaFromId(tareaId):STareasPorPuestoDto{
    var result : STareasPorPuestoDto;
    this.tareas.forEach(tarea => {
      if(tarea.id == tareaId){

        result= tarea;
      }
  });  
    return result;
  }



  AsignarAChanged(event){
    console.log(event.detail.selectedOption._state.value);
  }

  handlePrioridadSelChange(event){
    //console.log(event.target.selectedOptions[0].value);
    //console.log(event.target.selectedOptions[0].text);
    var lTareaPrioridad: UpdateTareaPrioridad = {
      asigId: event.target.selectedOptions[0].value,
      prioridad: event.target.selectedOptions[0].text,
      ctrl_app_action: "TAREA_UPDATE_PRIORIDAD"
    }

    this.tareaService.updateTareaPrioridad(lTareaPrioridad).subscribe(response =>{
      console.log(response);
      response.messages.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
      this.loadTareasData()
      //this.oDialogTareaAdd.nativeElement.open = false;
    });     

  }


  handleChangeSelection($event) {
		this.changeSelection.emit({
			selected: $event.detail.selectedItems
		});
	}

  handleCloseActvReg($event){
    var resultMsg = $event.resultMsg;
    this.oAvanceCreate.ctrl_app_active = false;
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTareasData();
    }
    this.oDialogRegAvance.nativeElement.open = false;
  }


  handleCloseTareaEdit($event){
    var resultMsg = $event.resultMsg;
    this.oTareaEdit.ctrl_app_active = false;
    console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTareasData();
    }
    this.oDialogTareaEdit.nativeElement.open = false;
  }

  handleCloseTareaAsigna($event){
    var resultMsg = $event.resultMsg;
    this.oTareaAsigna.ctrl_app_active = false;
    console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTareasData();
    }
    this.oDialogTareaAsigna.nativeElement.open = false;
  }

  handleCloseTareaPrioridades($event){
    var resultMsg = $event.resultMsg;
    this.oTareaAsigna.ctrl_app_active = false;
    console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTareasData();
    }
    this.oDialogTareaPrioridades.nativeElement.open = false;
  }

  handleCloseListaActividades($event){
    this.oDialogListaActividades.nativeElement.open = false;
    if($event.reloadTareas){
      this.loadTareasData();
    }

  }

    handleCloseTareaDetails($event){
    this.oDialogTareaDetails.nativeElement.open = false;

  }

  handleCloseTareaSFunc($event){
    var resultMsg = $event.resultMsg;
    var lvErr = true
    console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      if(msg.type == "S"){
        lvErr = false;
      }    
    });

    if(!lvErr){
      this.loadTareasData();
    }
    //this.oPopOverTareaActConf.nativeElement.open = false;
    this.oDialogTareaConfAct.nativeElement.open = false;
  }

  showAsiganciones(tareaId,asigId){
    this.oTareaSelected.id = tareaId;
    this.oTareaSelected.asigId = asigId;
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.setOTareaCurrent(tarea);
    this.oDialogAsignaciones.nativeElement.open = true;
  }
  handleCloseAsignaciones($event){
    this.oDialogAsignaciones.nativeElement.open = false;
  }
}
