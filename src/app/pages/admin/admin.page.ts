import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  standalone: true,
  styleUrls: ['./admin.page.scss'],
  imports: [IonicModule]

})
export class AdminPage  {

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
