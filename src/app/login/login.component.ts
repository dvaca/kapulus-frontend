import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro.service';
import { Usuario } from '../usuario';
import { ConfiguracionEvento } from '../configuracionEvento';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  mensajes: string[];
  errores: string[];

  constructor(private registroService: RegistroService, private config: ConfiguracionEvento) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.idevento = this.config.variables.idevento;
    this.mensajes = [];
    this.errores = [];
    document.getElementById("openModalButton").click();
  }

  ingresar(): void{
    this.usuario.contrasena = this.ocultarContraseña(this.usuario.contrasena);
    this.registroService.login(this.usuario).subscribe(
      x => {
        if(x.acceso == "aprobado"){
          this.mensajes.push("Acceso exitoso!");  
        }else{
          this.errores.push("Acceso denegado");  
        }
        
      }
    );
  }

  ocultarContraseña(claveOriginal): string{
    var claveNueva: string = "";
    var i: number;
    for(i = 0; i < claveOriginal.length; i++){
      var a = claveOriginal.charCodeAt(i).toString().padStart(3, "0");
      claveNueva += a;
    }
    return claveNueva;
  }

}
