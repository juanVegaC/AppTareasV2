import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { TareasPuestoTabDet } from '../../../../_models/TareasPuestoTab/TareasPuestoTabData/TareasPuestoTabDet';

@Component({
  selector: 'app-tarea-detalle-home',
  templateUrl: './tarea-detalle-home.component.html',
  styleUrl: './tarea-detalle-home.component.css'
})
export class TareaDetalleHomeComponent {

  @Input() tarea: TareasPuestoTabDet;
  @Output() cerrar = new EventEmitter();



  close(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });
  }
}
