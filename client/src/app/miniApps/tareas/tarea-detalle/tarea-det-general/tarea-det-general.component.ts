import { Component, Input } from '@angular/core';
import { TareasPuestoTabDet } from '../../../../_models/TareasPuestoTab/TareasPuestoTabData/TareasPuestoTabDet';

@Component({
    selector: 'app-tarea-det-general',
    templateUrl: './tarea-det-general.component.html',
    styleUrl: './tarea-det-general.component.css',
    standalone: false
})
export class TareaDetGeneralComponent {

  @Input() tarea: TareasPuestoTabDet;

}
