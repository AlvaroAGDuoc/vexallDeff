import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiCamaraService } from 'src/app/services/api-camara.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  usuario: any = {}
  foto: string;

  constructor(private storage: Storage, private camera: ApiCamaraService) {
    this.storage.get('usuario').then((val) => {
      this.usuario = val
    })
  }

  ngOnInit() {
    this.camera.foto.subscribe((res) => {
      this.foto = res;
    });
  }

  tomarFoto(){
    this.camera.tomameFoto()
  }


}
