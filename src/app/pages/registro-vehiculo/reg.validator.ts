import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class validacionesCustom {

    verificarAnio(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          }
        
          const numero = control.value
          if (numero >= 2000 && numero <= 2022) {
            return null;
          } else {
            return { num: true }
          }
        };
      }

      verificarAsientos(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          } 

          const numero = control.value
        
          if (numero >= 2) {
            return null;
          } else {
            return { nume: true }
          }
        };
      }
}
