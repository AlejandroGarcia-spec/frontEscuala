import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, MenuController, ModalController, ToastController } from '@ionic/angular';
import { FooterPage } from "src/app/componentes/footer/footer.page";
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  imports: [IonicModule, FooterPage],
  standalone:true,
  selector: 'app-perfil-padre',
  templateUrl: './perfil-padre.page.html',
  styleUrls: ['./perfil-padre.page.scss'],
})
export class PerfilPadrePage  {
 nombre: string = "";
 apellido: string = "";
  telefono: string = "";
  correo: string = "";
  hijos: string = "";
  hijo_grupo: string = "";
  grupo: string = "";
  tipo_usuario: string = 'Tutor';
  qrCode: string = ""; // Variable para almacenar la URL del QR
  id!: number;
    imagen: string = "";


  constructor(private authService: AuthService, private toastController: ToastController,
        private menu: MenuController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
         private api: ApiService,
  private authS: AuthService,
    private router: Router,
  ) {}

ngOnInit() {
  const usuario = JSON.parse(localStorage.getItem('usuario')!);
  if (usuario && usuario.rol === 'tutor') {
    this.obtenerPerfilTutor(usuario.correo);
  }
}

obtenerPerfilTutor(correo: string) {
  this.api.getPerfilTutorPorCorreo(correo).subscribe({
    next: (tutor) => {
      console.log('Perfil del tutor:', tutor);

      this.nombre = tutor.nombre;
      this.apellido = tutor.apellido;
      this.correo = tutor.correo;
      this.telefono = tutor.telefono;

      // Número de hijos
      this.hijos = tutor.alumno?.length || 0;

      // Lista de hijos con su grupo
      if (tutor.alumno?.length > 0) {
        this.hijo_grupo = tutor.alumno
          .map((a: any) => `${a.nombre} (${a.grupo?.nombre || 'Sin grupo'})`)
          .join(', ');
      } else {
        this.hijo_grupo = 'Sin hijos registrados';
      }

      // Imagen de perfil
      this.imagen = tutor.imagenBase64?.startsWith('data:image')
        ? tutor.imagenBase64
        : tutor.imagenBase64
        ? `data:image/jpeg;base64,${tutor.imagenBase64}`
        : 'assets/img/avatar.png';
    },
    error: (err) => {
      console.error('Error al obtener el perfil del tutor:', err);
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
