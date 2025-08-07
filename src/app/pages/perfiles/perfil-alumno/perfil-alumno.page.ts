import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { QRAlumnoPage } from 'src/app/modal/qralumno/qralumno.page';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [IonicModule, FooterPage,FormsModule,CommonModule],
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage  {

 id!: number;
  nombre: string = "";
  apellido: string = "";
  telefono: number | string = "";
  parentesco: string = "";
  correo: string = "";
  contrasena: string = "";
  createdAt: string = "";
  imagen: string = "";
  tipo_usuario: string = "";
  grupo: string = "";
  qrCode: string = "";
  hijos: any[] = [];
  hijoSeleccionado: any = null;
 constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController,
    private api: ApiService,
  ) {}
  //optener datos del usuario tutor
  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario && usuario.rol === 'tutor') {
      this.obtenerDatos(usuario.correo);
    }
  }
obtenerDatos(correo: string) {
    this.api.getPerfilTutorPorCorreo(correo).subscribe({
      next: (usuario) => {
        console.log('Perfil del usuario:', usuario);

        this.id = usuario.id;
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.telefono = usuario.telefono;
        this.parentesco = usuario.parentesco;
        this.correo = usuario.correo;
        this.contrasena = usuario.contrasena;
        this.createdAt = usuario.createdAt;
        this.imagen = usuario.imagenBase64?.startsWith('data:image')
          ? usuario.imagenBase64
          : usuario.imagenBase64
          ? `data:image/jpeg;base64,${usuario.imagenBase64}`
          : 'assets/img/avatar.png';
        this.obtenerHijos(usuario.id);
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
      }
    });
  }
obtenerHijos(tutorId: number) {
  this.api.getHijosByTutorId(tutorId).subscribe({
    next: (data: any[]) => {
      console.log('Hijos obtenidos:', data);
      this.hijos = data;
      if (this.hijos.length > 0) {
        this.seleccionarHijo(this.hijos[0]);
      }
    },
    error: (err) => {
      console.error('Error al obtener los hijos:', err);
      this.presentToast('No se pudieron cargar los hijos');
    }
  });
}

  ionViewWillEnter() {
 // this.obtenerHijos();
  }
/* obtenerHijos() {
    const user = this.authService.getUserData3(); // padre
    if (user && user.id) {
      this.authService.getHijosByTutorId(user.id).subscribe(
        (data: any[]) => {
          this.hijos = data;
          if (this.hijos.length > 0) {
            this.seleccionarHijo(this.hijos[0]);
          }
        },
        (error) => {
          this.presentToast('No se pudieron cargar los hijos');
        }
      );
    }
  }
*/
seleccionarHijo(hijo: any) {
  this.hijoSeleccionado = hijo;

  // Reemplazar los datos actuales con los del hijo seleccionado
  this.nombre = hijo.nombre;
  this.apellido = hijo.apellido;
  this.telefono = hijo.telefono;
  this.correo = hijo.correo;
  this.grupo = hijo.grupo?.nombre || '';
  this.imagen = hijo.imagenBase64?.startsWith('data:image')
    ? hijo.imagenBase64
    : hijo.imagenBase64
    ? `data:image/jpeg;base64,${hijo.imagenBase64}`
    : 'assets/img/avatar.png';
}

 async mostrarModalQR() {
  if (!this.hijoSeleccionado) {
    console.warn('No se ha seleccionado ningún hijo');
    return;
  }

  const datos = {
    nombre: this.hijoSeleccionado.nombre,
    grupo: this.hijoSeleccionado.grupo,
    correo: this.hijoSeleccionado.correo,
  };

  const modal = await this.modalController.create({
    component: QRAlumnoPage,
    componentProps: {
      datosQR: JSON.stringify(datos),
    },
  });

  await modal.present();
}


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }
}
