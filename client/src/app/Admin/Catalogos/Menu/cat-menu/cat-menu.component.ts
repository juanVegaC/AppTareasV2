import { Component } from '@angular/core';
import { NavigationService } from '../../../../_services/navigation.service';

@Component({
  selector: 'app-cat-menu',
  templateUrl: './cat-menu.component.html',
  styleUrl: './cat-menu.component.css'
})
export class CatMenuComponent {

  constructor(private navService: NavigationService) { }

  handleRegresar(){
    this.navService.goToAdmin();
  }

  handleCatUsuarios(){
    this.navService.goToCatUsuarios();
  }

  handleCatPuestos(){
    this.navService.goToCatPuestos();
  }
  
  handleCatEmpleados(){
    this.navService.goToCatEmpleados();
  }

  handleCatTextos(){
    this.navService.goToCatTextos();
  }

    handleCatTableros(){
    this.navService.goToCatTableros();
  }

  handleCatEstatus(){
    this.navService.goToCatEstatus();
  }

}
