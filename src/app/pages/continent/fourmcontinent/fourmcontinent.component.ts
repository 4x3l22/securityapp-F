import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContinentService } from '../../../_service/continent.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fourmcontinent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fourmcontinent.component.html',
  styleUrl: './fourmcontinent.component.css'
})
export class FourmcontinentComponent {

  continentf: FormGroup;

  id? : number;

  constructor(private service: ContinentService, private router:  Router) {

    this.continentf = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      // Name: new FormControl(null, [Validators.required]),
    });
  }

  navigation(ruta: string){
    this.router.navigate([ruta]);
  }

  post(){
    const data = {
      id: this.id ?? 0,
      Name: this.continentf.get('Name')?.value,
      Description: this.continentf.get('Description')?.value,
      state: true
    }
    return this.service.postContinent('Continent',this.id,data).subscribe(
      (response) =>{
        Swal.fire({
          title: "Guardado",
          text: "Continento agregado con exito",
          icon: "success",
        });
      },
      (error) =>{
        Swal.fire({
          title: "Error",
          text: "Error al agregar el continente",
          icon: "error",
        })
      }
    )
  }
}
// ng i Swal
