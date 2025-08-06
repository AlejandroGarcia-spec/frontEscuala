import { Component, HostListener,  } from '@angular/core';
import { AlertController, IonicModule, MenuController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

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
  telefono: string = "";
  correo: string = "";
  grupo: string = "";
  tipo_usuario: string = 'Maestro';
  imagen: string = "";
  mostrarModalQR: boolean = false; // Controla la visibilidad del modal

constructor(
  private api: ApiService,
  private authS: AuthService,
    private router: Router,
    private toastController: ToastController,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
) {}

ngOnInit() {
  const usuario = JSON.parse(localStorage.getItem('usuario')!);
  if (usuario && usuario.rol === 'maestro') {
    this.obtenerGrupoPorCorreo(usuario.correo);
  }
}

 obtenerGrupoPorCorreo(correo: string) {
  this.api.getPerfilMaestroPorCorreo(correo).subscribe({
    next: (maestro) => {
      console.log('Perfil del maestro:', maestro);
      
      // Asignar datos a las propiedades para el template
      this.nombre = maestro.nombre;
      this.correo = maestro.correo;
      this.telefono = maestro.telefono;
      this.grupo = `Grupo ${maestro.grupoId}`;
      this.imagen = maestro.imagenBase64?.startsWith('data:image')
      ? maestro.imagenBase64
      : maestro.imagenBase64
    ? `data:image/jpeg;base64,${maestro.imagenBase64}`
    : 'assets/img/avatar.png';


      // Si vas a obtener alumnos también, puedes usar:
      // this.idGrupo = maestro.grupoId;
      // this.obtenerAlumnosPorGrupo();
    },
    error: (err) => {
      console.error('Error al obtener el perfil del maestro:', err);
    }
  });
}

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


