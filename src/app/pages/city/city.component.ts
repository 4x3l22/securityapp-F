import { Component, OnInit } from '@angular/core';
import { ICity } from '../../_service/interfaces/ICity';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { CityService } from '../../_service/city.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [ DataTablesModule ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit{

  id?: number;
  citys: ICity[]=[];

  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(private service: CityService, private route: Router){}

  ngOnInit() {
    this.getCity();
    this.dtoptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  navigate(rout: string){
    this.route.navigate([rout]);
  }

  getCity(){
    this.service.getCity("City").subscribe({
      next: (data:  ICity[]) => {
        this.citys = data;
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

  deletecity(id: any) {
    this.validator().then(() => {
      this.service.delete("City", id).subscribe((data: any) => {
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
