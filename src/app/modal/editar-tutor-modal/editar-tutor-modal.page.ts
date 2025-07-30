import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-editar-tutor-modal',
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './editar-tutor-modal.page.html',
  styleUrls: ['./editar-tutor-modal.page.scss'],
})
export class EditarTutorModalPage {

  constructor() { }

}
