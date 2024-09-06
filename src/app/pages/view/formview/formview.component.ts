import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MasterService } from '../../../_service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formview',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formview.component.html',
  styleUrls: ['./formview.component.css']
})
export class FormviewComponent implements OnInit {

  modules: any[]=[];
  viewform:  FormGroup;
  id?: number;
  // name?: string;
  // route?: string;
  // description?: string;

  constructor
  (
    private service: MasterService,
    private router: Router
  )
  {
    this.viewform = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Route: new FormControl(null, [Validators.required]),
      ModuleId: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      State: new FormControl(true, [Validators.required]),
      CreateAt: new FormControl(new Date().toISOString())
    });
  }
  ngOnInit() {
    this.getModules();
  }

  navigation(rout: string){
    this.router.navigate([rout]);
  }

  getModules(){
    this.service.GetModule("Module").subscribe((data: any)=>{
      this.modules = data;
    });
  }

  postView() {
    const data = {
      id: this.id ?? 0,
      Name: this.viewform.get('Name')?.value,
      Route: this.viewform.get('Route')?.value,
      ModuleId: this.viewform.get('ModuleId')?.value,
      Description: this.viewform.get('Description')?.value,
      State: true,
      CreateAt: new Date().toISOString()
    };

    this.service.PostModule("View", this.id, data).subscribe(
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
