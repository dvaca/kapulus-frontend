import { AtributoAsistente } from "./atributosasistente";
import { Operacion } from "./enums";

export class AsistenciaZona {
  idzona : number; 
  idasistente: number;
  idoperacion: Operacion;
  fecha: Date;
}
