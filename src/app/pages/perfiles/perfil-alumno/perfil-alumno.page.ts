import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { AuthService } from 'src/app/core/services/auth.service';
import { QRAlumnoPage } from 'src/app/modal/qralumno/qralumno.page';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [IonicModule, FooterPage,FormsModule,],
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage  {

 nombre: string = "";
 correo: string = "";
  apellido: string = "";
   tipo_usuario: string = "";
   telefono: string = "";
   grupo: string = "";
   qrCode: string = ""; // Variable para almacenar la URL del QR
   id!: number;
    imagen: string = "";
  hijos: any[] = [];
  hijoSeleccionado: any = null;
 constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}
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
