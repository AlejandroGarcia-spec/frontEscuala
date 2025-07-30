import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-alumno-modal',
  templateUrl: './eliminar-alumno-modal.page.html',
  styleUrls: ['./eliminar-alumno-modal.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class EliminarAlumnoModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
