import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule,  } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterModule
  ],
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
email: string = '';
password: string = '';

  constructor(private readonly router: Router) {}
onSubmit() {
  if (!this.email || !this.password) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Solo admin por ahora
  if (this.email.includes('admin')) {
    this.router.navigate(['/admin']);
  } else {
    alert('Solo usuarios admin por ahora');
  }
}
}
