export enum TipoDato {
  Texto = 1,
  Numerico = 2,
  Fecha = 3,
  Correo = 4,
  Celular = 5
}

export enum TipoCampo {
  CajaDeTexto = 1,
  SeleccionUnica = 2,
  SeleccionMultiple = 3,
  Fecha = 4
}

export enum TipoInscripcion {
  Preinscrito,
  EnSitio
}

export enum Operacion {
  Creacion = 1,
  Actualizacion = 2,
  Registro = 3,
  Impresion = 4,
  ImpresionEscarapela = 5,
  ImpresionCertificado = 6,
  Busqueda = 7,
  Entrada = 8,
  Salida = 9,
  Entrega = 10,
  Correo = 11
}