import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TareaService } from '../../_services/tarea.service';
import { DatePipe } from '@angular/common';
import { PuestoService } from '../../_services/puesto.service';
import { TareaData } from '../../_models/TareaData';
import { SPuestoPorUsuarioDto } from '../../_models/Puesto/SPuestoPorUsuarioDto';
import { PuestosGetParams } from '../../_models/Puesto/PuestosGetParams';
import { AppMsg } from '../../_models/Messages/AppMsg';
import { TareaEditReqDat } from '../../_models/Tarea/TareaEdit/TareaEditReqDat';

@Component({
    selector: 'app-tarea-edit',
    templateUrl: './tarea-edit.component.html',
    styleUrl: './tarea-edit.component.css',
    standalone: false
})
export class TareaEditComponent implements OnInit, OnChanges {

  constructor(
    private tareaService: TareaService,
    private datePipe: DatePipe,
    private puestoService: PuestoService,
    private _renderer: Renderer2){}

  @Input() tarea: TareaEditReqDat;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogTareaNumeroInput') oDialogTareaNumeroInput: ElementRef;
  @ViewChild('dialogTareaDocuUrlInput') oDialogTareaDocuUrlInput: ElementRef;
  @ViewChild('dialogTareaTextInput') oDialogTareaTextInput: ElementRef;



  ngOnChanges(changes: SimpleChanges) {
    if ( this.tarea) {
      this.ngOnInit(); // Llama a ngOnInit manualmente
    }
  }

  ngOnInit(){
    if(this.tarea.ctrl_app_active){
      console.log(this.tarea);
      this.clearDialogTareaEdit();
      this.setDialogTarea();  
    }
  }
  


  AsignarAChanged(event){
    console.log(event.detail.selectedOption._state.value);
  }

  setDialogTarea(){
    this.oDialogTareaNumeroInput.nativeElement.value= this.tarea.numero;
    this.oDialogTareaTextInput.nativeElement.value= this.tarea.texto;
    this.oDialogTareaDocuUrlInput.nativeElement.value = this.tarea.docuUrl;
    
    this._renderer.setAttribute(this.oDialogTareaNumeroInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogTareaTextInput.nativeElement, 'value-state', '');
  }


  clearDialogTareaEdit(){
    this.oDialogTareaNumeroInput.nativeElement.value= "";
    this.oDialogTareaTextInput.nativeElement.value= "";
    this.oDialogTareaDocuUrlInput.nativeElement.value = "";

    this._renderer.setAttribute(this.oDialogTareaNumeroInput.nativeElement, 'value-state', '');
    this._renderer.setAttribute(this.oDialogTareaTextInput.nativeElement, 'value-state', '');

  }


  cancelar(){
    var resultMessages: AppMsg[] = [];
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadTareas: 0
    });
  }

  guardar(){
    this.saveTarea();
  }

  saveTarea(){
    
    var error = false;

    this.tarea.numero = this.oDialogTareaNumeroInput.nativeElement.value;
    this.tarea.texto = this.oDialogTareaTextInput.nativeElement.value;
    this.tarea.docuUrl = this.oDialogTareaDocuUrlInput.nativeElement.value;
    
    console.log(this.tarea);


    if (this.tarea.numero == ""){
      this._renderer.setAttribute(this.oDialogTareaNumeroInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if (this.tarea.texto == ""){
      this._renderer.setAttribute(this.oDialogTareaTextInput.nativeElement, 'value-state', 'Negative');
      error = true;
    }

    if (!error){
      this.tareaService.updateTarea(this.tarea).subscribe(response =>{
        console.log(response);
        this.cerrar.emit({
          resultMsg: response.messages,
          reloadTareas: 1
        });
        
      });     
    }
    
  }

  dateSTRtoDATE(pDate: string): Date{
    var dateSTRaux = pDate.substring(6,10) + "-" + pDate.substring(3,5) + "-" + pDate.substring(0,2);
    return new Date(dateSTRaux);
  }

}
