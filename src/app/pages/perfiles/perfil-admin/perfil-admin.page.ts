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
  tipo_usuario: string = "";
  telefono: string = "";

  constructor(private authService: AuthService, private toastController: ToastController) {}

  /* cargarAdminAutenticado() {
    const admin = this.authService.getUserData3();
   // console.log('Admin from localStorage:', admin); // Log para verificar los datos en localStorage
    if (admin && admin.id) {
      this.authService.getAdminById(admin.id).subscribe(
        (resp: any) => {
       //   console.log('Response from API:', resp); // Log para verificar la respuesta de la API
          this.nombre = resp.nombre;
          this.tipo_usuario = resp.tipo_usuario;
          this.telefono = resp.telefono;
        },
        (error) => {
          //console.error('Error al obtener la información del usuario:', error);
          this.presentToast('Error al obtener la información del administrador');
        }
      );
    } else {
      //console.error('No se pudo obtener la información del usuario');
      this.presentToast('No se pudo obtener la información del administrador');
    }
  }
*/
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
