import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { TableroService } from '../../../../_services/tablero.service';
import { PuestoTabService } from '../../../../_services/puesto-tab.service';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { TablerosGetAllRes } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllRes';
import { PuestoTabEditReq } from '../../../../_models/PuestoTab/PuestoTabEdit/PuestoTabEditReq';
import { appMessage } from '../../../../_models/appMessage';
import { TablerosGetAllReq } from '../../../../_models/Tableros/TablerosGetAll/TablerosGetAllReq';
import { AppMsg } from '../../../../_models/Messages/AppMsg';

@Component({
  selector: 'app-puestotab-edit',
  templateUrl: './puestotab-edit.component.html',
  styleUrl: './puestotab-edit.component.css'
})
export class PuestotabEditComponent {
    constructor(
      private _renderer: Renderer2,
      private tableroService: TableroService,
      private puestoTabService: PuestoTabService
     ){
    }


    @Input() puestoTab: PuestoTabEditReq;

    @Output() cerrar = new EventEmitter();

    @ViewChild('dialogTableroInput') oSelectTableroId: ElementRef;
    @ViewChild('dialogPrincipalInput') oDialogPrincipalInput: ElementRef;
    @ViewChild('dialogBorradoInput') oDialogBorradoInput: ElementRef;

    catTableros: Array<TablerosGetAllRes>;


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
      this.oDialogBorradoInput.nativeElement.checked= false;

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

      this.puestoTab.tableroId = Number(this.oSelectTableroId.nativeElement.value);
      this.puestoTab.principal = this.oDialogPrincipalInput.nativeElement.checked;
      this.puestoTab.borrado = this.oDialogBorradoInput.nativeElement.checked;

      console.log(this.puestoTab);

      if (!this.puestoTab.tableroId || this.puestoTab.tableroId == 0){
        this._renderer.setAttribute(this.oSelectTableroId.nativeElement, 'value-state', 'Negative');
        error = true
      }

      if (!error){
        this.puestoTabService.Edit(this.puestoTab).subscribe(response =>{
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
