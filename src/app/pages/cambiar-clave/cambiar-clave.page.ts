import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validarClaves, validacionesCustom } from '../registro-vehiculo/registro.validator';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage implements OnInit {



  formGroup: any
  
  constructor( private validacionesCustom: validacionesCustom) {

    this.formGroup = new FormGroup({
      clave: new FormControl('', [Validators.required, Validators.minLength(6), this.validacionesCustom.validarMayuscula(), this.validacionesCustom.validarMinuscula(), this.validacionesCustom.validarNumero()]),
      confirmarClave: new FormControl('', [Validators.required]),
      claveActual: new FormControl('', [Validators.required]),
    }, {
      validators: [validarClaves]
    })

   }
   revisarSiSonIguales(): boolean {
    return this.formGroup.hasError('noSonIguales') &&
      this.formGroup.get('clave').dirty &&
      this.formGroup.get('confirmarClave').dirty;
  }






  ngOnInit() {
  }

}
