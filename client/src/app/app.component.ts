import { Component, Input, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'bio-tareas-cli';

  constructor(private accountService: AccountService){
    
  }
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('userBioTareas'));
    if(user){
      this.accountService.setCurrentUser(user);
    }
  }  
}
