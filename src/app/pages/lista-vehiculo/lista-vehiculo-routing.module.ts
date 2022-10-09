import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVehiculoPage } from './lista-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaVehiculoPageRoutingModule {}
