import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  
  locations = []

  constructor(private geolocation: Geolocation) {  }


  getGeolocation(){


    this.geolocation.getCurrentPosition().then((resp) => {

      console.log('resp ', resp)
      this.locations[0].geometry.coordinates = [
        resp.coords.latitude,
        resp.coords.longitude
      ]

      return resp;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }
}


