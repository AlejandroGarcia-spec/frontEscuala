import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-eliminar-admin-modal',
  templateUrl: './eliminar-admin-modal.page.html',
  styleUrls: ['./eliminar-admin-modal.page.scss'],
})
export class EliminarAdminModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
