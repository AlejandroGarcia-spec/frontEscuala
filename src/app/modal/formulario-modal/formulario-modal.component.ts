import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class FormularioModalComponent implements OnInit {
  @Input() familiar: any = {
    nombre: '',
    apellido: '',
    parentesco: '',
    foto: null,
  };

  fotoArchivo: File | null = null;
  fotoPreview: string | ArrayBuffer | null = null;

  opcionesParentesco = [
    { valor: 'padre/madre', texto: 'Padre/Madre' },
    { valor: 'hermanos/hermanas', texto: 'Hermanos/Hermanas' },
    { valor: 'primos/primas', texto: 'Primos/Primas' },
    { valor: 'tios/tias', texto: 'Tíos/Tías' },
    { valor: 'niñera', texto: 'Niñera' },
    { valor: 'conocido/conocida', texto: 'Conocido/Conocida' },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (!this.familiar) {
      this.familiar = {
        nombre: '',
        apellido: '',
        parentesco: '',
        foto: null,
      };
    } else {
      // Si el familiar ya tiene foto (base64), la mostramos
      if (this.familiar.foto) {
        this.fotoPreview = this.familiar.foto;
      }
    }
  }

  registrar() {
    if (this.familiar.nombre && this.familiar.apellido && this.familiar.parentesco) {
      this.modalCtrl.dismiss({
        familiar: {
          ...this.familiar,
          fotoArchivo: this.fotoArchivo, // Puede ser null si no cambió
        },
      });
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fotoArchivo = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
