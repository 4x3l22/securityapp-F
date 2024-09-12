import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { IRol } from '../../_service/interfaces/Irole';
import { RolService } from '../../_service/rol.service';
import { DataRolService } from '../../_service/data-rol.service';

@Component({
  selector: 'app-Role',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './Role.component.html',
  styleUrls: ['./Role.component.css']
})
export class RoleComponent implements OnInit {

  id?: number;
  roles: IRol[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private service: RolService,
    private datarole: DataRolService
  ) {}

  ngOnInit() {
    this.getRols();
    this.dtoptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  navigate(rout: string){
    this.router.navigate([rout]);
  }

  navegation(rout: string, id: number, name: string) {
    if (id !== undefined && id !== null) {
      // alert('el id es: ' + id);
      this.datarole.setData('id', id);
      this.datarole.setData('name', name);
      this.router.navigate([rout]);
    } else {
      console.error('ID is undefined or null');
    }
  }

  getRols() {
    return this.service.GetRol("role").subscribe({
      next: (data: IRol[]) => {
        console.log(data);
        this.roles = data;
        this.dttrigger.next(null);
      }
    });
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

  deleterol(id: any) {
    this.validator().then(() => {
      this.service.Delete("Role", id).subscribe((data: any) => {
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
