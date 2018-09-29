import { PosibleValor } from "./posibleValor";
import { TipoCampo } from "./enums";

export class CampoEvento {
  id: number;
  idevento: number;
  nombre: string;
  tipodato: number;
  //tipocampo: number;
  tipocampo: TipoCampo;
  obligatorio: boolean;
  longitud: number;
  filtrar: boolean;
  estadisticas: boolean;
  ordenimpresion: number;
  ordenregistro: number;
  ordenregistroweb: number;
  ordencargue: number;
  yescarapela: number;
  xescarapela: number;
  tamanoescarapela: number;
  negritaescarapela: boolean;
  ycertificado: number;
  xcertificado: number;
  tamanocertificado: number;
  negritacertificado: boolean;
  posiblesvalores: PosibleValor[];
}
