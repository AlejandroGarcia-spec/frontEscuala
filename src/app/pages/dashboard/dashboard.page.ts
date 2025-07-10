import { Component,  } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [IonicModule],
   styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
 nombreUsuario = 'Maestro Juan';
  constructor() { }


}
