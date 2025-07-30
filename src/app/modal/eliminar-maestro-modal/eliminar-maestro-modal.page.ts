import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-maestro-modal',
  templateUrl: './eliminar-maestro-modal.page.html',
  styleUrls: ['./eliminar-maestro-modal.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class EliminarMaestroModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
