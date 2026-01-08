import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { UsuarioCreateReq } from '../../../../_models/Usuario/UsuarioCreate/UsuarioCreateReq';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { AccountService } from '../../../../_services/account.service';
import { appMessage } from '../../../../_models/appMessage';

@Component({
    selector: 'app-usuario-add',
    templateUrl: './usuario-add.component.html',
    styleUrl: './usuario-add.component.css',
    standalone: false
})
export class UsuarioAddComponent implements OnInit {

  constructor(
    private _renderer: Renderer2,
    private accountService: AccountService ){
  }

  @Input() usuario: UsuarioCreateReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogUsuarioInput') oDialogUsuarioInput: ElementRef;
  @ViewChild('dialogNombreInput') oDialogNombreInput: ElementRef;
  @ViewChild('dialogPasswordInput') oDialogPasswordInput: ElementRef;

  userNameErrMsg: string = ""
  nameErrMsg: string = ""
  passwordErrMsg: string = ""
  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( this.usuario.ctrl_app_active ) {
      this.ngOnInit(); // Llama a ngOnInit manualmente
    }
  }

  ngOnInit():void{
    //this.clearDialog();
  }

  clearDialog(){
    this.oDialogUsuarioInput.nativeElement.value= "";
    this.oDialogNombreInput.nativeElement.value= "";
    this.oDialogPasswordInput.nativeElement.value = "";

    this._renderer.setAttribute(this.oDialogUsuarioInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogPasswordInput.nativeElement, 'value-state', '');    
  }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogUsuarioInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogPasswordInput.nativeElement, 'value-state', '');    
    this.userNameErrMsg = ""
    this.nameErrMsg = ""
    this.passwordErrMsg = ""
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

    this.usuario.userName = this.oDialogUsuarioInput.nativeElement.value
    this.usuario.name = this.oDialogNombreInput.nativeElement.value;
    this.usuario.password = this.oDialogPasswordInput.nativeElement.value;

    if (this.usuario.userName == ""){
      this._renderer.setAttribute(this.oDialogUsuarioInput.nativeElement, 'value-state', 'Negative');
      this.userNameErrMsg = "Debe Ingresar un usuario."
      error = true;
    }

    if (this.usuario.name == ""){
      this._renderer.setAttribute(this.oDialogNombreInput.nativeElement, 'value-state', 'Negative');
      this.nameErrMsg = "Debe Ingresar un nombre."
      error = true;
    }

    if (this.usuario.password == ""){
      this._renderer.setAttribute(this.oDialogPasswordInput.nativeElement, 'value-state', 'Negative');
      this.passwordErrMsg = "Debe Ingresar un password."
      error = true;
    }

    if(!error){
      this.accountService.register(this.usuario).subscribe(response =>{
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
