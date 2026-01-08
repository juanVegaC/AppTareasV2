import { NgModule,CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
// UI5 Web Components used
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';


import "@ui5/webcomponents/dist/Avatar.js";
import '@ui5/webcomponents-base/dist/features/F6Navigation.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Title.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/DatePicker.js';
import '@ui5/webcomponents/dist/List.js';
import '@ui5/webcomponents/dist/ListItemCustom.js';
import '@ui5/webcomponents/dist/Panel.js';
import '@ui5/webcomponents/dist/Toast.js';
import '@ui5/webcomponents/dist/MessageStrip.js';
import '@ui5/webcomponents/dist/Menu.js';
import '@ui5/webcomponents/dist/MenuItem.js';
import '@ui5/webcomponents/dist/Dialog.js';
import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Popover.js';
import '@ui5/webcomponents/dist/TextArea.js';
import '@ui5/webcomponents/dist/ListItemStandard.js';
import '@ui5/webcomponents/dist/Tab.js';
import '@ui5/webcomponents/dist/Tag.js';
import '@ui5/webcomponents/dist/TabContainer.js';
import '@ui5/webcomponents/dist/Switch.js';
import "@ui5/webcomponents/dist/BusyIndicator.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";
import "@ui5/webcomponents/dist/ProgressIndicator.js";
import "@ui5/webcomponents/dist/Card.js";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-compat/dist/Table.js";
import "@ui5/webcomponents-compat/dist/TableColumn.js";
import "@ui5/webcomponents-compat/dist/TableRow.js";
import "@ui5/webcomponents-compat/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/CheckBox.js";
import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';
import '@ui5/webcomponents-fiori/dist/Assets.js';
import '@ui5/webcomponents-fiori/dist/Timeline.js';
import '@ui5/webcomponents-fiori/dist/TimelineItem.js';
import '@ui5/webcomponents/dist/Bar.js';
import '@ui5/webcomponents-fiori/dist/ProductSwitch.js';
import '@ui5/webcomponents-fiori/dist/ProductSwitchItem.js';
import '@ui5/webcomponents-icons/dist/activities.js';
import '@ui5/webcomponents-icons/dist/action-settings.js';
import '@ui5/webcomponents-icons/dist/add-employee.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/employee-rejections.js';
import '@ui5/webcomponents-icons/dist/palette.js';
import '@ui5/webcomponents-icons/dist/delete.js';
import '@ui5/webcomponents-icons/dist/decline.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/settings.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';
import '@ui5/webcomponents-icons/dist/log.js';
import '@ui5/webcomponents-icons/dist/account.js';
import '@ui5/webcomponents-icons/dist/private.js';
import '@ui5/webcomponents-icons/dist/loan.js';
import '@ui5/webcomponents-icons/dist/globe.js';
import '@ui5/webcomponents-icons/dist/message-warning.js';
import '@ui5/webcomponents-icons/dist/menu.js';
import '@ui5/webcomponents-icons/dist/refresh.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/nav-back.js';
import '@ui5/webcomponents-icons/dist/sap-box.js';
import '@ui5/webcomponents-icons/dist/user-settings.js';
import '@ui5/webcomponents-icons/dist/business-card.js';
import '@ui5/webcomponents-icons/dist/status-critical.js';
import '@ui5/webcomponents-icons/dist/text.js';
import '@ui5/webcomponents-icons/dist/detail-more.js';
import '@ui5/webcomponents-icons/dist/validate.js';
import '@ui5/webcomponents-icons/dist/workflow-tasks.js';
import '@ui5/webcomponents-icons/dist/task.js';
import '@ui5/webcomponents-icons/dist/detail-view.js';
import '@ui5/webcomponents-icons-business-suite/operator.js';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ActividadRegComponent } from './tarea/actividad-reg/actividad-reg.component';
import { TareaRegComponent } from './tarea/tarea-reg/tarea-reg.component';
import { TareaEditComponent } from './tarea/tarea-edit/tarea-edit.component';
import { TareaSfuncComponent } from './tarea/tarea-sfunc/tarea-sfunc.component';
import { TareaAsignaComponent } from './tarea/tarea-asigna/tarea-asigna.component';
import { TareaMenuComponent } from './tarea/tarea-menu/tarea-menu.component';
import { TareaAsignacionesComponent } from './tarea/tarea-asignaciones/tarea-asignaciones.component';
import { CambiaPasswComponent } from './utils_comps/cambia-passw/cambia-passw.component';
import { AdminMenuComponent } from './Admin/Menu/admin-menu/admin-menu.component';
import { CatMenuComponent } from './Admin/Catalogos/Menu/cat-menu/cat-menu.component';
import { ListaUsuariosComponent } from './Admin/Catalogos/Usuarios/lista-usuarios/lista-usuarios.component';
import { UsuarioAddComponent } from './Admin/Catalogos/Usuarios/usuario-add/usuario-add.component';
import { UsuarioEditComponent } from './Admin/Catalogos/Usuarios/usuario-edit/usuario-edit.component';
import { ListaPuestosComponent } from './Admin/Catalogos/Puestos/lista-puestos/lista-puestos.component';
import { PuestoAddComponent } from './Admin/Catalogos/Puestos/puesto-add/puesto-add.component';
import { PuestoEditComponent } from './Admin/Catalogos/Puestos/puesto-edit/puesto-edit.component';
import { ListaEmpleadosComponent } from './Admin/Catalogos/Empleados/lista-empleados/lista-empleados.component';
import { EmpleadoAddComponent } from './Admin/Catalogos/Empleados/empleado-add/empleado-add.component';
import { EmpleadoEditComponent } from './Admin/Catalogos/Empleados/empleado-edit/empleado-edit.component';
import { ListaTextosComponent } from './Admin/Catalogos/Textos/lista-textos/lista-textos.component';
import { TextoAddComponent } from './Admin/Catalogos/Textos/texto-add/texto-add.component';
import { TextoEditComponent } from './Admin/Catalogos/Textos/texto-edit/texto-edit.component';
import { ListaEstatusComponent } from './Admin/Catalogos/Estatus/lista-estatus/lista-estatus.component';
import { EstatusAddComponent } from './Admin/Catalogos/Estatus/estatus-add/estatus-add.component';
import { EstatusEditComponent } from './Admin/Catalogos/Estatus/estatus-edit/estatus-edit.component';
import { ListaTareasNComponent } from './miniApps/tareas/lista-tareas-n/lista-tareas-n.component';
import { TareaConfActComponent } from './tarea/tarea-conf-act/tarea-conf-act.component';
import { TareaAsignacionesNComponent } from './tarea/tarea-asignaciones-n/tarea-asignaciones-n.component';
import { ListaActividadesComponent } from './miniApps/actividades/lista-actividades/lista-actividades.component';
import { ListaPrioridadComponent } from './miniApps/tareas/lista-prioridad/lista-prioridad.component';
import { HomeTareasComponent } from './miniApps/tareas/home-tareas/home-tareas.component';
import { ListaMisPuestosComponent } from './miniApps/tareas/lista-mis-puestos/lista-mis-puestos.component';
import { TareaDetailsComponent } from './tarea/tarea-details/tarea-details.component';
import { TableroKanbanComponent } from './miniApps/tareas/tablero-kanban/tablero-kanban.component';
import { TableroAddComponent } from './Admin/Catalogos/Tableros/tablero-add/tablero-add.component';
import { ListaTablerosComponent } from './Admin/Catalogos/Tableros/lista-tableros/lista-tableros.component';
import { EstadoAddComponent } from './Admin/Catalogos/Tableros/estado-add/estado-add.component';
import { EstadoCreateComponent } from './Admin/Catalogos/Tableros/estado-create/estado-create.component';
import { ListaTabestadosComponent } from './Admin/Catalogos/Tableros/lista-tabestados/lista-tabestados.component';
import { TableroEditComponent } from './Admin/Catalogos/Tableros/tablero-edit/tablero-edit.component';
import { TabestadoEditComponent } from './Admin/Catalogos/Tableros/tabestado-edit/tabestado-edit.component';
import { ListaPuestotabComponent } from './Admin/Catalogos/PuestoTab/lista-puestotab/lista-puestotab.component';
import { PuestotabAddComponent } from './Admin/Catalogos/PuestoTab/puestotab-add/puestotab-add.component';
import { PuestotabEditComponent } from './Admin/Catalogos/PuestoTab/puestotab-edit/puestotab-edit.component';
import { ActividadRegNComponent } from './tarea/actividad-reg-n/actividad-reg-n.component';
import { TareaDetalleHomeComponent } from './miniApps/tareas/tarea-detalle/tarea-detalle-home/tarea-detalle-home.component';
import { TareaDetGeneralComponent } from './miniApps/tareas/tarea-detalle/tarea-det-general/tarea-det-general.component';
import { TareaDetActvComponent } from './miniApps/tareas/tarea-detalle/tarea-det-actv/tarea-det-actv.component';

registerLocaleData(localeEs, 'es');
@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        StatusBarComponent,
        ListaTareasComponent,
        ActividadRegComponent,
        TareaRegComponent,
        TareaEditComponent,
        TareaSfuncComponent,
        TareaAsignaComponent,
        TareaMenuComponent,
        TareaAsignacionesComponent,
        CambiaPasswComponent,
        AdminMenuComponent,
        CatMenuComponent,
        ListaUsuariosComponent,
        UsuarioAddComponent,
        UsuarioEditComponent,
        ListaPuestosComponent,
        PuestoAddComponent,
        PuestoEditComponent,
        ListaEmpleadosComponent,
        EmpleadoAddComponent,
        EmpleadoEditComponent,
        ListaTextosComponent,
        TextoAddComponent,
        TextoEditComponent,
        ListaEstatusComponent,
        EstatusAddComponent,
        EstatusEditComponent,
        ListaTareasNComponent,
        TareaConfActComponent,
        TareaAsignacionesNComponent,
        ListaActividadesComponent,
        ListaPrioridadComponent,
        HomeTareasComponent,
        ListaMisPuestosComponent,
        TareaDetailsComponent,
        TableroKanbanComponent,
        TableroAddComponent,
        ListaTablerosComponent,
        EstadoAddComponent,
        EstadoCreateComponent,
        ListaTabestadosComponent,
        TableroEditComponent,
        TabestadoEditComponent,
        ListaPuestotabComponent,
        PuestotabAddComponent,
        PuestotabEditComponent,
        ActividadRegNComponent,
        TareaDetalleHomeComponent,
        TareaDetGeneralComponent,
        TareaDetActvComponent
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule], providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'es' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { 
  constructor() {
    setTheme('sap_horizon');
  }
}
