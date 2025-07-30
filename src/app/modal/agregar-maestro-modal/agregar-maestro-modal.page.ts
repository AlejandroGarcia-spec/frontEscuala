import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-agregar-maestro-modal',
  templateUrl: './agregar-maestro-modal.page.html',
  styleUrls: ['./agregar-maestro-modal.page.scss'],
})
export class AgregarMaestroModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
