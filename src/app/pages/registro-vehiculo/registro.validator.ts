import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';



export const validarClaves: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const clave = control.get('clave');
  const confirmarClave = control.get('confirmarClave');
  return clave.value === confirmarClave.value ? null : { 'noSonIguales': true };
};


@Injectable({
  providedIn: 'root'
})

export class validacionesCustom {
  validarMayuscula(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('([A-Z])');
      const valid = regex.test(control.value);
      return valid ? null : { mayus: true };
    };
  }

  validarNumero(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('([0-9])');
      const valid = regex.test(control.value);
      return valid ? null : { numero: true };
    };
  }

  validarMinuscula(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('([a-z])');
      const valid = regex.test(control.value);
      return valid ? null : { minus: true };
    };
  }

  primeraMayuscula(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      if (control.value.charAt(0) === control.value.charAt(0).toUpperCase()) {
        return null;
      } else {
        return { prim: true }
      }
    };
  }

  verificarTelefono(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const control2 = control.value.toString()
      if (control2.length == 9) {
        return null;
      } else {
        return { num: true }
      }
    };
  }


}
