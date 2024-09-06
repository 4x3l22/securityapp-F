import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from  '../../../_service/master.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formmodule',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formmodule.component.html',
  styleUrls: ['./formmodule.component.css']
})
export class FormmoduleComponent implements OnInit {

  moduleform: FormGroup;
  id?: number;

  constructor(
    private route: Router,
    private service: MasterService
  )
  {
    this.moduleform = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      State: new FormControl(true, [Validators.required]),
      CreateAt: new FormControl(new Date().toISOString())
    });
  }

  navigation(rout: string){
    this.route.navigate([rout]);
  }

  ngOnInit() {
  }

  postModules() {
    const data = {
      id: this.id ?? 0,
      Name: this.moduleform.get('Name')?.value,
      Description: this.moduleform.get('Description')?.value,
      State: true,
      CreateAt: new Date().toISOString()
    };

    this.service.PostModule("Module", this.id, data).subscribe(
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
