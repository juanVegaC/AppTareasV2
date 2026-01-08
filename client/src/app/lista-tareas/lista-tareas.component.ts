import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { filterTareas } from '../_models/filters/filterTareas';
import { TareaService } from '../_services/tarea.service';
import { MessageService } from '../_services/message.service';
import { DeleteTareaData } from '../_models/Tarea/TareaDelete/DeleteTareaDto';
import { STareasPorPuestoDto } from '../_models/Tarea/STareasPorPuestoDto';
import { PuestoService } from '../_services/puesto.service';
import { SPuestoPorUsuarioDto } from '../_models/Puesto/SPuestoPorUsuarioDto';
import { UpdateTareaPrioridad } from '../_models/Tarea/UpdateTareaPrioridad';
import { AsignarTareaData } from '../_models/Tarea/TareaAsigna/AsignarTareaData';
import { PuestosGetParams } from '../_models/Puesto/PuestosGetParams';
import { TareaEditReqDat } from '../_models/Tarea/TareaEdit/TareaEditReqDat';
import { TareaCreateReqDat } from '../_models/Tarea/TareaCreate/TareaCreateReqDat';
import { TareaSelectedData } from '../_models/Tarea/TareaSelected/TareaSelectedDat';
import { TareaActionData } from '../_models/Tarea/TareaAction/TareaActionData';
import { TareaAvanceCreateData } from '../_models/Tarea/TareaAvance/TareaAvanceCreateData';
@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.css'
})


export class ListaTareasComponent implements OnInit {

  //@Input() tareas;
	@Output() deletedItem = new EventEmitter();
	@Output() changeSelection = new EventEmitter();
	@Output() editPressed = new EventEmitter();

  @ViewChild('busy_indicator') busy_indicator: ElementRef;
  @ViewChild('dialogTareaAdd') oDialogTareaAdd: ElementRef;
  @ViewChild('dialogTareaEdit') oDialogTareaEdit: ElementRef;
  @ViewChild('dialogTareaAsigna') oDialogTareaAsigna: ElementRef;
  @ViewChild('dialogRegAvance') oDialogRegAvance: ElementRef;
  @ViewChild('dialogAsignaciones') oDialogAsignaciones: ElementRef;

  //@ViewChild('btnTareaAcciones') oBtnTareaAcciones: ElementRef;
  @ViewChild('btnTareaAcciones') oBtnTareaAccCurrent: ElementRef;

  @ViewChild('menuTarea') oMenuTarea: ElementRef;
  @ViewChild('popOverTareaActConf') oPopOverTareaActConf: ElementRef;
  @ViewChild('selectPuesto') oselectPuesto: ElementRef;


  tareas: Array<STareasPorPuestoDto>;
  puestos: Array<SPuestoPorUsuarioDto>;

  filterTareas : filterTareas = {
    type: "TAREAS_DE_PUESTO",
    puestoId: "0"
  }

  poConfirmTareaActionConfig:TareaActionData = {
    title: "",
    text_line1: "",
  };


  oTareaCurrent: STareasPorPuestoDto;
  oTareaCreate: TareaCreateReqDat;
  oTareaEdit: TareaEditReqDat;
  oTareaAsigna: AsignarTareaData;
  oAvanceCreate: TareaAvanceCreateData;

  oTareaSelected: TareaSelectedData = {
    id: 0,
    asigId: 0,
    ctrl_app_action: ""
  }

  constructor(private tareaService: TareaService,
              private datePipe: DatePipe,
              private messageService: MessageService,
              private puestoService: PuestoService,
              private _renderer: Renderer2){}

  
  ngOnInit(): void {

 
    console.log("in lista-tareas");
    this.iniOTareaCurrent();
    this.initTareaCreateData();
    this.initTareaEditData();
    this.initTareaAsigna();
    this.initOActvNew();
    this.loadPuestosPUsuario();
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

  initTareaCreateData(){
    this.oTareaCreate = {
      id: 0,
      numero: "",
      texto: "",
      docuUrl: "",
      asignadoA:0,
      tableroId:0,
      ctrl_app_action: "TAREA_CREATE",   
      ctrl_app_active: false,   
    }
  }

  getDATA(){
    return this.poConfirmTareaActionConfig.title; 
  }

  handleTareaAdd(){

    this.oTareaCreate = {
      id: 0,
      numero: "",
      texto: "",
      docuUrl: "",
      asignadoA:0,
      tableroId:0,
      ctrl_app_action: "TAREA_CREATE",   
      ctrl_app_active: true,   
    }

    //this.setTitleDialogTarea("Crear Tarea");
    this.oDialogTareaAdd.nativeElement.open = true;
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
        prioridadNew:0,
        prioridadPrev:0,
        optPrioridades:[]}
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

  loadPuestosPUsuario(){
    var params : PuestosGetParams = {
      ctrl_app_action: "PUESTOS_P_USUARIO",
      tareaId: 0
    };

    this.puestoService.getPuestosPorUsuario(params).subscribe(puestos => {
      //tareas2 = response.result;
      console.log(puestos);
      this.puestos = puestos;
       setTimeout(() => 
        {
          this.loadTareasData();
        },
        1500); 
      
      //this.tareas = response.result;
      //console.log(this.tareas)
    });

  }

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

    this.oMenuTarea.nativeElement.showAt(this.oBtnTareaAccCurrent);
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

    if(this.oselectPuesto.nativeElement.value){
      this.filterTareas.puestoId = this.oselectPuesto.nativeElement.value;
    }else{
      this.filterTareas.puestoId ="0";
    }

    this.tareas = [];

    this.busy_indicator.nativeElement.active = true;
    this.tareaService.getTareas(1, 10, JSON.stringify(this.filterTareas)).subscribe(response => {
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
      tareaPuestoId:0,
      texto:"",
      fecha:new Date(),
      fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
      asigId: tarea.asigId,
      estatus: tarea.estatus,
      avance: tarea.avance,
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
      puestoId: Number(this.filterTareas.puestoId),
      newPuestoId: 0,
      ctrl_app_action: "TAREA_ASIGNA",
      ctrl_app_active: true 
    }
    //console.log(tarea);
    this.oDialogTareaAsigna.nativeElement.open = true;
  }

  disableTMenu(tarea: STareasPorPuestoDto){
    var puesto = this.getPuestoFromId(tarea.puestoId);
    if(!puesto){
      return true;
    }else if(puesto.esPool || puesto.puestoPropio){
      return false;
    }
    return true;
  }

  disableTMenuRegAct(){
    if(!this.oTareaCurrent.puestoId || !this.oTareaCurrent.id){
      return true;
    }
    var puesto = this.getPuestoFromId(this.oTareaCurrent.puestoId);
    if(this.oTareaCurrent.miAsignacion && !puesto.esPool){
      return false;
    }else{
      return true;
    }
  }


  handleMTareaOpen(event){
    console.log(event.target);

   /*  event.target.children.forEach(item =>{
      
    }); */
    
  }

  disableTMenuEditar(){
    if(!this.oTareaCurrent.id){
      return true;
    }
    if( this.oTareaCurrent.miAsignacion && this.oTareaCurrent.miTarea){
      return false;
    }else{
      return true;
    }
  }

  disableTMenuBorrar(){

    if(!this.oTareaCurrent.id){
      return true;
    }

    if( this.oTareaCurrent.miAsignacion && this.oTareaCurrent.miTarea){
      return false;
    }else{
      return true;
    }
  }

  disableTMenuAsignar(){
    if(!this.oTareaCurrent.puestoId || !this.oTareaCurrent.id){
      return true;
    }
    var puesto = this.getPuestoFromId(this.oTareaCurrent.puestoId);

    if( this.oTareaCurrent.miAsignacion || puesto.esPool){
      return false;
    }else{
      return true;
    }
  }

  disableTMenuDesAsignar(){

    if(!this.oTareaCurrent.id){
      return true;
    }

    if( this.oTareaCurrent.miAsignacion){
      return false;
    }else{
      return true;
    }
  }

  fTareaDesAsigna(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.oTareaSelected.ctrl_app_action = "TAREA_DESASIGNA";
    this.poConfirmTareaActionConfig.title= "Confirmación";
    this.poConfirmTareaActionConfig.text_line1= "Desea desasignar la tarea " + tarea.numero +"?";
    this.oPopOverTareaActConf.nativeElement.showAt(this.oBtnTareaAccCurrent)

  }

  fTareaDelete(){
    var tarea = this.getTareaFromId(this.oTareaSelected.id);
    this.oTareaSelected.ctrl_app_action = "TAREA_DELETE";
    this.poConfirmTareaActionConfig.title= "Confirmación";
    this.poConfirmTareaActionConfig.text_line1= "Desea borrar la tarea " + tarea.numero +"?";
    this.oPopOverTareaActConf.nativeElement.showAt(this.oBtnTareaAccCurrent)
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
    this.oDialogRegAvance.nativeElement.open = false;    
  }
  cancelRegAvance(){
    this.oDialogRegAvance.nativeElement.open = false;    
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

  getPuestoFromId(puestoId):SPuestoPorUsuarioDto{
    var result : SPuestoPorUsuarioDto;
    this.puestos.forEach(puesto => {
      if(puesto.puestoId == puestoId){

        result= puesto;
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
      this.oDialogTareaAdd.nativeElement.open = false;
    });     

  }

  handlePuestoSelChange(event){
    console.log(event);
/*     console.log(event.detail.selectedOption._state.value);

    if(event.detail.selectedOption._state.value){
      this.filterTareas.puestoId = event.detail.selectedOption._state.value;
    }else{
      this.filterTareas.puestoId ="0";
    }
 */    this.loadTareasData();
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

  handleCloseTareaReg($event){
    var resultMsg = $event.resultMsg;
    this.oTareaCreate.ctrl_app_active = false;
    //console.log(resultMsg);
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTareasData();
    }
    this.oDialogTareaAdd.nativeElement.open = false;
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
    this.oPopOverTareaActConf.nativeElement.open = false;
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
