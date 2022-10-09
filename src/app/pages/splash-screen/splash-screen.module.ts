import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashScreenPageRoutingModule } from './splash-screen-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SplashScreenPage } from './splash-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashScreenPageRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [SplashScreenPage]
})
export class SplashScreenPageModule {}
