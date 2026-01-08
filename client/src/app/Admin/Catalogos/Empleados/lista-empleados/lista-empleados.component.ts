import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';
import { EmpleadosService } from '../../../../_services/empleados.service';
import { MessageService } from '../../../../_services/message.service';
import { EmpleadosGetAllRes } from '../../../../_models/Empleado/EmpleadosGetall/EmpleadosGetAllRes';
import { EmpleadosGetAllReq } from '../../../../_models/Empleado/EmpleadosGetall/EmpleadosGetAllReq';
import { EmpleadoCreateReq } from '../../../../_models/Empleado/EmpleadoCreate/EmpleadoCreateReq';
import { formatDate } from '@angular/common';
import { EmpleadoEditReq } from '../../../../_models/Empleado/EmpleadoEdit/EmpleadoEditReq';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})
export class ListaEmpleadosComponent implements AfterViewInit {

  constructor(
    private navService: NavigationService,
    private empleadoService: EmpleadosService,
    private messageService: MessageService) { }

    @ViewChild('busy_indicator') busy_indicator: ElementRef;
    @ViewChild('dialogEdit') oDialogEdit: ElementRef;
    @ViewChild('dialogAdd') oDialogAdd: ElementRef;

    empleados: Array<EmpleadosGetAllRes>;

    empleadoAdd: EmpleadoCreateReq ={
      validoDesde:null,
      validoHasta:null,
      userId:0,
      puestoId:0,
      principal:false,
      validoDesdeStr: formatDate(Date.now(),"yyyyMMdd",'en-US'),
      validoHastaStr:"20991231"             
    }
    empleadoEdit: EmpleadoEditReq ={
      id:0,
      validoDesde:null,
      validoHasta:null,
      userId:0,
      puestoId:0,
      principal:false,
      validoDesdeStr: formatDate(Date.now(),"yyyyMMdd",'en-US'),
      validoHastaStr:"20991231" ,
      borrado:false            
    }
  
    ngAfterViewInit() {
      this.loadData();
    }
  
    handleRegresar(){
      this.navService.goToCatMenu();
    }

    reLoadData(){
      this.empleados = [];
      this.loadData();
    }
  
    loadData(){
      var param : EmpleadosGetAllReq ={
        ctrl_app_action: "EMPLEADOS_ALL"
      }
      this.busy_indicator.nativeElement.active = true;
      this.empleadoService.getEmpleados(param).subscribe(empleados => {
        this.busy_indicator.nativeElement.active = false;
        console.log(empleados);
        this.empleados = empleados;
        //console.log(this.usuarios)
      });
    }

    handleAdd(){
      
      this.empleadoAdd ={
        validoDesde:null,
        validoHasta:null,
        userId:0,
        puestoId:0,
        principal:false,
        validoDesdeStr: formatDate(Date.now(),"yyyyMMdd",'en-US'),
        validoHastaStr:"20991231"             
      }
  
      this.oDialogAdd.nativeElement.open = true;
    }
  
    handleEdit($event, id){
      var empleado = this.getEmpleadoFromId(id);
      //console.log(puesto);
      this.empleadoEdit ={
        id:empleado.id,
        validoDesde:empleado.validoDesde,
        validoHasta:empleado.validoHasta,
        userId:empleado.userId,
        puestoId:empleado.puestoId,
        principal:empleado.principal,
        validoDesdeStr: formatDate(empleado.validoDesde,"yyyyMMdd",'en-US'),
        validoHastaStr:formatDate(empleado.validoHasta,"yyyyMMdd",'en-US'),
        borrado:empleado.borrado          
      }
      this.oDialogEdit.nativeElement.open = true;  
    }

    handleCloseEdit($event){
      var resultMsg = $event.resultMsg;
      this.empleadoEdit ={
      id:0,
      validoDesde:null,
      validoHasta:null,
      userId:0,
      puestoId:0,
      principal:false,
      validoDesdeStr: formatDate(Date.now(),"yyyyMMdd",'en-US'),
      validoHastaStr:"20991231" ,
      borrado:false            
    }
      //this.empleadoEdit.ctrl_app_active = false;
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
      if($event.reloadData){
        this.reLoadData();
      }  
      this.oDialogEdit.nativeElement.open = false;
    }
  
    getEmpleadoFromId(id):EmpleadosGetAllRes{
      var result : EmpleadosGetAllRes;
      this.empleados.forEach(empleado => {
        if(empleado.id == id){
  
          result= empleado;
        }
    });  
      return result;
    }
  
    handleCloseAdd($event){
      var resultMsg = $event.resultMsg;

      this.empleadoAdd ={
      validoDesde:null,
      validoHasta:null,
      userId:0,
      puestoId:0,
      principal:false,
      validoDesdeStr: formatDate(Date.now(),"yyyyMMdd",'en-US'),
      validoHastaStr:"20991231"             
    }      
      //console.log(resultMsg);
      resultMsg.forEach( msg =>{
        this.messageService.setMessage({type:msg.type,text:msg.text,number:101, displayStyle:""})
      });
      if($event.reloadData){
        this.reLoadData();
      }  
      this.oDialogAdd.nativeElement.open = false;
    }
  
}
