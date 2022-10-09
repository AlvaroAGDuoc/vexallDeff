import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.page.html',
  styleUrls: ['./contrasena-olvidada.page.scss'],
})
export class ContrasenaOlvidadaPage implements OnInit {

  value = 0;
  loading = false;

  formGroup: any;

  constructor( public toastController: ToastController) {

    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
    
  }

  cargando() {
    
    
    if(this.formGroup.valid) {
      this.loading = true;
      const subs$: Subscription = interval(200).subscribe(res => {
        this.value = this.value + 20;
        if (this.value === 120) {
          subs$.unsubscribe();
          this.loading = false;
          this.value = 0;
          this.presentToast()
          
        }
      });
    }
    
  }
  

  

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Codigo enviado correctamente',
      duration: 1000,
      icon: 'checkmark-done-outline',
      color: 'success',
    });
    toast.present();
  }

  ngOnInit() {
  }

}
