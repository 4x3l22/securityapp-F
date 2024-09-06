import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../_service/master.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import * as bootstrap from 'bootstrap';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { response } from 'express';
import { Imodule } from '../../_service/interfaces/Imodule';


@Component({
  selector: 'app-module',
  standalone: true,
  imports: [ReactiveFormsModule, DataTablesModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit{


  // showModal = false;

  id?: number;

  modules: Imodule[]=[];
  dtoptions: Config={}
  dttrigger: Subject<any> = new  Subject<any>();


  constructor(
    private service: MasterService,
    private builder: FormBuilder,
    private router: Router
  ) {

  }

  navegation(rout: string) {
    this.router.navigate([rout]);
  }

  ngOnInit(): void {
    this.getModules();
    this.dtoptions={
      pagingType: "full_numbers",
      lengthMenu: [5,10,15,20]
    };
  }

  getModules(){
    this.service.GetModule("Module").subscribe({
      //Para código mas tipado
      next: (data:  Imodule[]) => {
        this.modules=data;
        this.dttrigger.next(null);
      }

    })
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

  deleteModule(id: any){
    this.validator().then(()=>{
      this.service.Delete("Module",  id).subscribe((data: any)=>{
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
