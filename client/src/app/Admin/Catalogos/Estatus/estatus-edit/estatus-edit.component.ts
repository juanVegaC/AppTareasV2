import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { EstatusService } from '../../../../_services/estatus.service';
import { EstatusEditReq } from '../../../../_models/Estatus/EstatusEdit/EstatusEditReq';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';

@Component({
    selector: 'app-estatus-edit',
    templateUrl: './estatus-edit.component.html',
    styleUrl: './estatus-edit.component.css',
    standalone: false
})
export class EstatusEditComponent {
  constructor(
    private _renderer: Renderer2,
    private estatusService: EstatusService ){
  }

  @Input() estatus: EstatusEditReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogIdInput') oDialogIdInput: ElementRef;
  @ViewChild('dialogTipoInput') oDialogTipoInput: ElementRef;
  @ViewChild('dialogEstatusInput') oDialogEstatusInput: ElementRef;
  @ViewChild('dialogTextoIdInput') oDialogTextoIdInput: ElementRef;
  @ViewChild('dialogBorradoInput') oDialogBorradoInput: ElementRef;


  tipoErrMsg: string = ""
  textoIdErrMsg: string = ""
  estatusErrMsg: string = ""

  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

  clearDialog(){
    this.oDialogIdInput.nativeElement.value= "";
    this.oDialogTipoInput.nativeElement.value= "";
    this.oDialogEstatusInput.nativeElement.value= "";
    this.oDialogTextoIdInput.nativeElement.value = "";
    this.oDialogBorradoInput.nativeElement.checked = false;

    this._renderer.setAttribute(this.oDialogIdInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogEstatusInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', '');
  }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogIdInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogEstatusInput.nativeElement, 'value-state', '');    
    this._renderer.setAttribute(this.oDialogTipoInput.nativeElement, 'value-state', '');    
    this.textoIdErrMsg = ""
    this.tipoErrMsg = ""
    this.estatusErrMsg = ""
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

    this.estatus.id = this.oDialogIdInput.nativeElement.value;
    this.estatus.textoId = this.oDialogTextoIdInput.nativeElement.value;
    this.estatus.tipo = this.oDialogTipoInput.nativeElement.value;
    this.estatus.estatus = this.oDialogEstatusInput.nativeElement.value;
    this.estatus.borrado = this.oDialogBorradoInput.nativeElement.checked;


    if (this.estatus.tipo == ""){
      this._renderer.setAttribute(this.oDialogTipoInput.nativeElement, 'value-state', 'Negative');
      this.tipoErrMsg = "Debe Ingresar un tipo de estatus"
      error = true;
    }

    if (this.estatus.estatus == 0){
      this._renderer.setAttribute(this.oDialogEstatusInput.nativeElement, 'value-state', 'Negative');
      this.estatusErrMsg = "Debe Ingresar un Estatus"
      error = true;
    }

    if (this.estatus.textoId == 0){
      this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', 'Negative');
      this.textoIdErrMsg = "Debe Ingresar un Id de Texto"
      error = true;
    }


    if(!error){
       this.estatusService.estatusEdit(this.estatus).subscribe(response =>{
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
