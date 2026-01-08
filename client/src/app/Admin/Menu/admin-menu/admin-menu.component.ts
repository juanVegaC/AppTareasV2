import { Component } from '@angular/core';
import { NavigationService } from '../../../_services/navigation.service';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrl: './admin-menu.component.css',
    standalone: false
})
export class AdminMenuComponent {

  constructor(private navService: NavigationService) { }

  handleRegresar(){
    this.navService.goHome();
  }

  handleCatalogoClick(){
    this.navService.goToCatMenu();
  }
}
