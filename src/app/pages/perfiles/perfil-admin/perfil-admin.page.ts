import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { FooterPage } from "src/app/componentes/footer/footer.page";

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [IonicModule, FooterPage],
  templateUrl: './perfil-admin.page.html',
  styleUrls: ['./perfil-admin.page.scss'],
})
export class PerfilAdminPage {
  nombre: string = "";
  correo: string = "";

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.cargarAdminAutenticado();
  }

  cargarAdminAutenticado() {
    const admin = this.authService.getUsuario(); // <-- asume que aquí se guarda el admin logueado
    if (admin && admin.correo) {
      this.authService.getAdminByCorreo(admin.correo).subscribe(
        (resp: any) => {
          this.nombre = resp.nombre;
          this.correo = resp.correo;
        },
        (error) => {
          this.presentToast('Error al obtener la información del administrador');
        }
      );
    } else {
      this.presentToast('No se pudo obtener la información del administrador');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }
}
