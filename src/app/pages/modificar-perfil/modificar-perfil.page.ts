import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {validacionesCustom } from '../registro-vehiculo/registro.validator';


interface Sede {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {



  formGroup: any

  constructor( private validacionesCustom: validacionesCustom) {

    this.formGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, this.validacionesCustom.verificarTelefono()]),
      sede: new FormControl('', [Validators.required]),
    })


  }


  ngOnInit() {
  }

}
