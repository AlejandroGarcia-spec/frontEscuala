import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  imports: [IonicModule],
  standalone: true,
  selector: 'app-padres-home',
  templateUrl: './padres-home.page.html',
  styleUrls: ['./padres-home.page.scss'],
})
export class PadresHomePage  {

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
