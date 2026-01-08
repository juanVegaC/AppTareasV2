import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { PuestoTabCreateReq } from '../../../../_models/PuestoTab/PuestoTabCreate/PuestoTabCreateReq';
import { TableroService } from '../../../../_services/tablero.service';
import { PuestoTabService } from '../../../../_services/puesto-tab.service';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { TablerosGetAllRes } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllRes';
import { appMessage } from '../../../../_models/appMessage';
import { TablerosGetAllReq } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllReq';
import { AppMsg } from '../../../../_models/Messages/AppMsg';

@Component({
    selector: 'app-puestotab-add',
    templateUrl: './puestotab-add.component.html',
    styleUrl: './puestotab-add.component.css',
    standalone: false
})
export class PuestotabAddComponent {

    constructor(
      private _renderer: Renderer2,
      private tableroService: TableroService,
      private puestoTabService: PuestoTabService
     ){
    }


    @Input() puesto: PuestosGetAllRes;

    @Output() cerrar = new EventEmitter();

    @ViewChild('dialogTableroInput') oSelectTableroId: ElementRef;
    @ViewChild('dialogPrincipalInput') oDialogPrincipalInput: ElementRef;

    catTableros: Array<TablerosGetAllRes>;

    puestoTabAsigna: PuestoTabCreateReq = {
      puestoId:0,
      tableroId:0,
      principal:false,
      borrado:false
    }

    nombreErrMsg: string = ""
  
  
    message: appMessage = {
      type: "",
      text: "",
      number: 0,
      displayStyle: ""
    }


    ngOnInit(){
      this.loadData();
    }
  

    loadData(){
      var param : TablerosGetAllReq ={
        Id: 0
      }
  
      this.tableroService.getAll(param).subscribe(tableros => {
        console.log(tableros);
        this.catTableros = tableros;
      });
  
    }
  
    clearDialog(){
      this.oSelectTableroId.nativeElement.value= 0;
      this.oDialogPrincipalInput.nativeElement.checked= false;
  
      this._renderer.setAttribute(this.oSelectTableroId.nativeElement, 'value-state', 'None'); 
       this.nombreErrMsg = "";
    }  
    

  
    resetStatusDialog(){
       this._renderer.setAttribute(this.oSelectTableroId.nativeElement, 'value-state', 'None');
      this.nombreErrMsg = "";
  
    }
  
    closeAppMessage(){
      this.message  = {
        type: "",
        text: "",
        number: 0,
        displayStyle: ""
      }
    }
  
  
  
    close(){
      var resultMessages: AppMsg[] = [];
      this.resetStatusDialog();
      this.cerrar.emit({
        resultMsg:resultMessages,
        reloadData: 0
      });
    } 
  
    guardar(){
      var error : boolean = false
      this.resetStatusDialog();

      this.puestoTabAsigna.puestoId = this.puesto.id;
      this.puestoTabAsigna.tableroId = Number(this.oSelectTableroId.nativeElement.value);
      this.puestoTabAsigna.principal = this.oDialogPrincipalInput.nativeElement.checked;

      console.log(this.puestoTabAsigna);

      if (!this.puestoTabAsigna.tableroId || this.puestoTabAsigna.tableroId == 0){
        this._renderer.setAttribute(this.oSelectTableroId.nativeElement, 'value-state', 'Negative');
        error = true
      }

      if (!error){
        this.puestoTabService.Create(this.puestoTabAsigna).subscribe(response =>{
          console.log(response);

          var lvError = false
          
          response.messages.forEach(msg => {
            if (msg.type == "E"){
                lvError = true
                this.message  = {
                  type: msg.type,
                  text: msg.text,
                  number: 0,
                  displayStyle: "Negative"
                }        
            }
          });

          if (!lvError){
            this.closeAppMessage();
            this.clearDialog();
            this.cerrar.emit({
              resultMsg: response.messages,
              reloadData: 1
            });  
          }
      
        });
      }

    }


}
