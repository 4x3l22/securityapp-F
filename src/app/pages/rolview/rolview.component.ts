import { RolviewService } from './../../_service/rolview.service';
import { Component, OnInit } from '@angular/core';
import { IRolView } from "../../_service/interfaces/IRolView";
import { Config } from "datatables.net";
import { Subject } from "rxjs";
import { DataRolService } from '../../_service/data-rol.service';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rolview',
  standalone: true,
  templateUrl: './rolview.component.html',
  imports: [DataTablesModule, ReactiveFormsModule],
  styleUrls: ['./rolview.component.css']
})
export class RolviewComponent implements OnInit {

  id: number =  0;

  name: number | null = null;

  roleViews: IRolView[] = [];

  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor
  (
    private dataRolService: DataRolService,
    private rolviewService: RolviewService,
    private  router: Router,
    private datarole: DataRolService
  ) { }


  ngOnInit(): void {
    this.id = this.dataRolService.getData('id');
    this.name =  this.dataRolService.getData('name');

    if (this.id !== null && this.id !== undefined) {
      this.loadRoleViews();
    } else {
      console.error('ID is null or undefined');
      this.navigate("main/role");
    }
    this.dtoptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  navegation(rout: string, id: number) {
    if (id !== undefined && id !== null) {
      // alert('el id es: ' + id);
      this.datarole.setData('id', id);
      this.router.navigate([rout]);
    } else {
      console.error('ID is undefined or null');
    }
  }

  navigate(rout: string){
    this.router.navigate([rout]);
  }

  loadRoleViews(): void {
    if (this.id !== 0) {
      this.rolviewService.getRolview('RoleView', this.id).subscribe({
        next: (data: IRolView[]) => {
          this.roleViews = data;
          this.dttrigger.next(null);
          console.log('Data received:', data);
        },
        error: (err) => {
          console.error('Error fetching role views:', err);
        }
      });
    }
  }
}
