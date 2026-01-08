import { Component, Input, SimpleChanges } from '@angular/core';
import { TareasPuestoTabDet } from '../../../../_models/TareasPuestoTab/TareasPuestoTabData/TareasPuestoTabDet';
import { ActividadService } from '../../../../_services/actividad.service';
import { ActvPorAsigGetRes } from '../../../../_models/Actividad/ActvPorAsigGet/ActvPorAsigGetRes';
import { ActvPorAsigGetReq } from '../../../../_models/Actividad/ActvPorAsigGet/ActvPorAsigGetReq';

@Component({
    selector: 'app-tarea-det-actv',
    templateUrl: './tarea-det-actv.component.html',
    styleUrl: './tarea-det-actv.component.css',
    standalone: false
})
export class TareaDetActvComponent {


  constructor(
      private actvService: ActividadService
  ) {}

  @Input() tarea: TareasPuestoTabDet;


  actividades: Array<ActvPorAsigGetRes>;


    ngOnChanges(changes: SimpleChanges) {
      if ( this.tarea) {
        this.init(); // Llama a ngOnInit manualmente
      }
    }
  
    init(){
      this.loadActvDAsig();  
    }

  loadActvDAsig(){
    
    var loParams : ActvPorAsigGetReq = {
      asigId: this.tarea.asigId,
      ctrl_app_action: "ACTIVIDAD_D_ASIG"
    }

    this.actividades = [];

    this.actvService.getActvDeAsig(loParams).subscribe(actividades =>{
      console.log(actividades);
      this.actividades = actividades;
    });

  }


    get_tiempo_act(actv:ActvPorAsigGetRes){

    var result : string =  ""
    if (actv.actvHrs > 0){
      result = actv.actvHrs.toString() + " hrs. "
    }

    if(actv.actvMins > 0){
      if (result){
        result = result + " " + actv.actvMins.toString() + " mins."        
      }else{
        result = actv.actvMins.toString() + " mins."
      }
    }

    return result;
  }

    get_total_tiempo() {
    let totalMins = 0;
    let totalHrs = 0;
    if (!this.actividades) return '';
    this.actividades.forEach(actv => {
      totalHrs += actv.actvHrs || 0;
      totalMins += actv.actvMins || 0;
    });
    totalHrs += Math.floor(totalMins / 60);
    totalMins = totalMins % 60;
    let result = '';
    if (totalHrs > 0) result += `${totalHrs} hrs. `;
    if (totalMins > 0) result += `${totalMins} mins.`;
    return result.trim();
  }

    get_total_avance() {
    let avance = 0;
    let prevActId = 0;
    if (!this.actividades) return '';
    this.actividades.forEach(actv => {
      if(prevActId < actv.id){
       avance = actv.avance || 0;
      } 
      prevActId = actv.id;
      
    });

    return avance + "%";
  }
}
