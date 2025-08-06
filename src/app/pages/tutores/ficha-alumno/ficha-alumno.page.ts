import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonCard } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ficha-alumno',
  templateUrl: './ficha-alumno.page.html',
  styleUrls: ['./ficha-alumno.page.scss'],
  imports: [IonicModule, CommonModule]
})


export class FichaAlumnoPage implements OnInit {
datosAlumno: any; 

  constructor(    
    private route: ActivatedRoute,
    private http: HttpClient
) { }

  ngOnInit() {
    const tutorId = this.route.snapshot.paramMap.get('tutorId');
    const alumnoId = this.route.snapshot.paramMap.get('alumnoId');

    this.http.get(`https://servidor/api/tutores/${tutorId}/alumnos/${alumnoId}/datos-qr`)
      .subscribe((data: any) => {
        this.datosAlumno = data[0];
      });
  }

}
