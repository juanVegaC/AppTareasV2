import { Component, ElementRef, ViewChild } from '@angular/core';
import { SPuestoPorUsuarioDto } from '../../../_models/Puesto/SPuestoPorUsuarioDto';
import { TareaCreateReqDat } from '../../../_models/Tarea/TareaCreate/TareaCreateReqDat';
import { PuestosGetParams } from '../../../_models/Puesto/PuestosGetParams';
import { PuestoService } from '../../../_services/puesto.service';
import { MessageService } from '../../../_services/message.service';
import { SListaTareasNViewConfig } from '../../../_views/config/SListaTareasNViewConfig';
import { PuestoTabGetAllRes } from '../../../_models/PuestoTab/PuestoTabGetAll/PuestoTabGetAllRes';

@Component({
  selector: 'app-home-tareas',
  templateUrl: './home-tareas.component.html',
  styleUrl: './home-tareas.component.css'
})
export class HomeTareasComponent {


  puestoSelected: SPuestoPorUsuarioDto ={
    usuarioId: 0,
    usuario: "",
    nombre: "",
    empleadoId: 0,
    puestoId: 0,
    puestoTitulo: "",
    principal: false,
    puestoPropio:false,
    esPool:false,
    tableroId: 0
  }

  listaTareasViewConfig: SListaTareasNViewConfig = {
    showPrioridadPuesto: true,
    showAvancePuesto: true,   
    showPrioridadAtendiendo: true,
    showAvanceAtendiendo: true,
    showAccionesBoton: true   
  }


  reloadTareas: boolean = false;


  

  ngOnInit(): void {


  }


  loadTareasData(){

    this.  puestoSelected ={
      usuarioId: this.puestoSelected.usuarioId,
      usuario: this.puestoSelected.usuario,
      nombre: this.puestoSelected.nombre,
      empleadoId: this.puestoSelected.empleadoId,
      puestoId:  this.puestoSelected.puestoId,
      puestoTitulo: this.puestoSelected.puestoTitulo,
      principal: this.puestoSelected.principal,
      puestoPropio:this.puestoSelected.puestoPropio,
      esPool: this.puestoSelected.esPool,
      tableroId: this.puestoSelected.tableroId
    }
  
  }

  handleSelectedPuestoChanged($event){
    if($event.tareasReload){
      this.puestoSelected = $event.puestoSelected;
      this.loadTareasData();
    }
  }

}
