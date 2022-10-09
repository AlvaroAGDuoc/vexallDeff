import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BdservicioService } from 'src/app/services/bdservicio.service';
import { Storage } from '@ionic/storage-angular';
import { validacionesCustom } from './reg.validator';



@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
})
export class RegistroVehiculoPage implements OnInit {


  patente = '';
  color = '';
  modelo = '';
  annio = '';
  marca_id = '';

  formGroup: any;

  arregloMarcas : any = [
    {
      id_marca: '',
      nombre_marca: ''
    }
  ]

  usuario: any = {};
  

  constructor(private validacionesCustom: validacionesCustom, private servicioBD: BdservicioService, public router: Router, private storage: Storage) {

    this.servicioBD.buscarMarcas()

    this.storage.set('marcas', this.arregloMarcas)
    this.storage.get('usuario').then((val) => {
      this.usuario = val
    })

    this.formGroup = new FormGroup({
      patente: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      modelo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      marca: new FormControl('', [Validators.required]),
      anio: new FormControl('', [Validators.required, this.validacionesCustom.verificarAnio()]),
      color: new FormControl('', [Validators.required]),
      numAsientos: new FormControl('', [Validators.required, this.validacionesCustom.verificarAsientos()]),
    })
  }


  marcaSeleccionada(e) {
    this.marca_id = e.target.value
  }

  async ngOnInit() {
    
    await this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchMarcas().subscribe(item=>{
          this.arregloMarcas = item;
        })
      }
    })

  }

  insertar() {
    this.servicioBD.agregarVehiculo(this.patente, this.color, this.modelo, this.annio, this.marca_id, this.usuario.id_usuario);
    this.servicioBD.presentToast("Vehiculo Agregado");
    this.router.navigate(['/lista-vehiculo']);
  }

}
