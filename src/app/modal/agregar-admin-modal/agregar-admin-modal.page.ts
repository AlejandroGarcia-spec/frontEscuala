import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-agregar-admin-modal',
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './agregar-admin-modal.page.html',
  styleUrls: ['./agregar-admin-modal.page.scss'],
})
export class AgregarAdminModalPage {

  constructor() { }



}
