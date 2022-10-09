import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVehiculoPageRoutingModule } from './lista-vehiculo-routing.module';

import { ListaVehiculoPage } from './lista-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVehiculoPageRoutingModule
  ],
  declarations: [ListaVehiculoPage]
})
export class ListaVehiculoPageModule {}
