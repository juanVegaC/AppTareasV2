import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { TableroService } from '../../../../_services/tablero.service';
import { TableroEditReq } from '../../../../_models/Tableros/TableroEdit/TableroEditReq';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';

@Component({
  selector: 'app-tablero-edit',
  templateUrl: './tablero-edit.component.html',
  styleUrl: './tablero-edit.component.css'
})
export class TableroEditComponent {
  constructor(
    private _renderer: Renderer2,
    private tableroService: TableroService ){
  }

  @Input() tablero: TableroEditReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogNombreInput') oDialogNombreInput: ElementRef;
  @ViewChild('dialogBorradoInput') oDialogBorradoInput: ElementRef;



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

    if(!this.oDialogNombreInput.nativeElement.value || this.oDialogNombreInput.nativeElement.value.trim() == ""){
      error = true;
      this.nombreErrMsg = "El nombre es requerido";
      this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', 'Error');
    }else{
      this.tablero.nombre = this.oDialogNombreInput.nativeElement.value
    }

    this.tablero.borrado = this.oDialogBorradoInput.nativeElement.checked


    if(!error){
       this.tableroService.Edit(this.tablero).subscribe(response =>{
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
