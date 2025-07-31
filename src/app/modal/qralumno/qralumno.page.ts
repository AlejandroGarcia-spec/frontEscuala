import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qralumno',
  imports:[IonicModule,QRCodeComponent],
  standalone:true,
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})
export class QRAlumnoPage  {
  @Input() datosQR: string = '';

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
 ionViewWillEnter() {
    // Aquí puedes recibir los datosQR si los estás pasando desde el modalController
  }
}
