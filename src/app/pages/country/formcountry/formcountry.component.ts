import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CountryService } from '../../../_service/country.service';
import { ContinentService } from '../../../_service/continent.service';
import { IContinent } from '../../../_service/interfaces/IContinent';

@Component({
  selector: 'app-formcountry',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './formcountry.component.html',
  styleUrl: './formcountry.component.css'
})
export class FormcountryComponent {

  countryform: FormGroup;
  id?: number;

  continents: IContinent[] = [];

  constructor
  (
    private router: Router,
    private service: CountryService,
    private servicect: ContinentService
  )
  {
    this.countryform = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      ContinentId: new FormControl(null, [Validators.required]),
      State: new FormControl(true, [Validators.required]),
      CreateAt: new FormControl(new Date().toISOString())
    });
  }

  ngOnInit() {
    this.get();
  }

  get(){
    return this.servicect.getContinent('Continent').subscribe({
      next: (data: IContinent[]) => {
        this.continents = data;
      }
    })

  }

  navigation(rout: string){
    this.router.navigate([rout]);
  }

  postCountry() {
    const data = {
      id: this.id ?? 0,
      Name: this.countryform.get('Name')?.value,
      Description: this.countryform.get('Description')?.value,
      ContinentId:  this.countryform.get('ContinentId')?.value,
      State: true,
      CreateAt: new Date().toISOString()
    };

    this.service.postCountry("Country", this.id, data).subscribe(
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
