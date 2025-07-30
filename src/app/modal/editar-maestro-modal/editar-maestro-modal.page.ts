import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  imports: [IonicModule,
    FormsModule,
  CommonModule,
  ReactiveFormsModule,
  ],
  standalone: true,
  selector: 'app-editar-maestro-modal',
  templateUrl: './editar-maestro-modal.page.html',
  styleUrls: ['./editar-maestro-modal.page.scss'],
})
export class EditarMaestroModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
