import { Component,  } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  imports: [IonTitle, IonContent, IonToolbar, IonHeader],
  standalone: true,
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage {
  constructor() { }


}
