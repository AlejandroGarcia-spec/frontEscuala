import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component,  } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-admin-modal',
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './editar-admin-modal.page.html',
  styleUrls: ['./editar-admin-modal.page.scss'],
})
export class EditarAdminModalPage {

  constructor() { }



}
