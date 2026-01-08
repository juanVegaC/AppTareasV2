import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { PuestoService } from '../../../../_services/puesto.service';
import { PuestoCreateReq } from '../../../../_models/Puesto/PuestoCreate/PuestoCreateReq';
import { appMessage } from '../../../../_models/appMessage';
import { AppMsg } from '../../../../_models/Messages/AppMsg';
import { PuestosGetAllRes } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllRes';
import { PuestosGetAllReq } from '../../../../_models/Puesto/PuestosGetAll/PuestosGetAllReq';

@Component({
  selector: 'app-puesto-add',
  templateUrl: './puesto-add.component.html',
  styleUrl: './puesto-add.component.css'
})
export class PuestoAddComponent implements OnInit {
  constructor(
    private _renderer: Renderer2,
    private puestoService: PuestoService ){
  }

  //@Input() puestos: Array<PuestosGetAllRes>;

  @Input() puesto: PuestoCreateReq;
  @Output() cerrar = new EventEmitter();

  @ViewChild('dialogTituloInput') oDialogTituloInput: ElementRef;
  @ViewChild('dialogPuestoSupIdInput') oDialogPuestoSupIdInput: ElementRef;
  @ViewChild('dialogPublicoInput') oDialogPublicoInput: ElementRef;

  catPuestos: Array<PuestosGetAllRes>;
  tituloErrMsg: string = ""

  message: appMessage = {
    type: "",
    text: "",
    number: 0,
    displayStyle: ""
  }

/*   ngOnChanges(changes: SimpleChanges) {
      if (this.puestos) {
        this.catPuestos = [...this.puestos];
        this.addPuestoVacio();
      }
    }
 */
  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var param : PuestosGetAllReq ={
      ctrl_app_action: "PUESTOS_ALL"
    }
    this.puestoService.getPuestos(param).subscribe(puestos => {
      console.log(puestos);
      this.catPuestos = puestos;
      this.addPuestoVacio();
      //console.log(this.usuarios)
    });

  }

  addPuestoVacio() {
      const puestoVacio: PuestosGetAllRes = {
        id: 0,
        titulo: '',
        puestoSupId: 0,
        puestoSupTitulo: '',
        publico: false,
        borrado: false,
      };
  
      if (this.catPuestos) {
        this.catPuestos.unshift(puestoVacio);
      }
  }




  clearDialog(){
    //console.log('clearDialog');
    this.oDialogTituloInput.nativeElement.value= "";
    this.oDialogPuestoSupIdInput.nativeElement.value= 0;
    this.oDialogPublicoInput.nativeElement.checked= false;

    this._renderer.setAttribute(this.oDialogTituloInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogPuestoSupIdInput.nativeElement, 'value-state', 'None');
  }    

  resetStatusDialog(){
    this._renderer.setAttribute(this.oDialogTituloInput.nativeElement, 'value-state', 'None');
    this._renderer.setAttribute(this.oDialogPuestoSupIdInput.nativeElement, 'value-state', 'None');    
    this.tituloErrMsg = ""
  }

  closeAppMessage(){
    this.message  = {
      type: "",
      text: "",
      number: 0,
      displayStyle: ""
    }

  }

  close(){
    var resultMessages: AppMsg[] = [];
    this.clearDialog();
    this.cerrar.emit({
      resultMsg:resultMessages,
      reloadData: 0
    });
  }

  guardar(){
    var error : boolean = false

    this.resetStatusDialog();

    this.puesto.titulo = this.oDialogTituloInput.nativeElement.value

    console.log(this.oDialogPuestoSupIdInput.nativeElement.value);
    this.puesto.puestoSupId = Number(this.oDialogPuestoSupIdInput.nativeElement.value);

/*     if (this.oDialogPuestoSupIdInput.nativeElement.value != null && this.oDialogPuestoSupIdInput.nativeElement.value != ""){
      this.puesto.puestoSupId = parseInt(this.oDialogPuestoSupIdInput.nativeElement.value, 10);
    }else{
      this.puesto.puestoSupId = 0;
    } */

    this.puesto.publico = this.oDialogPublicoInput.nativeElement.checked

    if (this.puesto.titulo == ""){
      this._renderer.setAttribute(this.oDialogTituloInput.nativeElement, 'value-state', 'Negative');
      this.tituloErrMsg = "Debe Ingresar un titulo para el puesto"
      error = true;
    }


    if(!error){
       this.puestoService.puestoCreate(this.puesto).subscribe(response =>{
        //console.log(result);
        var lvError = false

        response.messages.forEach(msg => {
          if (msg.type == "E"){
              lvError = true
              this.message  = {
                type: msg.type,
                text: msg.text,
                number: 0,
                displayStyle: "Negative"
              }        
          }
        });

        if (!lvError){
          this.closeAppMessage();
          this.clearDialog();
          this.cerrar.emit({
            resultMsg: response.messages,
            reloadData: 1
          });  
        }

      });
       
    }
  }
}
