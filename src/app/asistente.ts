import { AtributoAsistente } from "./atributosasistente";

export class Asistente {
  id: number;
  tipoid: number;
  identificacion: number;
  idevento: number;
  registrado: boolean;
  preinscrito: boolean;
  actualizado: boolean;
  atributos: AtributoAsistente[];
}
