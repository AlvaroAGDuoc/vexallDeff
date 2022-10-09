import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marcas } from './marcas.service';
import { Reportes } from './reportes.service';
import { Rutas } from './rutas.service';
import { UsuariosService } from './usuarios.service';
import { Vehiculos } from './vehiculos.service';

@Injectable({
  providedIn: 'root'
})
export class BdservicioService {

  public database: SQLiteObject;
  //variable para la sentencia de creación de las tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL(id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(10));";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS USUARIO(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usuario VARCHAR(30), clave VARCHAR(30), rol_id INTEGER,  foreign key(rol_id) references ROL(id_rol));";
  tablaMarca: string = "CREATE TABLE IF NOT EXISTS MARCA(id_marca INTEGER PRIMARY KEY AUTOINCREMENT, nombre_marca VARCHAR(20));";
  tablaAuto: string = "CREATE TABLE IF NOT EXISTS AUTO(patente VARCHAR(6) PRIMARY KEY, color VARCHAR(20), modelo VARCHAR(30), annio INTEGER, usuario_id INTEGER, marca_id INTEGER, foreign key(usuario_id) references USUARIO(id_usuario), foreign key(marca_id) references MARCA(id_marca));";
  tablaViaje: string = "CREATE TABLE IF NOT EXISTS VIAJE(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, fecha_viaje VARCHAR(30), hora_salida VARCHAR(30), asientos_dispo INTEGER, monto INTEGER, patente_auto VARCHAR(6), foreign key(patente_auto) references AUTO(patente));";
  tablaDetalleViaje: string = "CREATE TABLE IF NOT EXISTS DETALLE_VIAJE(id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, status BOOLEAN, usuario_id_usuario INTEGER, viaje_id INTEGER, foreign key(usuario_id_usuario) references USUARIO(id_usuario), foreign key(viaje_id) references VIAJE(id_viaje));";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS COMUNA(id_comuna INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comuna VARCHAR(25));";
  tablaViajeComuna: string = "CREATE TABLE IF NOT EXISTS VIAJE_COMUNA(id INTEGER PRIMARY KEY AUTOINCREMENT, comuna_id INTEGER, viaje_id_viaje INTEGER, foreign key(viaje_id_viaje) references VIAJE(id_viaje), foreign key(comuna_id) references COMUNA(id_comuna));";

  //variable para la sentencia de registros por defecto en la tabla
  registroRol: string = "INSERT or IGNORE INTO ROL(id_rol,nombre_rol) VALUES (1,'Conductor');";
  registroRol2: string = "INSERT or IGNORE INTO ROL(id_rol,nombre_rol) VALUES (2,'Pasajero');";

  //Registros de marcas
  registroMarca: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (1,'AUDI');";
  registroMarca2: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (2,'MAZDA');";
  registroMarca3: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (3,'NISSAN');";
  registroMarca4: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (4,'CHEVROLET');";
  registroMarca5: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (5,'HYUNDAI');";
  registroMarca6: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (6,'TOYOTA');";
  registroMarca7: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (7,'SUZUKI');";
  registroMarca8: string = "INSERT or IGNORE INTO MARCA(id_marca,nombre_marca) VALUES (8,'HONDA');";

  registroComuna: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (1,'RECOLETA');";
  registroComuna1: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (2,'HUECHURABA');";
  registroComuna2: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (3,'CONCHALI');";
  registroComuna3: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (4,'SANTIAGO');";
  registroComuna4: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (5,'LA CISTERNA');";
  registroComuna5: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (6,'PUDAHUEL');";
  registroComuna6: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (7,'LAS CONDES');";
  registroComuna7: string = "INSERT or IGNORE INTO COMUNA(id_comuna,nombre_comuna) VALUES (8,'QUILICURA');";


  listaVehiculos = new BehaviorSubject([]);
  listaMarcas = new BehaviorSubject([]);
  listaReportes = new BehaviorSubject([]);
  listaRutas = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);


  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController) {

    this.crearBD()

  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });
    await toast.present();

  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchVehiculos(): Observable<Vehiculos[]> {
    return this.listaVehiculos.asObservable();
  }

  fetchMarcas(): Observable<Marcas[]> {
    return this.listaMarcas.asObservable();
  }

  fetchReportes(): Observable<Reportes[]> {
    return this.listaReportes.asObservable();
  }

  fetchRutas(): Observable<Rutas[]> {
    return this.listaRutas.asObservable();
  }
  fetchUsuarios(): Observable<UsuariosService[]> {
    return this.listaUsuarios.asObservable();
  }




  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'basededato4.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();

      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {

      //ejecuto mis tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaMarca, []);
      await this.database.executeSql(this.tablaAuto, []);
      await this.database.executeSql(this.tablaViaje, []);
      await this.database.executeSql(this.tablaDetalleViaje, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaViajeComuna, []);
      //ejecuto mis registros
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroMarca, []);
      await this.database.executeSql(this.registroMarca2, []);
      await this.database.executeSql(this.registroMarca3, []);
      await this.database.executeSql(this.registroMarca4, []);
      await this.database.executeSql(this.registroMarca5, []);
      await this.database.executeSql(this.registroMarca6, []);
      await this.database.executeSql(this.registroMarca7, []);
      await this.database.executeSql(this.registroMarca8, []);
      await this.database.executeSql(this.registroComuna, []);
      await this.database.executeSql(this.registroComuna1, []);
      await this.database.executeSql(this.registroComuna2, []);
      await this.database.executeSql(this.registroComuna3, []);
      await this.database.executeSql(this.registroComuna4, []);
      await this.database.executeSql(this.registroComuna5, []);
      await this.database.executeSql(this.registroComuna6, []);
      await this.database.executeSql(this.registroComuna7, []);

      //cargar registros en observable
      this.buscarVehiculos();
      this.buscarMarcas();
      this.buscarUsuarios();

      //actualizar el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }

  }

  buscarVehiculos() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM AUTO A INNER JOIN MARCA M ON (A.MARCA_ID = M.ID_MARCA)', []).then(res => {
      //creo mi lista de objetos vacio
      let items: Vehiculos[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            annio: res.rows.item(i).annio,
            marca_id: res.rows.item(i).marca_id,
            usuario_id: res.rows.item(i).usuario_id,
            nombre_marca: res.rows.item(i).nombre_marca
          })
        }
      }
      //actualizamos el observable 
      this.listaVehiculos.next(items);
    })
  }

  buscarMarcas() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM MARCA', []).then(res => {
      //creo mi lista de objetos de marcas vacio
      let items: Marcas[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_marca: res.rows.item(i).id_marca,
            nombre_marca: res.rows.item(i).nombre_marca,
          })
        }

      }
      //actualizamos el observable de las marcas
      this.listaMarcas.next(items);
    })
  }


  buscarUsuarios() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM USUARIO', []).then(res => {
      //creo mi lista de objetos de marcas vacio
      let items: UsuariosService[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            clave: res.rows.item(i).clave,
            rol_id: res.rows.item(i).rol_id
          })
        }

      }
      //actualizamos el observable de las marcas
      this.listaUsuarios.next(items);
    })
  }



  validarUsuario(nombre, clave) {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT COUNT(NOMBRE_USUARIO) AS CONTENOMBRE, COUNT(CLAVE) AS CONTECLAVE FROM USUARIO WHERE NOMBRE_USUARIO = ? AND CLAVE = ?', [nombre, clave]).then(res => {
      if (res.rows.item(0).CONTENOMBRE === 0 && res.rows.item(0).CONTECLAVE === 0) {
        return true;
      }
      return false;
    })
  }


  mandarDatosUsuario(nombre_usuario) {
    let usuario = {
      id_usuario: '',
      nombre_usuario: '',
      clave: '',
      rol_id: '',
    }

    return this.database.executeSql('SELECT * FROM USUARIO WHERE nombre_usuario = ?', [nombre_usuario]).then((res) => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          usuario = {
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            clave: res.rows.item(i).clave,
            rol_id: res.rows.item(i).rol_id,
          }
        }
      }
      console.log('ID rol', usuario.rol_id)
      console.log('nombre USUARIO', usuario.nombre_usuario)
      return usuario;
    })
  }


  agregarVehiculo(patente, color, modelo, annio, marca_id, usuario_id) {
    let data = [patente, color, modelo, annio, marca_id, usuario_id];
    return this.database.executeSql('INSERT INTO AUTO(patente, color, modelo, annio, marca_id, usuario_id) VALUES (?,?,?,?,?,?)', data).then(res => {
      this.buscarVehiculos();
    });
  }



  eliminarVehiculo(patentev) {
    return this.database.executeSql('DELETE FROM AUTO WHERE patente = ?', [patentev]).then(a => {
      this.buscarVehiculos();
    })

  }

  agregarUsuario(id_usuario, nombre_usuario, clave, rol_id) {
    let data = [id_usuario, nombre_usuario, clave, rol_id];
    return this.database.executeSql('INSERT OR IGNORE INTO USUARIO(id_usuario, nombre_usuario, clave, rol_id) VALUES (?,?,?,?)', data).then(res => {
      this.buscarUsuarios()
    })
  }


  agregarRuta(fecha_viaje, hora_salida, asientos_dispo, monto, patente_auto, id_comuna, id_viaje) {
    let data = [fecha_viaje, hora_salida, asientos_dispo, monto, patente_auto];
    let data2 = [id_comuna, id_viaje]
    return this.database.executeSql('INSERT INTO VIAJE(fecha_viaje, hora_salida, asientos_dispo, monto, patente_auto) VALUES (?,?,?,?,?)', data),
      this.database.executeSql('INSERT INTO VIAJE_COMUNA(viaje_id_viaje, comuna_id) VALUES (?,?)', data2).then(res => {
        this.buscarRutas();
      })
  }


  buscarRutas() {
    return this.database.executeSql('SELECT * FROM USUARIO U INNER JOIN AUTO A ON (U.ID_USUARIO = A.USUARIO_ID_USUARIO) INNER JOIN VIAJE V ON (A.PATENTE = V.AUTO_PATENTE) INNER JOIN DETALLE_VIAJE DV ON (V.ID_VIAJE = DV.VIAJE_ID_VIAJE)', []).then(res => {

      let items: Rutas[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            //USUARIO
            usuario_id: res.rows.item(i).id_usuario,
            patente: res.rows.item(i).patente,
            viaje_id: res.rows.item(i).id_viaje,
            detalle_id: res.rows.item(i).id_detalle,
            nombre: res.rows.item(i).nombre,
            apellidos: res.rows.item(i).apellidos,

            //AUTO
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,

            //VIAJE
            fecha_viaje: res.rows.item(i).fecha_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_dispo: res.rows.item(i).asientos_dispo,
            monto: res.rows.item(i).monto,

            //DETALLE VIAJE
            status: res.rows.item(i).status
          })
        }
      }
    })
  }

  generarReporte() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM DETALLE_VIAJE DV INNER JOIN VIAJE V ON (DV.VIAJE_ID = V.VIAJE_ID_VIAJE)', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Reportes[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje: res.rows.item(i).id_viaje,
            fecha_viaje: res.rows.item(i).fecha_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            id_usuario: res.rows.item(i).id_usuario,
            status: res.rows.item(i).status,
            monto: res.rows.item(i).monto,
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaReportes.next(items);
    })
  }

}