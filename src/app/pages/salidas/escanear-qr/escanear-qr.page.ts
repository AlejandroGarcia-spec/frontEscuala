import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule,ReactiveFormsModule, ZXingScannerModule],
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQrPage  {
alumno: any = null;
  salidaAutorizada: boolean = false;
  qrResult: string = '';
  registrosSalida: any[] = []; // ← aquí guardamos los registros

  constructor() {}

  onCodeResult(result: string) {
    this.qrResult = result;
    const parsed = JSON.parse(result);
    const alumnoId = parsed.alumno_id;

    if (alumnoId === 23) {
      this.alumno = {
        id: 23,
        nombre: 'Carlos',
        apellido1: 'Ramírez',
        grupo: { nombre: '3A' },
        tutor: { nombre: 'María Gómez' },
        foto: 'https://randomuser.me/api/portraits/men/75.jpg'
      };
    } else {
      this.alumno = {
        id: alumnoId,
        nombre: 'Alumno Demo',
        apellido1: 'Apellido',
        grupo: { nombre: 'Grupo X' },
        tutor: { nombre: 'Tutor Demo' },
        foto: 'https://via.placeholder.com/300x300?text=Foto+Alumno'
      };
    }
  }

  autorizarSalida() {
    if (this.alumno) {
      const registro = {
        alumno: this.alumno,
        fecha: new Date().toLocaleString(),
        autorizado: this.salidaAutorizada
      };
      this.registrosSalida.unshift(registro); // agrega arriba
      alert(`✅ ${this.alumno.nombre} ${this.alumno.apellido1} ${this.salidaAutorizada ? 'puede salir' : 'NO tiene permiso'}`);
      this.cancelar();
    }
  }

  cancelar() {
    this.alumno = null;
    this.qrResult = '';
    this.salidaAutorizada = false;
  }
}
