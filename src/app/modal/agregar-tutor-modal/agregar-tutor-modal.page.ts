import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-agregar-tutor-modal',
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './agregar-tutor-modal.page.html',
  styleUrls: ['./agregar-tutor-modal.page.scss'],
})
export class AgregarTutorModalPage  {

  constructor() { }



}
