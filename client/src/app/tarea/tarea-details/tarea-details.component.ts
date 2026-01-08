import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { STareasPorPuestoDto } from '../../_models/Tarea/STareasPorPuestoDto';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { AsignacionesGetParams } from '../../_models/Asignacion/AsignacionesGetParams';
import { AsignacionesService } from '../../_services/asignaciones.service';
import { AsignacionesDTareaRes } from '../../_models/Asignacion/AsignacionesDTareaRes';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-tarea-details',
    templateUrl: './tarea-details.component.html',
    styleUrl: './tarea-details.component.css',
    standalone: false
})
export class TareaDetailsComponent implements OnChanges{

  @Input() tarea: STareasPorPuestoDto;
  @Output() cerrar = new EventEmitter();

  constructor(private asigService: AsignacionesService,
              private datePipe: DatePipe
  ){

  }

  asignaciones: Array<AsignacionesDTareaRes>;

   ngOnChanges(changes: SimpleChanges) {
      if ( this.tarea) {
        this.init(); // Llama a ngOnInit manualmente
      }
    }

  init(){
    this.loadAsigDTarea(this.tarea.id);
  }


    loadAsigDTarea(tareaId: number){
      var params : AsignacionesGetParams = {
        ctrl_app_action: "ASIGNACIONES_D_TAREA",
        tareaId: tareaId
      };

      this.asigService.getAsigDeTarea(params).subscribe(asignaciones => {
        console.log(asignaciones);
        this.asignaciones = asignaciones;
      });
  
    }
  
  
  get_tiempo_act(pTiempo : number): string {

    var result : string =  ""
    var minutes = Math.round((pTiempo - Math.floor(pTiempo)) * 60);
    var hours = Math.floor(pTiempo);


    if (hours > 0){
      if(hours > 1){
        result = hours.toString() + " hrs. "
      }else{
        result = hours.toString() + " hr. "
      }
    }

    if(minutes > 0){
      if (result){
        result = result + " " + minutes.toString() + " mins."        
      }else{
        result = minutes.toString() + " mins."
      }
    }

    return result;
  }
  close(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
    });

  }

}
