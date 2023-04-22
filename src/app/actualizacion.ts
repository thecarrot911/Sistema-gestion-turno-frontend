import { Empleado } from './empleados';

export interface RespuestaTipo{
    error: boolean,
    message: string,
    data?: Formulario
}

interface Formulario{
    actualizacion: Tipo[],
    empleados: Empleado[],
    solicitante: Empleado[]
}


export interface RespuestaActualizacion{
    error: boolean,
    message: string,
    data: Actualizacion[]
}

export interface Actualizacion{
    id?: number,
    rut: string,
    planificacion_id: number,
    descripcion: string,
    fecha_inicio: Date,
    fecha_termino: Date,
    tipo_id: number,
    reemplazo: string
}

export interface Tipo{
    id: number,
    nombre: string
}