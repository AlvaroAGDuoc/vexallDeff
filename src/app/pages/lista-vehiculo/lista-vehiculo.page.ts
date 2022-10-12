import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.page.html',
  styleUrls: ['./lista-vehiculo.page.scss'],
})
export class ListaVehiculoPage implements OnInit {

  arregloVehiculo: any = [
    {
      patente: '',
      color: '',
      modelo: '',
      annio: '',
      marca_id: '',
      usuario_id: '',
      nombre_marca: ''
    }
  ]

  usuario: any = {};


  constructor(private servicioBD: BdservicioService, private storage: Storage) {

    
  }


  eliminar(x) {
    this.servicioBD.eliminarVehiculo(x.patente);
    this.servicioBD.presentToast("Vehiculo Eliminado");

  }


   ngOnInit() {

    this.storage.get('usuario').then((val) => {
      this.usuario = val
      this.servicioBD.dbState().subscribe(res => {
        if (res) {
          this.servicioBD.fetchVehiculos().subscribe(item => {
            this.arregloVehiculo = item.filter(v => v.usuario_id == this.usuario.id_usuario);
          })
        }
      })
    })
     

  }


}
