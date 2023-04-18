import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { Calendario, Actualizacion, Itinerario, Planificacion, Data } from '../calendario';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { UltimaPlanificacion } from '../UltimaPlanificacion';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-Schedule',
    templateUrl: './Schedule.component.html',
    styleUrls: ['./Schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    dropdownPopoverShow = false;

    actualizaciones: Calendario[] = [];

    public planificacion_id!: number;
    public array_vacio: Array<Itinerario> = [];
    pruebas: any;

    horarios: Calendario;
    horariosData: Data;
    horariosPlanificacion: Planificacion[] = [];
    horariosActualizacion: Actualizacion[] = [];


    public prueba1: number;

    tiempos: any[] = [];
    public generador: any; /* ONSUBMIT */
    public global: any;

    page: number = 1;
    pageCalendario: number = 1;
    paginationCalendario = 1;
    paginationActualizaciones = 1;
    count: number = 0;
    countCalendario: number = 0;
    tableSize: number = 4;
    tableSizeCalendario: number = 7;
    tableSizes: any = [5, 10, 15, 20]
    tableSizesCalendario: any = [5, 10, 15, 20]

    CurrentDate = new Date();
    latest_date = this.datePipe.transform(this.CurrentDate, 'yyyy-MM-dd');
    today_is = this.datePipe.transform(this.CurrentDate, 'EEEE, MMMM d, y');

    today_is_chile = this.CurrentDate.toLocaleDateString('es-cl');

    public planificacion: UltimaPlanificacion;

    constructor(
        public horarioService: HorarioService,
        private datePipe: DatePipe,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.cargarData();
    }

    cargarData(): void {
        this.horarioService.getHorarios()
        .subscribe(
            response => {
                console.log(response)
                if(response.error){ 
                    console.log("hay error bro")
                }else{
                    console.log("entre=?")
                    this.planificacion = response;
                }
            },
            error => {
                console.log(error)
            }
        )
    }

    MostrarModalActualizacion():void{
        this.horarioService.modalAddActualizacion = !this.horarioService.modalAddActualizacion;
    }

    onPagination(event: any) {
        this.page = event;
        this.cargarData();
    }

    onPaginationCalendario(event: any) {
        this.pageCalendario = event;
        this.cargarData();
    }

    onDisenoTabla(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
        this.cargarData();
    }

    onDisenoTabla2(event: any): void {
        this.tableSizeCalendario = event.target.value;
        this.pageCalendario = 1;
        this.cargarData();
    }

    deleteActualizacion(actualizacion_id: Actualizacion): void {
        this.horarioService.deleteActualizacionId(actualizacion_id)
        .subscribe(response => {
            this.ngOnInit();
        },
            error => {
            console.log(error)
            });
    }

    deleteScheduleById(planificacion: Data): void{
        this.horarioService.deletePlanificacionId(planificacion)
        .subscribe(response => {
        this.ngOnInit();
        },
        error =>{
        console.log(error)
        })
    }

    alertaItinerario(itinerario: Itinerario) {
        Swal.fire({
        title: 'Alerta encuentros de aviones',
        html: 'Empleados faltantes: ' + + itinerario.falta + '<br>' + 'Turno del encuentro: ' + itinerario.turno_itinerario,
        icon: 'warning',
        })
    }

    alertaComodin(comodin: string) {
        Swal.fire({
        title: 'Comodín',
        text: 'Se necesita comodín, turno: ' + comodin,
        imageUrl: 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/49908/joker-emoji-clipart-xl.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        })
    }

}