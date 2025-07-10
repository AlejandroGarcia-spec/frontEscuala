import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

   constructor(private Router: Router) { }

  redirectToInstructor() {
    this.Router.navigate(['/tutores']);
  }
  redirectToAdmin() {
    this.Router.navigate(['/admin']);
  }

  redirectToUser() {
    this.Router.navigate(['/auth/tutor']);
  }


}
