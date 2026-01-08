import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SPuestoPorUsuarioDto } from '../../../_models/Puesto/SPuestoPorUsuarioDto';
import { TareasPuestoTabGetRes } from '../../../_models/TareasPuestoTab/TareasPuestoTabGet/TareasPuestoTabGetRes';
import { TareaPuestoTabService } from '../../../_services/tarea-puesto-tab.service';
import { DatePipe } from '@angular/common';
import { MessageService } from '../../../_services/message.service';
import { TareasPuestoTabGetReq } from '../../../_models/TareasPuestoTab/TareasPuestoTabGet/TareasPuestoTabGetReq';
import { TabEstadosGetAllRes } from '../../../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllRes';
import { TabEstadosService } from '../../../_services/tab-estados.service';
import { TabEstadosGetAllReq } from '../../../_models/TabEstado/TabEstadosGetAll/TabEstadosGetAllReq';
import { TareasPuestoTabData } from '../../../_models/TareasPuestoTab/TareasPuestoTabData/TareasPuestoTabData';
import { TareasPuestoTabDet } from '../../../_models/TareasPuestoTab/TareasPuestoTabData/TareasPuestoTabDet';
import { TareasPuestoTabMoveReq } from '../../../_models/TareasPuestoTab/TareasPuestoTabMove/TareasPuestoTabMoveReq';
import { TareaAvanceCreateData } from '../../../_models/Tarea/TareaAvance/TareaAvanceCreateData';
import { AccountService } from '../../../_services/account.service';

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

@Component({
    selector: 'app-tablero-kanban',
    templateUrl: './tablero-kanban.component.html',
    styleUrls: ['./tablero-kanban.component.css'],
    standalone: false
})
export class TableroKanbanComponent implements OnChanges {

      constructor(
      private tareasPuestoTabService: TareaPuestoTabService,
      private tabEstadoService: TabEstadosService,
      public accountService : AccountService,
      private messageService: MessageService,
      private datePipe: DatePipe){}  

  @Input() puestoSelected: SPuestoPorUsuarioDto;
  
  tareas: Array<TareasPuestoTabGetRes>;
  tabEstados: Array<TabEstadosGetAllRes>;
  tabTareas: Array<TareasPuestoTabData>;

  oTareaSelected: TareasPuestoTabDet = {
    tareaId: 0,
    numero: '',
    texto: '',
    asigId: 0,
    puestoId: 0,
    tableroId: 0,
    estadoId: 0,
    estado: '',
    estadoPos: 0,
    prioridad: 0,
    avance: 0,
    edoDias: 0,
    edoHoras: 0,
    edoMinutos: 0,
    actvHoras: 0,
    actvMinutos: 0,
    asignadoAUsrId: 0,
    asignadoANombre: '',
    tipoAsig: 0,
    otrasAsig: []
  };

  oAvanceCreate:TareaAvanceCreateData = {
      tareaId: 0,
      tareaNumero: "",
      tareaPuestoId: 0,
      texto:"",
      fecha:new Date(),
      fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
      asigId: 0,
      estatus: 0,
      avance: 0,
      actvHrs:0,
      actvMins:0,    
      newPuestoId:0,  
      ctrl_app_active: true
    };  

    @ViewChild('dialogRegAvance') oDialogRegAvance: ElementRef;
    @ViewChild('dialogTareaDetalle') oDialogTareaDetalle: ElementRef;


  ngOnChanges(changes: SimpleChanges) {
    if ( this.puestoSelected) {
      //this.loadTareasData(); // Llama a ngOnInit manualmente
      this.loadTableroData(Number(this.puestoSelected.puestoId), Number(this.puestoSelected.tableroId));
    }
  }

  loadTableroData(puestoId : number, tableroId: number){

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
      this.loadTareasData(puestoId, tableroId);
      console.log(this.tabEstados);
    });
  }

  loadTareasData(puestoId : number, tableroId: number){

    this.tareas = [];

    if(this.puestoSelected.puestoId == 0){
      return;
    }

    var filterTareas : TareasPuestoTabGetReq = {
      puestoId: puestoId,
      tableroId: tableroId,
      }

    console.log(filterTareas)
    //this.busy_indicator.nativeElement.active = true;
    this.tareasPuestoTabService.get(filterTareas).subscribe(response => {
      //tareas2 = response.result;
      console.log(response);
      this.tareas = response;

      this.tabTareas = [];
      this.tabEstados.forEach(tab => {
        var tareas: Array<TareasPuestoTabDet> = [];

        this.tareas.forEach(tarea => {
          if(tarea.tipoAsig != 2 && tarea.estadoId == tab.estadoId){
            var otrasAsig: Array<TareasPuestoTabDet> = [];
          //if(tarea.tableroId == tab.tableroId && tarea.estadoId == tab.estadoId){
            this.tareas.forEach(tarea2 => {
              if(tarea2.tipoAsig == 2 && tarea2.tareaId == tarea.tareaId){
                otrasAsig.push({
                  tareaId: tarea2.tareaId,
                  numero: tarea2.numero,
                  texto: tarea2.texto,
                  asigId: tarea2.asigId,
                  puestoId: tarea2.puestoId,
                  tableroId: tarea2.tableroId,
                  estadoId: tarea2.estadoId,
                  estado: tarea2.estado,
                  estadoPos: tarea2.estadoPos,
                  prioridad: tarea2.prioridad,
                  avance: tarea2.avance,
                  edoDias: tarea2.edoDias,
                  edoHoras: tarea2.edoHoras,
                  edoMinutos: tarea2.edoMinutos,
                  actvHoras: tarea2.actvHoras,
                  actvMinutos: tarea2.actvMinutos,
                  asignadoAUsrId: tarea2.asignadoAUsrId,
                  asignadoANombre: tarea2.asignadoANombre,
                  tipoAsig: tarea2.tipoAsig,
                  otrasAsig: []
                });
              }
            });

            tareas.push({
                  tareaId: tarea.tareaId,
                  numero: tarea.numero,
                  texto: tarea.texto,
                  asigId: tarea.asigId,
                  puestoId: tarea.puestoId,
                  tableroId: tarea.tableroId,
                  estadoId: tarea.estadoId,
                  estado: tarea.estado,
                  estadoPos: tarea.estadoPos,
                  prioridad: tarea.prioridad,
                  avance: tarea.avance,
                  edoDias: tarea.edoDias,
                  edoHoras: tarea.edoHoras,
                  edoMinutos: tarea.edoMinutos,
                  actvHoras: tarea.actvHoras,
                  actvMinutos: tarea.actvMinutos,
                  asignadoAUsrId: tarea.asignadoAUsrId,
                  asignadoANombre: tarea.asignadoANombre,
                  tipoAsig: tarea.tipoAsig,
                  otrasAsig: otrasAsig
            });
          }
        });


        this.tabTareas.push({
          tabEstadoId: tab.id,
          tableroId: tab.tableroId,
          estadoId: tab.estadoId,
          estado: tab.estado,
          posicion: tab.posicion,
          poolAsigId: tab.poolAsigId,
          tareas: tareas,          
        });

      });

      console.log(this.tabTareas);
      //this.tareas = response;
      //this.busy_indicator.nativeElement.active = false;

      //console.log(this.tareas)
    });

      //this.pagination = response.pagination;

  }



  get columnIds(): string[] {
    return this.tabTareas.map(c => c.estadoId.toString());
  }

  drop(event: CdkDragDrop<TareasPuestoTabDet[]>) {
    console.log(event);
    const asignacion  = event.item.data as TareasPuestoTabDet;
    let fromIdx = event.container.data.indexOf(asignacion);
    if (fromIdx === -1) { fromIdx = event.previousIndex; }
    const toIdx = event.currentIndex;

    const estadoFrom = this.tabTareas.find(e => e.estadoId === Number(event.previousContainer.id));
    const estadoTo = this.tabTareas.find(e => e.estadoId === Number(event.container.id));
    console.log("estadoFrom:", estadoFrom);
    console.log("estadoTo:", estadoTo);

    if (estadoFrom.estadoId === estadoTo.estadoId && fromIdx !== toIdx) {
      // Derivar índices de los datos para evitar off-by-one por encabezados u otros nodos

      
      console.log(`Tarea movida en ${event.container.id}: de ${fromIdx} a ${toIdx}`);
      moveItemInArray(event.container.data, fromIdx, toIdx);
      //this.TareaEdoChange(asignacion, estadoFrom, estadoTo, Number(event.currentIndex) + 1, this.puestoSelected);
      this.AsignacionMoveEdo(asignacion, estadoFrom, estadoTo, Number(event.currentIndex) + 1, this.puestoSelected)

    } else if (event.previousContainer !== event.container) {
      // Verifica si la columna de destino ya tiene 3 o más tareas.
/*       if (event.container.data.length >= 3) {
        // Si es así, no hagas nada. La ficha regresará visualmente a su lugar original.
        console.log(`No se puede mover la tarea a '${this.tabEstados.find(c => c.estado === event.container.id)?.estado}' porque ya tiene ${event.container.data.length} tareas.`);
        return;
      } */

        console.log(`Tarea movida de ${event.previousContainer.id} (pos: ${fromIdx}) a ${event.container.id} (pos: ${event.currentIndex})`);
        console.log(asignacion);
      

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          fromIdx,
          event.currentIndex,);

        //this.TareaEstadoChange(asignacion, estadoFrom, estadoTo, Number(event.currentIndex)+1,this.puestoSelected);
        this.AsignacionMoveEdo(asignacion, estadoFrom, estadoTo, Number(event.currentIndex) + 1, this.puestoSelected)

    } 
  }

  TareaEstadoChange(pAsignacion: TareasPuestoTabDet, pEstadoFrom: TareasPuestoTabData, pEstadoTo: TareasPuestoTabData, pEstadoPosNew: number, pPuesto:SPuestoPorUsuarioDto) {

      if(pPuesto.esPool){
        this.messageService.setMessage({type:"E",text:"No se puede mover la tarea desde un pool de asignación.",number:101, displayStyle:""})
        this.loadTareasData(this.puestoSelected.puestoId, this.puestoSelected.tableroId);
        return;
      }

      if(pEstadoFrom.poolAsigId == 0 && pEstadoTo.poolAsigId !=0){
        this.messageService.setMessage({type:"E",text:"No se puede mover la tarea a un pool de asignación.",number:101, displayStyle:""})
        this.loadTareasData(this.puestoSelected.puestoId, this.puestoSelected.tableroId);
        return;
      }

      if(pEstadoFrom.poolAsigId != 0){  
        this.TareaAsigna(pAsignacion, pEstadoFrom, pEstadoTo, pEstadoPosNew, pPuesto);
      }else{  
        this.TareaEdoChange(pAsignacion, pEstadoFrom, pEstadoTo, pEstadoPosNew, pPuesto);
      
      }

  }

  AsignacionMoveEdo(pAsignacion: TareasPuestoTabDet, pEstadoFrom: TareasPuestoTabData, pEstadoTo: TareasPuestoTabData, pEstadoPosNew: number, pPuesto:SPuestoPorUsuarioDto) {
      var req : TareasPuestoTabMoveReq = {
        data: JSON.stringify({
          asigId: pAsignacion.asigId,
          puestoIdNew: pPuesto.puestoId,
          tableroIdNew: pPuesto.tableroId,
          estadoIdNew: pEstadoTo.estadoId,
          estadoPosNew: pEstadoPosNew,          
        }),
        ctrl_app_action: "ASIGNACION_MUEVE_ESTADO"
      }

      this.tareasPuestoTabService.Move(req).subscribe(response => {
        console.log("Tarea movida:", response);

        response.messages.forEach( msg =>{
          this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
        });

        this.loadTareasData(this.puestoSelected.puestoId, this.puestoSelected.tableroId);

      });

  }


  TareaAsigna(pAsignacion: TareasPuestoTabDet, pEstadoFrom: TareasPuestoTabData, pEstadoTo: TareasPuestoTabData, pEstadoPosNew: number, pPuesto:SPuestoPorUsuarioDto) {

      var req : TareasPuestoTabMoveReq = {
        data: JSON.stringify({
          asigId: pAsignacion.asigId,
          puestoIdNew: pPuesto.puestoId,
          tableroIdNew: pPuesto.tableroId,
          estadoIdNew: pEstadoTo.estadoId,
          estadoPosNew: pEstadoPosNew,          
        }),
        ctrl_app_action: "ASIGNACION_MUEVE_ESTADO"
      }

      this.tareasPuestoTabService.Move(req).subscribe(response => {
        console.log("Tarea movida:", response);

        response.messages.forEach( msg =>{
          this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
        });

        this.loadTareasData(this.puestoSelected.puestoId, this.puestoSelected.tableroId);

      });
  }

    TareaEdoChange(pAsignacion: TareasPuestoTabDet, pEstadoFrom: TareasPuestoTabData, pEstadoTo: TareasPuestoTabData, pEstadoPosNew: number, pPuesto:SPuestoPorUsuarioDto) {


      var req : TareasPuestoTabMoveReq = {
        data: JSON.stringify({
          asigId: pAsignacion.asigId,
          estadoIdNew: pEstadoTo.estadoId,
          estadoPosNew: pEstadoPosNew,
          puestoId: pPuesto.puestoId
        }),
        ctrl_app_action: "TAREA_MUEVE_ESTADO"
      }

      this.tareasPuestoTabService.Move(req).subscribe(response => {
        console.log("Tarea movida:", response);

        response.messages.forEach( msg =>{
          this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
        });

        this.loadTareasData(this.puestoSelected.puestoId, this.puestoSelected.tableroId);

      });
  }


  getTaskPriorityClass(tarea: TareasPuestoTabDet): string {

    if(tarea.puestoId != this.puestoSelected.puestoId){
      return 'tak-priority-none';
    }

    switch (tarea.prioridad) {
      case 1: return 'tak-priority-high';
      case 2: return 'tak-priority-medium';
      case 3: return 'tak-priority-medium';
      case 0: return 'tak-priority-none';
      default: return 'tak-priority-normal';
    }
  }

  getAdditionalText(tarea: TareasPuestoTabDet): string {
    var lresult = "";
    if (tarea.edoDias > 0) {
      lresult += `${tarea.edoDias}d`;
      return lresult;
    }
    if (tarea.edoHoras > 0) {
      lresult += ` ${tarea.edoHoras}h`;
      return lresult;
    }
    if (tarea.edoMinutos > 0) {
      lresult += ` ${tarea.edoMinutos}m`;
      return lresult;
    }
    return lresult;
  }


  getTaskTime(tarea: TareasPuestoTabDet): string {
    var lresult = "";
    if (tarea.actvHoras > 0) {
      lresult += `${tarea.actvHoras}h`;
      //return lresult;
    }
    if (tarea.actvMinutos > 0 || tarea.actvHoras == 0) {
      lresult += ` ${tarea.actvMinutos}m`;
      return lresult;
    }

    return lresult;
  }

  getTaskAvance(tarea: TareasPuestoTabDet): string {
    var lresult = "";

    if(tarea.avance == 0 && tarea.actvHoras == 0 && tarea.actvMinutos == 0){
      lresult = ` Aún no se ha registrado avance.`;
      return lresult;
    }

    lresult = ` Se tiene un avance del: ${tarea.avance}%, con un tiempo invertido de: ${this.getTaskTime(tarea)}`;

    return lresult;
  }

  getTareaTextPreview(tareaText: string): string {
    if(tareaText.length > 50){
      return tareaText.substring(0,50).concat(" ...");
    }else{
      return tareaText;
    }    
  }

  // UI helpers: priority mapping and actions
  priorityLabel(prioridad: number | undefined): string {
    if (prioridad === undefined || prioridad === null) return 'Normal';
    switch (prioridad) {
      case 1: return 'Alta';
      case 2: return 'Media';
      case 3: return 'Baja';
      default: return 'Normal';
    }
  }

  priorityDesign(prioridad: number | undefined): string {
    switch (prioridad) {
      case 1: return 'Negative';
      case 2: return 'Critical';
      case 3: return 'Neutral';
      default: return 'Neutral';
    }
  }

  priorityColor(prioridad: number | undefined): string {
    // Used as CSS var for left border color
    switch (prioridad) {
      case 1: return '#d12f2f';
      case 2: return '#e9730c';
      case 3: return '#6a6d70';
      default: return '#6a6d70';
    }
  }

  fTareaRegAvance(pTarea: TareasPuestoTabDet){
    console.log(pTarea);
     //var tarea = this.getTareaFromId(this.oTareaSelected.id);

    if(pTarea == null)
      return;

    if(pTarea.asignadoAUsrId != this.accountService.getUserId()){
      return;
    }

    if(this.puestoSelected.esPool){
      //this.messageService.setMessage({type:"E",text:"No se puede registrar avance desde un pool de asignación.",number:101, displayStyle:""})
      return;
    }

    var edoAsig = this.tabEstados.find( edo => edo.estadoId == pTarea.estadoId);

    if(edoAsig.cierraAsig){
      //this.messageService.setMessage({type:"E",text:"No se puede registrar avance en una tarea en estado de cierre.",number:101, displayStyle:""})
      return;
    }


    this.oAvanceCreate = {
      tareaId:pTarea.tareaId,
      tareaNumero:pTarea.numero,
      tareaPuestoId:Number(this.puestoSelected.puestoId),
      texto:"",
      fecha:new Date(),
      fechaSTR: this.datePipe.transform( new Date(),"yyyy-MM-dd"),
      asigId: pTarea.asigId,
      estatus: 0,
      avance: pTarea.avance,
      actvHrs:0,
      actvMins:0,    
      newPuestoId:0,  
      ctrl_app_active: true
    };   
    this.oDialogRegAvance.nativeElement.open = true;
  }

  fTareaDetalleOpen(pTarea: TareasPuestoTabDet){

    this.oTareaSelected = pTarea;
    this.oDialogTareaDetalle.nativeElement.open = true;

  }

handleCloseActvReg($event){
    var resultMsg = $event.resultMsg;
    this.oAvanceCreate.ctrl_app_active = false;
    resultMsg.forEach( msg =>{
      this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
    });
    if($event.reloadTareas){
      this.loadTableroData(Number(this.puestoSelected.puestoId), Number(this.puestoSelected.tableroId));
    }
    this.oDialogRegAvance.nativeElement.open = false;
  }

  handleCloseTareaDetalle($event){
    var resultMsg = $event.resultMsg;
    this.oDialogTareaDetalle.nativeElement.open = false;
  }

  openTarea(tarea: TareasPuestoTabDet) {
    // TODO: wire this to your routing or dialog component
    console.log('Abrir detalle de tarea', tarea);
  }
/*   showStatusChangeToast(task: TareasPuestoTabDet, estado: TabEstadosGetAllRes) {
    console.log(`Tarea '${task.tareaId}' se movió a la columna '${estado.estadoId}', mostrando toast`);
  } */

/*   columns: Column[] = [
    {
      id: 'backlog',
      title: 'Backlog ABAP',
      tasks: [
        { id: '11', title: 'Task 11', description: 'Description for task 1' },
        { id: '12', title: 'Task 12', description: 'Description for task 12' },
      ],
    },    
    {
      id: 'asignada',
      title: 'Asignada',
      tasks: [
        { id: '1', title: 'Task 1', description: 'Description for task 1' },
        { id: '2', title: 'Task 2', description: 'Description for task 2' },
      ],
    },
    {
      id: 'en-documentacion',
      title: 'En Documentación',
      tasks: [
        { id: '3', title: 'Task 3', description: 'Description for task 3' },
      ],
    },
    {
      id: 'en-desarrollo',
      title: 'En Desarrollo',
      tasks: [
        { id: '5', title: 'Task 5', description: 'Description for task 5' },
      ],
    },
    {
      id: 'en-pruebas',
      title: 'En Pruebas',
      tasks: [
        { id: '6', title: 'Task 6', description: 'Description for task 6' },
      ],
    },
    {
      id: 'def-reportados',
      title: 'Defectos Reportados',
      tasks: [
        { id: '15', title: 'Task 15', description: 'Description for task 15' },
      ],
    },
    {
      id: 'en-correccion',
      title: 'En Corrección',
      tasks: [
        { id: '14', title: 'Task 14', description: 'Description for task 14' },
      ],
    },
    {
      id: 'terminada',
      title: 'Terminada',
      tasks: [
        { id: '7', title: 'Task 7', description: 'Description for task 7' },
        { id: '8', title: 'Task 8', description: 'Description for task 8' },
        { id: '9', title: 'Task 9', description: 'Description for task 9' },
        { id: '10', title: 'Task 10', description: 'Description for task 10' },
        { id: '11', title: 'Task 11', description: 'Description for task 11' },
      ],
    },
  ];

  get columnIds(): string[] {
    return this.columns.map(c => c.id);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      console.log(`Tarea movida en ${event.container.id}: de ${event.previousIndex} a ${event.currentIndex}`);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(`Tarea movida de ${event.previousContainer.id} (pos: ${event.previousIndex}) a ${event.container.id} (pos: ${event.currentIndex})`);
      // Verifica si la columna de destino ya tiene 3 o más tareas.
      if (event.container.data.length >= 3) {
        // Si es así, no hagas nada. La ficha regresará visualmente a su lugar original.
        console.log(`No se puede mover la tarea a '${this.columns.find(c => c.id === event.container.id)?.title}' porque ya tiene ${event.container.data.length} tareas.`);
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedTask = event.container.data[event.currentIndex];
      const destinationColumn = this.columns.find(c => c.id === event.container.id);
      if (destinationColumn) {
        this.showStatusChangeToast(movedTask, destinationColumn);
      }
    }
  }

  showStatusChangeToast(task: Task, column: Column) {
    console.log(`Tarea '${task.title}' se movió a la columna '${column.title}', mostrando toast`);
  }  */

}
