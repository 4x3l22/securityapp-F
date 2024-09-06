import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { MasterService } from '../../_service/master.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import Swal from 'sweetalert2';
import { UserService } from '../../_service/user.service';
import { IUser } from '../../_service/interfaces/IUser';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, DataTablesModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  id?: number;

  users: IUser[]=[];
  dtoptions: Config={}
  dttrigger: Subject<any> = new  Subject<any>();

  constructor
  (
    private router: Router,
    private service: UserService
  ){}

  ngOnInit(): void {
    this.getuser();
    this.dtoptions={
      pagingType: "full_numbers",
      lengthMenu: [5,10,15,20]
    };
  }

  navegation(rout: string) {
    this.router.navigate([rout]);
  }

  getuser(){
    this.service.getUser("User").subscribe({next: (data: IUser[])=>{
      this.users = data;
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

  deleteuser(id: any){
    this.validator().then(()=>{
      this.service.Delete("User",  id).subscribe((data: any)=>{
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
