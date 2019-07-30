import { AtributoAsistente } from "./atributosasistente";

export class Asistente {
  id: number;
  tipoid: number;
  identificacion: number;
  idevento: number;
  registrado: boolean;
  preinscrito: boolean;
  actualizado: boolean;
  online: boolean;
  atributos: AtributoAsistente[];
  nuevo: boolean;
  fechacreacion: string;
  fechainvitacion: string;
  fechaingresoonline: string;
}
