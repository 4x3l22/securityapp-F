import { Component } from '@angular/core';
import { ICountry } from '../../_service/interfaces/ICountry';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { CountryService } from '../../_service/country.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [ DataTablesModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {

  id?: number;
  countryes: ICountry[]=[];

  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(private service: CountryService, private route: Router){}

  ngOnInit() {
    this.getCountry();
    this.dtoptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  navigate(rout: string){
    this.route.navigate([rout]);
  }

  getCountry(){
    this.service.getCountry("Country").subscribe({
      next: (data:  ICountry[]) => {
        this.countryes = data;
        this.dttrigger.next(null);
      }
    })
  }

  validator(): Promise<void> {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          resolve();
        }
      });
    });
  }

  deleteCountry(id: any) {
    this.validator().then(() => {
      this.service.delete("Country", id).subscribe((data: any) => {
        if (data.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    });
  }
}
