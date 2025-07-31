import { Component, HostListener,  } from '@angular/core';
import { AlertController, IonicModule, MenuController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-maestro',
  standalone: true,
  imports: [IonicModule, FooterPage],
  templateUrl: './perfil-maestro.page.html',
  styleUrls: ['./perfil-maestro.page.scss'],
})
export class PerfilMaestroPage {
 qrCode: string = ""; // Variable para almacenar la URL del QR
  id!: number;
  nombre: string = "";
  tipo_usuario: string = "";
  telefono: string = "";
  correo: string = "";
  grupo: string = "";
  imagen: string = "";
  mostrarModalQR: boolean = false; // Controla la visibilidad del modal
  constructor(private authService: AuthService,
    private authS: AuthService,
    private router: Router,
    private toastController: ToastController,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController

  ) {}

  async presentToast2(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      color: 'danger',
      duration: 2500,
    });
    await toast.present();
  }
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.menu.close().then(() => {
              this.authS.logout();
              this.router.navigate(['/login']);
            });
          },
        },
      ],
    });

    await alert.present();
  }

  generarCodigoQR() {
  }
  async abrirModalQR() {
  }

}


