import { routes } from './../../../app.routes';
import { DataTablesModule } from 'angular-datatables';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolviewService } from '../../../_service/rolview.service';
import Swal from 'sweetalert2';
import { ViewService } from '../../../_service/view.service';
import { View } from '../../../_service/interfaces/view';

@Component({
  selector: 'app-formroleview',
  standalone: true,
  imports: [ DataTablesModule , ReactiveFormsModule],
  templateUrl: './formroleview.component.html',
  styleUrl: './formroleview.component.css'
})
export class FormroleviewComponent implements OnInit{

  roleview: FormGroup;
  id?: number;

  Views: View[]=[];

  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor
  (
    private router: Router,
    private service: RolviewService,
    private views: ViewService
  )
  {
    this.roleview = new FormGroup({
      RoleId: new FormControl(null, [Validators.required]),
      viewId: new  FormControl(null, [Validators.required]),
      state: new FormControl(true,  [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getView();
  }

  getView(){
    this.views.getView("View").subscribe({
      next: (data: View[])=>{
        this.Views = data;
        this.dttrigger.next(null);
      }
    });
  }

  navigation(routes: string){
    this.router.navigate([routes]);
  }

  postForm(){
    const data = {
      id: this.id ?? 0,
      RoleId: sessionStorage.getItem('id'),
      viewId: this.roleview.get('viewId')?.value,
      state: true
    }
    this.service.post("RoleView",this.id,data).subscribe(
      (response) =>{
        Swal.fire({
          title: "Save!",
          text: "Your file has been saved.",
          icon: "success"
        });
      },(error) => {
        console.error('Error:', error);
        Swal.fire({
          title: "Error!",
          text: "There was an error saving your data.",
          icon: "error"
        });
      }
    )
  }

}
