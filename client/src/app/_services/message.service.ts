import { Injectable } from '@angular/core';
import { appMessage } from '../_models/appMessage';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private currentMessageSource = new ReplaySubject<appMessage>(1);
  currentMessage$ = this.currentMessageSource.asObservable()
  currMessage: appMessage;

  constructor() { }

  setMessage(message: appMessage){
    if (message){
       if(message.type == "E"){
        message.displayStyle = "Negative";
      }
    }
    this.currentMessageSource.next(message);

    setTimeout(() => 
      {
        this.currentMessageSource.next(undefined);
      },
      3000);
  }

  messagesToShow(){
    if(this.currMessage !== undefined && this.currMessage.number !== 0){
      return true;
    }
    return false;
  }

  getAppMessage(){
    return this.currMessage;
  }
}
