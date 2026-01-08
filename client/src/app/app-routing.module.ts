import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminMenuComponent } from './Admin/Menu/admin-menu/admin-menu.component';
import { CatMenuComponent } from './Admin/Catalogos/Menu/cat-menu/cat-menu.component';
import { ListaUsuariosComponent } from './Admin/Catalogos/Usuarios/lista-usuarios/lista-usuarios.component';
import { ListaPuestosComponent } from './Admin/Catalogos/Puestos/lista-puestos/lista-puestos.component';
import { ListaEmpleadosComponent } from './Admin/Catalogos/Empleados/lista-empleados/lista-empleados.component';
import { ListaTextosComponent } from './Admin/Catalogos/Textos/lista-textos/lista-textos.component';
import { ListaEstatusComponent } from './Admin/Catalogos/Estatus/lista-estatus/lista-estatus.component';
import { ListaTareasNComponent } from './miniApps/tareas/lista-tareas-n/lista-tareas-n.component';
import { HomeTareasComponent } from './miniApps/tareas/home-tareas/home-tareas.component';
import { ListaTablerosComponent } from './Admin/Catalogos/Tableros/lista-tableros/lista-tableros.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'tareasHome', component: ListaTareasComponent},
      {path: 'tareasHomeN', component: HomeTareasComponent},
      {path: 'adminMenu', component: AdminMenuComponent},
      {path: 'catMenu', component: CatMenuComponent},
      {path: 'listaUsuarios', component: ListaUsuariosComponent},
      {path: 'listaPuestos', component: ListaPuestosComponent},
      {path: 'listaEmpleados', component: ListaEmpleadosComponent},
      {path: 'listaTextos', component: ListaTextosComponent},
      {path: 'listaEstatus', component: ListaEstatusComponent},
      {path: 'listaTableros', component: ListaTablerosComponent},

    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
