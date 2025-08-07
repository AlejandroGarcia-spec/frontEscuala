import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class FormularioModalComponent {
  familiar = {
    nombre: '',
    apellido: '',
    parentesco: '',
    foto: null
  };

  // Opciones de parentesco
  opcionesParentesco = [
    { valor: 'padre/madre', texto: 'Padre/Madre' },
    { valor: 'hermanos/hermanas', texto: 'Hermanos/Hermanas' },
    { valor: 'primos/primas', texto: 'Primos/Primas' },
    { valor: 'tios/tias', texto: 'Tíos/Tías' },
    { valor: 'niñera', texto: 'Niñera' },
    { valor: 'conocido/conocida', texto: 'Conocido/Conocida' }
  ];

  constructor(private modalCtrl: ModalController) {}

  registrar() {
    if (this.familiar.nombre && this.familiar.apellido && this.familiar.parentesco) {
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