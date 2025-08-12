import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { AsistenciasService } from 'src/app/core/services/asistencias.service';
import { SalidasService } from 'src/app/core/services/salidas.service';

@Component({
  selector: 'app-vista-tutor',
  templateUrl: './vista-tutor.page.html',
  styleUrls: ['./vista-tutor.page.scss'],
  imports: [IonicModule, CommonModule,],
  standalone: true,
})
export class VistaTutorPage implements OnInit {

  hijos: any[] = [];
  tutorId!: number;

  constructor(
    private alumnosService: AlumnosService,
    private entradasService: AsistenciasService,
    private salidasService: SalidasService
  ) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (!usuario || !usuario.id) {
      console.error('No se encontró el ID del tutor en localStorage');
      return;
    }

    this.tutorId = usuario.id;

    this.cargarHijos();

  }

  cargarHijos() {
    this.entradasService.getHijosConEstado(this.tutorId).subscribe({
      next: (data) => {
        this.hijos = data;
        console.log("hijos",this.hijos);
      },
      error: (err) => {
        console.error('Error al obtener hijos', err);
      }
    });

    
  }

  formatoHora(fecha: string) {
    return new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
