import { Component, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { TareaActionConfData } from '../../_models/TareaAction/TareaActionConfData';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { TareaSelectedData } from '../../_models/Tarea/TareaSelected/TareaSelectedDat';
import { TareaActionData } from '../../_models/Tarea/TareaAction/TareaActionData';
import { DeleteTareaData } from '../../_models/Tarea/TareaDelete/DeleteTareaDto';
import { DesAsignarTareaReqData } from '../../_models/Tarea/TareaDesAsigna/DesAsignarTareaReqData';
import { TareaService } from '../../_services/tarea.service';

@Component({
  selector: 'app-tarea-conf-act',
  templateUrl: './tarea-conf-act.component.html',
  styleUrl: './tarea-conf-act.component.css'
})
export class TareaConfActComponent {

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
