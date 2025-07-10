import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage {
  @Input() titulo!: string;

  constructor(private menu: MenuController, private router: Router) {}

  toggleMenu() {
    this.menu.toggle('menuId');
  }

  datos(){
    this.router.navigate(['usuario']);
  }

}
