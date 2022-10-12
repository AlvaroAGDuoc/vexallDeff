import { Component, OnInit } from '@angular/core';
import { BdservicioService } from 'src/app/services/bdservicio.service';



@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})

export class ViajePage implements OnInit {

  arregloRutas: any = [{
    usuario_id: '',
    viaje_id: '',
    nombre_usuario: '',

    color: '',
    modelo: '',
    patente: '',

    fecha_viaje: '',
    hora_salida: '',
    asientos_dispo: '',
    monto: '',
    origen: '',
    destino: '',

    status: ''
  }]

  constructor(private servicioBD: BdservicioService) {
  }


  ngOnInit() {
    this.servicioBD.dbState().subscribe(res => {
      if (res) {
        this.servicioBD.fetchRutas().subscribe(item => {
          this.arregloRutas = item;
        })
      }
    })
  }

}
