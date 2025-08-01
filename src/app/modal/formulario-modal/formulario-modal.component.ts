import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class FormularioModalComponent {
  familiar = {
    nombre: '',
    apellido: '',
    foto: null
  };

  constructor(private modalCtrl: ModalController) {}

  registrar() {
    if (this.familiar.nombre && this.familiar.apellido) {
      this.modalCtrl.dismiss({
        familiar: this.familiar
      });
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.familiar.foto = file;
    }
  }
}