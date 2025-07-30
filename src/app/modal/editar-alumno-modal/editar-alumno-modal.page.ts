import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-editar-alumno-modal',
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './editar-alumno-modal.page.html',
  styleUrls: ['./editar-alumno-modal.page.scss'],
})
export class EditarAlumnoModalPage  {

  constructor() { }



}
