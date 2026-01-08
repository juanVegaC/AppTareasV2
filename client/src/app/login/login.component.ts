import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { appMessage } from '../_models/appMessage';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';
import { NavigationService } from '../_services/navigation.service';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit {

  validationErrors: string[]=[];
  model: any = {}

  @ViewChild('ui_message') ui_message: ElementRef;
  @ViewChild('busy_indicator') busy_indicator: ElementRef;
  @ViewChild('username_txt') ui_username_txt: ElementRef;
  @ViewChild('password_txt') ui_password_txt: ElementRef;
  @ViewChild('btn_login') btn_login: ElementRef;

  constructor(private accountService : AccountService,
              private messageService: MessageService,
              private navService: NavigationService
          ){}

  ngOnInit(): void {
    //console.log(this.accountService.currentUser$);

    if (this.accountService.isLoged()){
      this.navService.goHome();
      //this.router.navigateByUrl('/tareasHome');
      //console.log("UserLoged");
    }
    
  }

  ngAfterViewInit() {
    this.busy_indicator.nativeElement.active = false;
    this.btn_login.nativeElement.disabled = false;
  }


  
  handleLogin(){
    this.login()
  }

  updateUserName(event){
    console.log(event);
  }

  login() {
    // check if this.ui_username_txt.nativeElement.value has a value
    if (!this.ui_username_txt.nativeElement.value) {
      this.messageService.setMessage({type:"E",text:"El usuario es requerido",number:101, displayStyle:"Negative"})
      return;
    }

    // check if this.ui_password_txt.nativeElement.value has a value
    if (!this.ui_password_txt.nativeElement.value) {  
      this.messageService.setMessage({type:"E",text:"La contraseña es requerida",number:102, displayStyle:"Negative"})
      return
    }

    this.model.username = this.ui_username_txt.nativeElement.value;
    this.model.password = this.ui_password_txt.nativeElement.value; 
    this.ui_username_txt.nativeElement.value = "";
    this.ui_password_txt.nativeElement.value = "";

  
    this.busy_indicator.nativeElement.active = true;
    this.btn_login.nativeElement.disabled = true;
    //this._renderer.setAttribute(this.busy_indicator, 'active', 'true');
    this.accountService.login(this.model).pipe(
      switchMap(response => {
        console.log(response);
        this.busy_indicator.nativeElement.active = false;
        this.btn_login.nativeElement.disabled = false;
        //this._renderer.setAttribute(this.busy_indicator, 'active', 'false');
        this.accountService.getUserData(this.model.username);
        return of(true);
      }),
      catchError(error => {
        this.validationErrors = error;
        //this.messageService.setMessage({type:"E",text:error.message,number:104, displayStyle:"Negative"})
        this.busy_indicator.nativeElement.active = false;
        this.btn_login.nativeElement.disabled = false;
        return of(false);
      })
    ).subscribe(success => {
      if (success) {
        this.messageService.setMessage(undefined);
        this.navService.goHome();
      }
    });
  }
}
