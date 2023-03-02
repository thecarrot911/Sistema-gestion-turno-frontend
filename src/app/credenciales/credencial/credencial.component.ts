import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AllempleadosService } from 'src/app/services/allempleados.service';
import { Credencial } from '../../empleados';

@Component({
  selector: 'app-credencial',
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']
})
export class CredencialComponent implements OnInit {

  // Variables recibidas por el componente [all-empleados]
  @Input() empleadoCredencial: Credencial[];
  @Input() cantidadCredenciales: number;
  
  // Variables emitidas al componente [all-empleados]
  @Output() reload  = new EventEmitter();
  @Output() renovar = new EventEmitter();

  constructor(
    public empleadoService: AllempleadosService
  ){
  }

  ngOnInit(): void {

  }
  

  agregarCredencial(){
    this.empleadoService.modalAddCredencialVisible = !this.empleadoService.modalAddCredencialVisible;
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
  }

  renovarCredencial(){
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
    this.empleadoService.modalUpdateCredencialVisible = !this.empleadoService.modalUpdateCredencialVisible;
  }

  eliminarCredencial(credencial: Credencial){
    this.empleadoService.EliminarCredencial(credencial).subscribe(
      response=>{
        this.reload.emit()
        this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
      },
      error=>{
        console.log(error)
      }
    )
  }
  
  cerrarCredencial(){
    this.empleadoService.modalCredencialVisible = !this.empleadoService.modalCredencialVisible;
  }
}