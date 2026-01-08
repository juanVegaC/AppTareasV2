import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TareaService } from '../../_services/tarea.service';
import { PuestoService } from '../../_services/puesto.service';
import { TareaData } from '../../_models/TareaData';
import { PuestosGetParams } from '../../_models/Puesto/PuestosGetParams';
import { SPuestoPorUsuarioDto } from '../../_models/Puesto/SPuestoPorUsuarioDto';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { AsignarTareaData } from '../../_models/Tarea/TareaAsigna/AsignarTareaData';

@Component({
  selector: 'app-tarea-asigna',
  templateUrl: './tarea-asigna.component.html',
  styleUrl: './tarea-asigna.component.css'
})
export class TareaAsignaComponent implements OnChanges{


  constructor(
    private tareaService: TareaService,
    private puestoService: PuestoService,
    private _renderer: Renderer2){}

  @Input() tarea: AsignarTareaData;
  @Output() cerrar = new EventEmitter();

  @ViewChild('selectReAsignarA') oSelectReAsignarA: ElementRef;

  puestosParaTarea: Array<SPuestoPorUsuarioDto>;


  ngOnChanges(changes: SimpleChanges) {
    if ( this.tarea) {
      this.ngOnInit(); // Llama a ngOnInit manualmente
    }
  }

  ngOnInit(){
    if(this.tarea.ctrl_app_active){
      this.clearDialogTareaAsigna(); 
      this.loadPuestosPAsigTarea(this.tarea.id);  
    }
  }

  clearDialogTareaAsigna(){
    this.oSelectReAsignarA.nativeElement.value = "";

    this._renderer.setAttribute(this.oSelectReAsignarA.nativeElement, 'value-state', 'None');    
  }

  loadPuestosPAsigTarea(tareaId: number){
    var params : PuestosGetParams = {
      ctrl_app_action: "PUESTOS_P_ASIG_TAREA",
      tareaId: tareaId
    };
    console.log(params);
    this.puestosParaTarea = []
    this.puestoService.getPuestosPorUsuario(params).subscribe(puestos => {
      //tareas2 = response.result;
      console.log(puestos);
      this.puestosParaTarea = puestos;
      
      //console.log(this.tareas)
    });

  }

  AsignarAChanged(event){
    console.log(event.detail.selectedOption._state.value);
  }


  closeAsigna(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });
  }

  saveAsigna(){
    var error = false;

    if(this.oSelectReAsignarA.nativeElement.value == ""){
      this._renderer.setAttribute(this.oSelectReAsignarA.nativeElement, 'value-state', 'Negative');
      error = true;    
    }else{
      this.tarea.newPuestoId = this.oSelectReAsignarA.nativeElement.value;
    }
    
    if(!error){
      
      //console.log(asignarT);
      this.tareaService.asignarTarea(this.tarea).subscribe(response =>{
        //console.log(response);
        this.cerrar.emit({
          resultMsg: response.messages,
          reloadTareas: 1
        });
        //this.oDialogTareaAsigna.nativeElement.open = false;
        //this.loadTareasData();
      });   
    }
  }
}
