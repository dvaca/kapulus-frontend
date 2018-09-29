import { RestriccionZona } from "./restriccionZona";

export class Zona {
  id: number;
  idevento: number;
  nombre: string;
  entregaregalo: boolean;
  validaentrada: boolean;
  validasalida: boolean;
  cantidadmaxima: string;
  restriccioneszona : RestriccionZona[];
}
