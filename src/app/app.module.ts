import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



@Injectable({ providedIn: 'any' })
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, MatProgressSpinnerModule, IonicStorageModule.forRoot({
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
  }), HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, SQLite, Camera, Geolocation],
  bootstrap: [AppComponent],
})

export class AppModule {}
