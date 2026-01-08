import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goHome(){
    console.log("GoHome");
    this.router.navigateByUrl('/tareasHomeN');
  }

  goToLogin(){
    this.router.navigateByUrl('/');
  }

  goToAdmin(){
    this.router.navigateByUrl('/adminMenu');
  }

  goToCatMenu(){
    this.router.navigateByUrl('/catMenu');
  }

  goToCatUsuarios(){
    this.router.navigateByUrl('/listaUsuarios');
  }
  goToCatPuestos(){
    this.router.navigateByUrl('/listaPuestos');
  }
  goToCatEmpleados(){
    this.router.navigateByUrl('/listaEmpleados');
  }

  goToCatTextos(){
    this.router.navigateByUrl('/listaTextos');
  }
  goToCatTableros(){
    this.router.navigateByUrl('/listaTableros');
  }
  goToCatEstatus(){
    this.router.navigateByUrl('/listaEstatus');
  }

}
