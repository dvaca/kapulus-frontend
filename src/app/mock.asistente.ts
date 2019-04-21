import { Asistente } from './asistente';

export const ASISTENTES: Asistente[] = [
  { id:1, tipoid: 1, identificacion: 1100100, registrado: true, idevento: 1, preinscrito:true, actualizado:true, nuevo:true,
    atributos:[{idasistente: 1, idcampo:1, idvalorseleccionado:null, valor:"51", nombre:"Edad", campo:null},
               {idasistente: 1, idcampo:2, idvalorseleccionado:null, valor:"Bogotá", nombre:"Ciudad", campo:null},
               {idasistente: 1, idcampo:3, idvalorseleccionado:null, valor:"Pepito Perez", nombre:"Nombre", campo:null}]},
  { id:2, tipoid: 1, identificacion: 1200200, registrado: false, idevento: 1, preinscrito:true, actualizado:true, nuevo:true,
    atributos:[{idasistente: 1, idcampo:1, idvalorseleccionado:null, valor:"33", nombre:"Edad", campo:null},
               {idasistente: 1, idcampo:2, idvalorseleccionado:null, valor:"Cali", nombre:"Ciudad", campo:null},
               {idasistente: 1, idcampo:3, idvalorseleccionado:null, valor:"Juan Perez", nombre:"Nombre", campo:null}]},
  { id:3, tipoid: 1, identificacion: 1300333, registrado: false, idevento: 1, preinscrito:true, actualizado:false, nuevo:true,
    atributos:[{idasistente: 1, idcampo:1, idvalorseleccionado:null, valor:"40", nombre:"Edad", campo:null},
              {idasistente: 1, idcampo:2, idvalorseleccionado:null, valor:"Cali", nombre:"Ciudad", campo:null},
              {idasistente: 1, idcampo:3, idvalorseleccionado:null, valor:"Fulano de Tal", nombre:"Nombre", campo:null}]},
  { id:4, tipoid: 1, identificacion: 211000, registrado: false, idevento: 1, preinscrito:true, actualizado:false, nuevo:true,
    atributos:[{idasistente: 1, idcampo:1, idvalorseleccionado:null, valor:"22", nombre:"Edad", campo:null},
              {idasistente: 1, idcampo:2, idvalorseleccionado:null, valor:"Bogotá", nombre:"Ciudad", campo:null},
              {idasistente: 1, idcampo:3, idvalorseleccionado:null, valor:"Brayan Perez", nombre:"Nombre", campo:null}]},
  { id:5, tipoid: 1, identificacion: 212000, registrado: false, idevento: 1, preinscrito:false, actualizado:true, nuevo:true,
    atributos:[{idasistente: 1, idcampo:1, idvalorseleccionado:null, valor:"50", nombre:"Edad", campo:null},
              {idasistente: 1, idcampo:2, idvalorseleccionado:null, valor:"Medellín", nombre:"Ciudad", campo:null},
              {idasistente: 1, idcampo:3, idvalorseleccionado:null, valor:"David Perez", nombre:"Nombre", campo:null}]}
];