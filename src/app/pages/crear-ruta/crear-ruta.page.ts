///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.page.html',
  styleUrls: ['./crear-ruta.page.scss'],
})
export class CrearRutaPage implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('rutaInicio') rutaInicio!: ElementRef;
  @ViewChild('rutaFin') rutaFin!: ElementRef;

  mapa!: google.maps.Map;

  distancia;


  formMapas!: FormGroup;
  
  usuario: any = {};

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

  patenteSeleccionada = '';


  constructor(private geolocation: Geolocation, private bd: BdservicioService,private storage: Storage, private router: Router) {


    this.formMapas = new FormGroup({
      vehiculos: new FormControl('', []),
      ruta1: new FormControl('', [Validators.required]),
      ruta2: new FormControl('', [Validators.required]),
      precio: new FormControl(''),
      asientos: new FormControl(''),
    })

  }

  vehiculoSeleccionado(e) {
    this.patenteSeleccionada = e.target.value
  }

  ngOnInit() {
  this.storage.get('usuario').then((val) => {
      this.usuario = val
      this.bd.dbState().subscribe(res => {
        if (res) {
          this.bd.fetchVehiculos().subscribe(item => {
            this.arregloVehiculo = item.filter(v => v.usuario_id == this.usuario.id_usuario);
          })
        }
      })
    })
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp ', resp)

      this.cargarMapa(resp)
      this.cargarAutoComplete()

    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  calcularRuta() {

      const directionService = new google.maps.DirectionsService();
      const directionRender = new google.maps.DirectionsRenderer();
      let ruta1 = (document.getElementById('rutaInicio') as HTMLInputElement).value
      let ruta2 = (document.getElementById('rutaFin') as HTMLInputElement).value

      directionRender.setMap(this.mapa);

      directionService.route({
        origin: ruta1,
        destination: ruta2,
        travelMode: google.maps.TravelMode.DRIVING
      }, resultado => {
        console.log(resultado);
        directionRender.setDirections(resultado)

        this.distancia = resultado.routes[0].legs[0].distance.text;

       (document.getElementById('distancia') as HTMLElement).innerText = 'la distancia de tu recorrido es de: ' + this.distancia
      })
    } 

    crearRuta() {
      if(this.formMapas.valid) {
        let fecha = new Date()
        let hora_actual = fecha.toLocaleTimeString()
        let fecha_viaje = fecha.toLocaleDateString()
        let asientos = (document.getElementById('asientos') as HTMLInputElement).value;
        let precio = (document.getElementById('precio') as HTMLInputElement).value;
        let ruta1 = (document.getElementById('rutaInicio') as HTMLInputElement).value
        let ruta2 = (document.getElementById('rutaFin') as HTMLInputElement).value
        let status = 1;
        this.bd.agregarRuta(fecha_viaje, hora_actual, asientos, precio, this.patenteSeleccionada, this.usuario.id_usuario, status, ruta1, ruta2 )

        console.log('HORA: ', hora_actual , ' FECHA: ', fecha_viaje)

        this.router.navigate(['/pantalla-principal'])
      }else {
        this.bd.presentToast2("Todos los campos deben ser llenados")
      }
    }
  
  private cargarAutoComplete() {
    const autocomplete = new google.maps.places.Autocomplete((this.rutaInicio.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["establishment"]
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

    const autocomplete2 = new google.maps.places.Autocomplete((this.rutaFin.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })

    google.maps.event.addListener(autocomplete2, 'place_changed', () => {
      const place2: any = autocomplete2.getPlace();
      console.log('El place completo es: ', place2)

      this.mapa.setCenter(place2.geometry.location);
      const marker = new google.maps.Marker({
        position: place2.geometry.location
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

    this.mapa = new google.maps.Map((this.divMap.nativeElement), opciones)
  }

}
