///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})
export class CrearRutaPage implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('rutaInicio') rutaInicio!: ElementRef;

  mapa!: google.maps.Map;
  marcadores: google.maps.Marker[];
  
  formMapas!: FormGroup;

  constructor(private renderer: Renderer2) {
    this.marcadores = [];

    this.formMapas = new FormGroup({
      rutaInicio: new FormControl('')
    })
    

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position) => {
        await this.cargarMapa(position);
        this.cargarAutoComplete();
      })
    } else {
      console.log('error')
    }
  }

  buscarRuta() {
    console.log('Datos del formulario: ', this.formMapas.value)
  }

  private cargarAutoComplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.rutaInicio.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log('El place completo es: ', place)

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });
      marker.setMap(this.mapa);
    })

  }



  cargarMapa(position: any): any {
    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)
    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: "vexall"
    })
    markerPosition.setMap(this.mapa);
    this.marcadores.push(markerPosition);
  }

}
