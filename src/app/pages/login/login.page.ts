import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { ApiService } from 'src/app/services/api.service';
import { LoadingPage } from '../loading/loading.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuarios : any;

  locations = [];

  constructor(private router: Router, private servicioBD: BdservicioService, private storage: Storage,  private api: ApiService, private loading: LoadingPage) {

  }

  pagina = 'pantalla-principal'

  validarUsuario(nombre: string, clave: string) {
    this.servicioBD.validarUsuario(nombre, clave).then((res) => {
      if (res) {
        this.servicioBD.presentToast('NO')
        console.log('BUSCADO', nombre, clave)
      } else {
        this.servicioBD.mandarDatosUsuario(nombre).then((usuario) => {      
          this.storage.set('usuario', usuario)
          console.log("DATOS USUARIOS", usuario.id_usuario, usuario.nombre_usuario)
          this.loading.loadContent(this.pagina);
        })
      }
    }
    )


  }

  async ngOnInit() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    
    this.api.getUsers().subscribe((res) => {
      this.usuarios = res;
      for(var i = 0; i < this.usuarios.length; i++){
        this.servicioBD.agregarUsuario(this.usuarios[i].id, this.usuarios[i].nombre, this.usuarios[i].clave, this.usuarios[i].id_rol)
      }
    }, (error) => {
      console.log('ERROR USERS', error);
    });
  }

}
