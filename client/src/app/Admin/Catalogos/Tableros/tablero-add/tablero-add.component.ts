import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { TableroCreateReq } from '../../../../_models/Tableros/TableroCreate/TableroCreateReq';
import { TableroService } from '../../../../_services/tablero.service';

@Component({
  selector: 'app-tablero-add',
  templateUrl: './tablero-add.component.html',
  styleUrl: './tablero-add.component.css'
})
export class TableroAddComponent {
  constructor(
    private _renderer: Renderer2,
    private tableroService: TableroService ){
  }

  @Input() tablero: TableroCreateReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogNombreInput') oDialogNombreInput: ElementRef;



  nombreErrMsg: string = ""


  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

  clearDialog(){
    this.oDialogNombreInput.nativeElement.value= "";

    this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', '');
  }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', '');
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
    //this.clearDialog();
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadData: 0
    });
  }

  guardar(){
    var error : boolean = false

    this.resetStatusDialog();

    this.tablero.nombre = this.oDialogNombreInput.nativeElement.value



    if(!error){
       this.tableroService.Create(this.tablero).subscribe(response =>{
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
          //this.clearDialog();
          this.cerrar.emit({
            resultMsg: response.messages,
            reloadData: 1
          });  
        }

      });
       
    }
  }
}
