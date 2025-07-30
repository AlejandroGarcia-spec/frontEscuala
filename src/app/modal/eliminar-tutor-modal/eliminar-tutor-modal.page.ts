import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-tutor-modal',
  templateUrl: './eliminar-tutor-modal.page.html',
  styleUrls: ['./eliminar-tutor-modal.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class EliminarTutorModalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
