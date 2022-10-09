import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerRecorridoPage } from './ver-recorrido.page';

const routes: Routes = [
  {
    path: '',
    component: VerRecorridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRecorridoPageRoutingModule {}
