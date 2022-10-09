import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantallaPrincipalPage } from './pantalla-principal.page';

const routes: Routes = [
  {
    path: '',
    component: PantallaPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantallaPrincipalPageRoutingModule {}
