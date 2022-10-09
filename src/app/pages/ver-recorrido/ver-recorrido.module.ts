import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRecorridoPageRoutingModule } from './ver-recorrido-routing.module';
import { VerRecorridoPage } from './ver-recorrido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRecorridoPageRoutingModule
  ],
  declarations: [VerRecorridoPage]
})
export class VerRecorridoPageModule {}
