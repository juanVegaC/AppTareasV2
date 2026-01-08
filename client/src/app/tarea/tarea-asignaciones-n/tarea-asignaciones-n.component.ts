import { Component, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { AsignacionesService } from '../../_services/asignaciones.service';
import { STareasPorPuestoDto } from '../../_models/Tarea/STareasPorPuestoDto';
import { AsignacionesDTareaRes } from '../../_models/Asignacion/AsignacionesDTareaRes';
import { AsignacionesGetParams } from '../../_models/Asignacion/AsignacionesGetParams';
import { AppMsg } from '../../_models/Messages/AppMsg';

@Component({
  selector: 'app-tarea-asignaciones-n',
  templateUrl: './tarea-asignaciones-n.component.html',
  styleUrl: './tarea-asignaciones-n.component.css'
})
export class TareaAsignacionesNComponent {
  constructor(
    private asigService: AsignacionesService,
    private _renderer: Renderer2){}

  @Input() tarea: STareasPorPuestoDto;
  @Output() cerrar = new EventEmitter();

  asignaciones: Array<AsignacionesDTareaRes>;

  ngOnChanges(changes: SimpleChanges) {
    if ( this.tarea) {
      this.ngOnInit(); // Llama a ngOnInit manualmente
    }
  }

  ngOnInit(){
    //console.log(this.tarea);
    this.loadAsigDTarea(this.tarea.id);  

  }
  
  loadAsigDTarea(tareaId: number){
    var params : AsignacionesGetParams = {
      ctrl_app_action: "ASIGNACIONES_D_TAREA",
      tareaId: tareaId
    };
    //console.log(params);
    this.asignaciones = []
    this.asigService.getAsigDeTarea(params).subscribe(asignaciones => {
      //tareas2 = response.result;
      console.log(asignaciones);
      this.asignaciones = asignaciones;
      
      //console.log(this.tareas)
    });

  }

  getNombreusuario(asig:AsignacionesDTareaRes){
    return asig.nombreUsuario;
  }
  close(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });

  }
}
