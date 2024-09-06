import { Component } from '@angular/core';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  loginError: string = "";

  constructor(private authService: LoginService){}

  login(): void{
    this.authService.login(this.username,this.password).subscribe(
      data =>{
        console.log('Login exitoso '+data);
      },
      error =>{
        this.loginError = 'Verifique sus credenciales';
      }
    );
  }
}
