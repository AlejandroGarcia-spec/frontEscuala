import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  standalone: true,
  imports: [IonicModule],
   styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
 constructor(private router: Router,
     private authService: AuthService,
       private menu: MenuController,

   ) { }
   logout() {
     this.authService.logout();
     this.router.navigate(['/auth/login']);
   }
   toggleMenu() {
     this.menu.toggle();
   }
  }
 