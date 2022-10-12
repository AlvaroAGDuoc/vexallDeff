import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.page.html',
  styleUrls: ['./pantalla-principal.page.scss'],
})
export class PantallaPrincipalPage implements OnInit {



  usuario: any = {}

  constructor(private storage: Storage) {
    this.storage.get('usuario').then((val) => {
      this.usuario = val
      console.log('USUARIO PANTALLA', JSON.stringify(this.usuario))
    })
  }


 ngOnInit() {}


}
