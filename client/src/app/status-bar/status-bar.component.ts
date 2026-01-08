import { Component, ElementRef, ViewChild } from '@angular/core';
import { appMessage } from '../_models/appMessage';
import { MessageService } from '../_services/message.service';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrl: './status-bar.component.css',
    standalone: false
})
export class StatusBarComponent {

  constructor(public messageService: MessageService){

  }

  clearAppMessage(){
    this.messageService.setMessage(undefined);
  }  

  closeAppMessage(){
    this.clearAppMessage();
  }

}
