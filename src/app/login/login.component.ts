import { Component } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: LoginService, private router:  Router) { }


  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['main']);
        } else {
          this.loginError = 'Credenciales erróneas';
        }
      },
      (error: any) => {
        this.loginError = 'Error del servidor';
      }
    );
  }
}
