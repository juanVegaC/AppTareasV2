import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild,ChangeDetectorRef } from '@angular/core';
import { STareasPorPuestoDto } from '../../../_models/Tarea/STareasPorPuestoDto';
import { TareaSelectedData } from '../../../_models/Tarea/TareaSelected/TareaSelectedDat';
import { AppMsg } from '../../../_models/Messages/AppMsg';
import { filterTareas } from '../../../_models/filters/filterTareas';
import { TareaService } from '../../../_services/tarea.service';
import { ActividadesAsigParam } from '../../../_models/Actividad/ActividadesAsigParam';
import { UpdateTareaPrioridad } from '../../../_models/Tarea/UpdateTareaPrioridad';
import { MessageService } from '../../../_services/message.service';
import { FormsModule } from '@angular/forms';
import { AsigPriorUpdated } from '../../../_models/Asignacion/AsigUpdPrioridad/AsigPriorUpdated';
import { UpdateAsignacionesPrioridad } from '../../../_models/Asignacion/AsigUpdPrioridad/UpdateAsignacionesPrioridad';
import { AsignacionesService } from '../../../_services/asignaciones.service';
import { SListaPrioridadesViewConfig } from '../../../_views/config/SListaPrioridadesViewConfig';

@Component({
  selector: 'app-lista-prioridad',
  templateUrl: './lista-prioridad.component.html',
  styleUrl: './lista-prioridad.component.css'
})
export class ListaPrioridadComponent implements OnChanges, AfterViewInit{

  @Output() cerrar = new EventEmitter();
  @Input() tareaSelected: STareasPorPuestoDto;
  @Input() configView: SListaPrioridadesViewConfig = { puestoId: 0, asigANombre: ""};
  

  tareas: Array<STareasPorPuestoDto>;

  @ViewChild('dialogListaActividades') oDialogListaActividades: ElementRef;
  @ViewChild('btn_guardar') btn_guardar: ElementRef;
  
  oActvAsigParam: ActividadesAsigParam ={
    asigId: 0
  };

  constructor(private tareaService: TareaService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef,
              private asignacionesService: AsignacionesService){}




  ngAfterViewInit(){
    this.btn_guardar.nativeElement.disabled = true;
  }

    ngOnChanges(changes: SimpleChanges) {
      if ( this.tareaSelected) {
        console.log(this.tareaSelected);
        this.loadTareasData(); 
      }
    }

    isPrioridadDisabled(tarea:STareasPorPuestoDto, tarea2:STareasPorPuestoDto){
      if(tarea.prioridadNew <= tarea2.prioridadNew)
        return true;
  
      return false;
    }

    disableSave(){
      this.tareas.forEach(tarea => {
        if ( tarea.prioridadNew != tarea.prioridad ){
          return false;
        }
      });  
      return true;
    }
  

    save(){
      var TasigChanged: Array<AsigPriorUpdated> = [];

      this.tareas.forEach(tarea => {
          if(tarea.prioridadNew != tarea.prioridadPuesto){
            TasigChanged.push({
              id: tarea.asigIdPuesto,
              prioridad: tarea.prioridadPuesto,
              prioridadNew: tarea.prioridadNew
            });
          }

        });

        if (TasigChanged.length == 0){
          this.messageService.setMessage({type:'E',text:"No hay cambios en las prioridades de las tareas.",number:200, displayStyle:""});
          return;
        }

        console.log("TasigChanged:");
        console.log(TasigChanged);

        var updatedTareas: UpdateAsignacionesPrioridad = {
          data_str: JSON.stringify(TasigChanged),
          ctrl_app_action: "ASIGNACION_CHANGE_PRIORITY"
        };

        this.asignacionesService.updateAsignacionesPrioridad(updatedTareas).subscribe(response => {
          //console.log(response);
          response.messages.forEach( msg =>{
            this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
          }); 
          
          this.cerrar.emit({
            resultMsg: response.messages,
            reloadTareas: 1
          });


        });
    
    }

  loadTareasData(){
    console.log("At loadTareasData in lista-prioridad.component.ts");
    this.tareas = [];

    if(this.configView.puestoId  == 0){
      return;
    }


    var filterTareas : filterTareas = {
      type: "PRIORIDADES_DE_PUESTO",
      puestoId: String(this.configView.puestoId)
    }

    this.tareaService.getTareas(1, 10, JSON.stringify(filterTareas))
      .subscribe({
      next: (response) => {
        this.tareas = response.result;
        this.tareas = this.tareas.map(tarea => ({
          ...tarea,
          prioridadNew: tarea.prioridadPuesto,
          prioridadPrev: tarea.prioridadPuesto
        }));

        this.tareas.forEach(tarea => {
          tarea.optPrioridades = [];
          this.tareas.forEach(tarea2 => {
            if(tarea.prioridadNew >= tarea2.prioridadNew){
              tarea.optPrioridades.push(tarea2.prioridadNew);
          }
        });  
        tarea.optPrioridades = tarea.optPrioridades.sort((a, b) => a - b);
      });
  
        this.tareas = this.tareas.sort((a, b) => a.prioridadNew - b.prioridadNew);
        console.log(this.tareas);

      },
      error: (error) => {
        console.error('Error fetching tareas:', error);
      }
      });

      
    }



  close(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });

  }  
  
  getTareaTextPreview(tareaText:string){
    if(tareaText.length > 50){
      return tareaText.substring(0,50).concat(" ...");
    }else{
      return tareaText;
    }
  }

  handleCloseListaActividades($event){
    this.oDialogListaActividades.nativeElement.open = false;
  }

  handleShowActividades(asigId:number){
    //console.log("asigId: " + asigId);
    this.oActvAsigParam = {
      asigId: asigId
    }
    this.oDialogListaActividades.nativeElement.open = true;
  }

  handlePrioridadSelChange(pAsigId,event){
    // const asigId = Number(event.target.selectedOptions[0].value);
    // const prioridadNew = Number(event.target.selectedOptions[0].text);
    // var prevPrioridad = 0;

    // const tareaStartIndex = this.tareas.findIndex(tarea => tarea.asigId === asigId);
    // const tareaEndIndex = this.tareas.findIndex(tarea => tarea.prioridadNew === prioridadNew);

    // for (let i = tareaStartIndex; i >= tareaEndIndex; i--) {
    //   if (i === tareaStartIndex) {
    //     prevPrioridad = this.tareas[i].prioridadNew;
    //     this.tareas[i].prioridadNew = prioridadNew;
    //   } else {
    //     const prioridadtmp = prevPrioridad;
    //     prevPrioridad = this.tareas[i].prioridadNew;
    //     this.tareas[i].prioridadNew = prioridadtmp;
    //   }
    // }

    // // Create a new array reference to trigger change detection
    // this.tareas = [...this.tareas].sort((a, b) => a.prioridadNew - b.prioridadNew);


    // console.log(this.tareas);

    const asigId = Number(pAsigId);
    const prioridadNew = Number(event.target.selectedOptions[0].text);
    var prevPrioridad = 0;

   const tareaStartIndex = this.tareas.findIndex(tarea => tarea.asigId === asigId);
   const tareaEndIndex = this.tareas.findIndex(tarea => tarea.prioridadNew === prioridadNew);

   const tareaUpdated = this.tareas.find(tarea => tarea.asigId === asigId);

  //   // Create a copy of the array to work with
     const updatedTareas = [...this.tareas];

    for (let i = tareaStartIndex; i >= tareaEndIndex; i--) {
        if (i === tareaStartIndex) {
            prevPrioridad = tareaUpdated.prioridadPrev;
            //updatedTareas[i].prioridadNew = prioridadNew;
        } else {
            const prioridadtmp = prevPrioridad;
            prevPrioridad = updatedTareas[i].prioridadPrev;
            updatedTareas[i].prioridadNew = prioridadtmp;
        }
    }


    updatedTareas.forEach(tarea => {
      tarea.prioridadPrev = tarea.prioridadNew;
    });

    updatedTareas.forEach(tarea => {
      tarea.optPrioridades = [];
      updatedTareas.forEach(tarea2 => {
        if(tarea.prioridadNew >= tarea2.prioridadPuesto){
          tarea.optPrioridades.push(tarea2.prioridadPuesto);
      }
    });  
    tarea.optPrioridades = tarea.optPrioridades.sort((a, b) => a - b);
  });

    // Update the original array with the sorted results
    console.log(updatedTareas);
    this.tareas = updatedTareas.sort((a, b) => a.prioridadNew - b.prioridadNew);

  //   // Force change detection by creating a new reference
  //   this.tareas = [...this.tareas];
  //   console.log(this.tareas);

  //   this.cdr.detectChanges();

  this.btn_guardar.nativeElement.disabled = true;

  this.tareas.forEach(tarea => {
    if(tarea.prioridadNew != tarea.prioridadPuesto){
      this.btn_guardar.nativeElement.disabled = false;
    }
});  


  }

  trackByFn(index: number, item: STareasPorPuestoDto): number {
    return item.id;
}



}
