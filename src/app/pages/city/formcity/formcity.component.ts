import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CityService } from '../../../_service/city.service';
import { ICountry } from '../../../_service/interfaces/ICountry';
import { CountryService } from '../../../_service/country.service';

@Component({
  selector: 'app-formcity',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './formcity.component.html',
  styleUrl: './formcity.component.css'
})
export class FormcityComponent {

  cityform: FormGroup;
  id?: number;
  countryes: ICountry[]=[];

  constructor
  (
    private router: Router,
    private service: CityService,
    private servicecu: CountryService
  )
  {
    this.cityform = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      State: new FormControl(true, [Validators.required]),
      CreateAt: new FormControl(new Date().toISOString())
    });
  }

  ngOnInit() {
    this.getCountry();
  }

  getCountry(){
    this.servicecu.getCountry("Country").subscribe({
      next: (data:  ICountry[]) => {
        this.countryes = data;
      }
    })
  }

  navigation(rout: string){
    this.router.navigate([rout]);
  }

  postCity() {
    const data = {
      id: this.id ?? 0,
      Name: this.cityform.get('Name')?.value,
      Description: this.cityform.get('Description')?.value,
      State: true,
      CreateAt: new Date().toISOString()
    };

    this.service.postCity("City", this.id, data).subscribe(
      (response) => {
        Swal.fire({
          title: "Save!",
          text: "Your file has been saved.",
          icon: "success"
        });
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire({
          title: "Error!",
          text: "There was an error saving your data.",
          icon: "error"
        });
      }
    );
  }
}
