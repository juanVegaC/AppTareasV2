import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TareaSelectedData } from '../../_models/Tarea/TareaSelected/TareaSelectedDat';
import { TareaActionData } from '../../_models/Tarea/TareaAction/TareaActionData';
import { DeleteTareaData } from '../../_models/Tarea/TareaDelete/DeleteTareaDto';
import { TareaService } from '../../_services/tarea.service';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { DesAsignarTareaReqData } from '../../_models/Tarea/TareaDesAsigna/DesAsignarTareaReqData';

@Component({
  selector: 'app-tarea-sfunc',
  templateUrl: './tarea-sfunc.component.html',
  styleUrl: './tarea-sfunc.component.css'
})
export class TareaSfuncComponent implements OnChanges {


  constructor(
    private tareaService: TareaService
  ){}

  @Input() tarea: TareaSelectedData;
  @Input() action: TareaActionData;

  @Output() cerrar = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if ( this.tarea) {
      this.ngOnInit(); // Llama a ngOnInit manualmente
    }
  }

  ngOnInit(){

  }

  confirmAction(){
    if(this.tarea.ctrl_app_action == "TAREA_DELETE"){
      this.fTareaDeleteConfirm();
    }else if(this.tarea.ctrl_app_action == "TAREA_DESASIGNA"){
      this.fTareaDesAsginaConfirm();
    }
  }

  fTareaDeleteConfirm(){
    var tareaDelete: DeleteTareaData = {
      id:this.tarea.id,
      ctrl_app_action:this.tarea.ctrl_app_action
    }
    this.tareaService.deleteTarea(tareaDelete).subscribe(response =>{
      //console.log(response);

      this.cerrar.emit({
        resultMsg: response.messages,
        reloadTareas: 0
      });
  
    }); 
  }
  fTareaDesAsginaConfirm(){
    var tareaDesAsigna: DesAsignarTareaReqData = {
      asigId:this.tarea.asigId,
      ctrl_app_action:this.tarea.ctrl_app_action
    }

    this.tareaService.desasignaTarea(tareaDesAsigna).subscribe(response =>{
      //console.log(response);

      this.cerrar.emit({
        resultMsg: response.messages,
        reloadTareas: 0
      });

    });
}


  cancelAction(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg: resultMessages,
      reloadTareas: 0
    });

  }
  
}
