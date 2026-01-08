import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { UserAdminService } from '../../_services/user-admin.service';
import { UsuarioEditReq } from '../../_models/Usuario/UsuarioEdit/UsuarioEditReq';
import { appMessage } from '../../_models/appMessage';
import { UsuarioChangePassReq } from '../../_models/Usuario/UsuarioChangePass/UsuarioChangePassReq';

@Component({
  selector: 'app-cambia-passw',
  templateUrl: './cambia-passw.component.html',
  styleUrl: './cambia-passw.component.css'
})
export class CambiaPasswComponent {

  constructor(
    private userAdminService: UserAdminService,
    private _renderer: Renderer2){}

    @Output() cerrar = new EventEmitter();
    @Input() iniData: boolean;

    @ViewChild('dialogPasswInput') oDialogPasswInput: ElementRef;
    @ViewChild('dialogPasswNewInput') oDialogPasswNewInput: ElementRef;
    @ViewChild('dialogPasswNewConfInput') oDialogPasswNewConfInput: ElementRef;


    passwordErrMsg: string = ""
    passwordNewErrMsg: string = ""
    passwordNewConfErrMsg: string = ""
    message: appMessage = {
      type: "",
      text: "",
      number: 0,
      displayStyle: ""
    }


    ngOnChanges(changes: SimpleChanges) {
      if ( this.iniData ) {
        this.ngOnInit(); // Llama a ngOnInit manualmente
      }
    }
  
    ngOnInit(){
      //this.clearDialog();
    }
  
    close(){
      var resultMessages: AppMsg[] = [];
      this.clearDialog();
      this.cerrar.emit({
        resultMsg:resultMessages,
        reloadTareas: 0
      });
    }


    closeAppMessage(){
      this.message  = {
        type: "",
        text: "",
        number: 0,
        displayStyle: ""
      }
    }

    clearDialog(){
      this.oDialogPasswInput.nativeElement.value= "";
      this.oDialogPasswNewInput.nativeElement.value= "";
      this.oDialogPasswNewConfInput.nativeElement.value = "";
  
      this._renderer.setAttribute(this.oDialogPasswInput.nativeElement, 'value-state', '');
      this._renderer.setAttribute(this.oDialogPasswNewInput.nativeElement, 'value-state', '');
      this._renderer.setAttribute(this.oDialogPasswNewConfInput.nativeElement, 'value-state', '');    
    }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogPasswInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogPasswNewInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogPasswNewConfInput.nativeElement, 'value-state', '');    
    this.passwordErrMsg = ""
    this.passwordNewErrMsg = ""
    this.passwordNewConfErrMsg = ""
  }
  
  cambiarPasword(){
    var userChangePass : UsuarioChangePassReq = {
      password:"",
      passwordNew:"",
      passwordNewConf: "",
      ctrl_app_action: "CHANGE_PASSWORD"
    }

    var error : boolean = false

    this.resetStatusDialog();

    userChangePass.password = this.oDialogPasswInput.nativeElement.value;
    userChangePass.passwordNew = this.oDialogPasswNewInput.nativeElement.value;
    userChangePass.passwordNewConf = this.oDialogPasswNewConfInput.nativeElement.value;


    if (userChangePass.password == ""){
      this._renderer.setAttribute(this.oDialogPasswInput.nativeElement, 'value-state', 'Negative');
      this.passwordErrMsg = "Debe Ingresar su contraseña actual."
      error = true;
    }

    if (userChangePass.passwordNew == ""){
      this._renderer.setAttribute(this.oDialogPasswNewInput.nativeElement, 'value-state', 'Negative');
      this.passwordNewErrMsg = "Debe Ingresar una contraseña nueva."
      error = true;
    }

    if (userChangePass.password == userChangePass.passwordNew){
      this._renderer.setAttribute(this.oDialogPasswNewInput.nativeElement, 'value-state', 'Negative');
      this.passwordNewErrMsg = "La nueva contraseña debe ser diferente a la actual."
      error = true;
    }


    if (userChangePass.passwordNewConf == ""){
      this._renderer.setAttribute(this.oDialogPasswNewConfInput.nativeElement, 'value-state', 'Negative');
      this.passwordNewConfErrMsg = "Debe confirmar su nueva contraseña."
      error = true;
    }

    if (userChangePass.passwordNew != userChangePass.passwordNewConf){
      this._renderer.setAttribute(this.oDialogPasswNewConfInput.nativeElement, 'value-state', 'Negative');
      this.passwordNewConfErrMsg = "La nueva contraseña no coincide."      
      error = true;
    }

    if(!error){
      
      this.userAdminService.changePassword(userChangePass).subscribe(response =>{
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
            reloadTareas: 1
          });  
        }
    
      });     
    }
    //this.close();
  }
}
