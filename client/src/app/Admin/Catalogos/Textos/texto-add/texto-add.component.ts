import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { TextoService } from '../../../../_services/texto.service';
import { TextoCreateReq } from '../../../../_models/Textos/TextoCreate/TextoCreateReq';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';

@Component({
  selector: 'app-texto-add',
  templateUrl: './texto-add.component.html',
  styleUrl: './texto-add.component.css'
})
export class TextoAddComponent {

  constructor(
    private _renderer: Renderer2,
    private textoService: TextoService ){
  }

  @Input() texto: TextoCreateReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogTextoIdInput') oDialogTextoIdInput: ElementRef;
  @ViewChild('dialogIdiomaInput') oDialogIdiomaInput: ElementRef;
  @ViewChild('dialogTextoInput') oDialogTextoInput: ElementRef;


  textoIdErrMsg: string = ""
  idiomaErrMsg: string = ""
  textoErrMsg: string = ""

  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

  clearDialog(){
    this.oDialogTextoIdInput.nativeElement.value= "";
    this.oDialogIdiomaInput.nativeElement.value= "";
    this.oDialogTextoInput.nativeElement.value = "";

    this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogIdiomaInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogTextoInput.nativeElement, 'value-state', '');
  }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogIdiomaInput.nativeElement, 'value-state', '');    
    this._renderer.setAttribute(this.oDialogTextoInput.nativeElement, 'value-state', '');    
    this.textoIdErrMsg = ""
    this.idiomaErrMsg = ""
    this.textoErrMsg = ""
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

    this.texto.textoId = this.oDialogTextoIdInput.nativeElement.value
    this.texto.idioma = this.oDialogIdiomaInput.nativeElement.value;
    this.texto.texto = this.oDialogTextoInput.nativeElement.value

  /*   if (this.texto.textoId == 0){
      this._renderer.setAttribute(this.oDialogTextoIdInput.nativeElement, 'value-state', 'Negative');
      this.textoIdErrMsg = "Debe Ingresar un Id de Texto"
      error = true;
    } */

    if (this.texto.idioma == ""){
      this._renderer.setAttribute(this.oDialogIdiomaInput.nativeElement, 'value-state', 'Negative');
      this.idiomaErrMsg = "Debe Ingresar un idioma de Texto"
      error = true;
    }

    if (this.texto.texto == ""){
      this._renderer.setAttribute(this.oDialogTextoInput.nativeElement, 'value-state', 'Negative');
      this.textoErrMsg = "Debe Ingresar un Texto"
      error = true;
    }


    if(!error){
       this.textoService.textoCreate(this.texto).subscribe(response =>{
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
