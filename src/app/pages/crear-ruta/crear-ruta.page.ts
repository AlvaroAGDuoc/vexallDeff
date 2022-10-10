///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      rutaInicio: new FormControl(''),
      rutaFin: new FormControl('')
    })
  }

  // getPlaceAutocomplete() {
	// 	const  autocomplete  =  new google.maps.places.Autocomplete(this.rutaInicio.nativeElement,
	// 	{
	// 		componentRestrictions: { country:  'CL' },
	// 		types: ['establishment', 'geocode'] 
	// 	});

	// 	google.maps.event.addListener(autocomplete, 'place_changed', () => {
	// 		const  place  =  autocomplete.getPlace();
	// 		const  myLatlng  =  place.geometry.location;
	// 		const  mapOptions  = {
	// 			zoom:  15,
	// 			center:  myLatlng
	// 		};
	// 		const  map  =  new  google.maps.Map(this.divMap.nativeElement, mapOptions);
	// 		const  marker  =  new  google.maps.Marker({
	// 			position:  myLatlng,
	// 			title:  place.name
	// 		});
	// 		marker.setMap(map);
	// 	});
	// }
 



  ngOnInit() {}

  ngAfterViewInit(): void {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position) => {
        await this.cargarMapa(position);   

      })
    } else {
      console.log('error')
    }
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
    console.log('mapa cargado')
    
  }

}


