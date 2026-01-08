import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { EstadosService } from '../../../../_services/estados.service';
import { EstadoCreateReq } from '../../../../_models/Estado/EstadoCreate/EstadoCreateReq';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';

@Component({
    selector: 'app-estado-create',
    templateUrl: './estado-create.component.html',
    styleUrl: './estado-create.component.css',
    standalone: false
})
export class EstadoCreateComponent {
  constructor(
    private _renderer: Renderer2,
    private estadosService: EstadosService ){
  }

  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogNombreInput') oDialogNombreInput: ElementRef;

   estado: EstadoCreateReq = {
    estado: "",
    ctrl_app_active: false
  }


  nombreErrMsg: string = ""


  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

  clearDialog(){
    this.oDialogNombreInput.nativeElement.value= "";

    this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', 'None');
  }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', 'None');
    this.nombreErrMsg = ""

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
    this.clearDialog();
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadData: 0
    });
  }

  guardar(){
    var error : boolean = false

    this.resetStatusDialog();

    this.estado.estado = this.oDialogNombreInput.nativeElement.value

    if (this.estado.estado == null || this.estado.estado == ""){
      this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', 'Negative');
      error = true
    }


    if(!error){
       this.estadosService.Create(this.estado).subscribe(response =>{
        //console.log(result);
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
