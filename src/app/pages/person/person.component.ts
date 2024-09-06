import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { MasterService } from '../../_service/master.service';
import Swal from 'sweetalert2';
import { DataTablesModule } from 'angular-datatables';
import { PersonService } from '../../_service/person.service';
import { IPerson } from '../../_service/interfaces/IPerson';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit{

  id?: number;

  person: IPerson[]=[];
  dtoptions: Config={}
  dttrigger: Subject<any> = new  Subject<any>();

  constructor(private service: PersonService) { }

  ngOnInit(){
    this.getPerson();
    this.dtoptions={
      pagingType: "full_numbers",
      lengthMenu: [5,10,15,20]
    };
  }

  getPerson(){
    this.service.getPerson("Person").subscribe({next: (data: IPerson[])=>{
      this.person = data;
      this.dttrigger.next(null);
    }});
  }

  validator(): Promise<void> {
    return new  Promise((resolve, reject) => {
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

  deleteperson(id: any){
    this.validator().then(()=>{
      this.service.Delete("Person",  id).subscribe((data: any)=>{
        if(data.status){
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    })
  }
}
