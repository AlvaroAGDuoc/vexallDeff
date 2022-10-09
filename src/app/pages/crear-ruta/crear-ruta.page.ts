import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})
export class CrearRutaPage implements OnInit {




  constructor(private geolocation: GeolocationService) {

  }



  ngOnInit() {
  }

}
