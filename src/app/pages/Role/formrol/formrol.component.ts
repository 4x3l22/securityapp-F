import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MasterService } from '../../../_service/master.service';

@Component({
  selector: 'app-formrol',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formrol.component.html',
  styleUrls: ['./formrol.component.css']
})
export class FormrolComponent implements OnInit {

  rolform: FormGroup;
  id?: number;

  constructor
  (
    private router: Router,
    private service: MasterService
  )
  {
    this.rolform = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Description: new FormControl(null, [Validators.required]),
      State: new FormControl(true, [Validators.required]),
      CreateAt: new FormControl(new Date().toISOString())
    });
  }

  ngOnInit() {
  }

  navigation(rout: string){
    this.router.navigate([rout]);
  }

  postModules() {
    const data = {
      id: this.id ?? 0,
      Name: this.rolform.get('Name')?.value,
      Description: this.rolform.get('Description')?.value,
      State: true,
      CreateAt: new Date().toISOString()
    };

    this.service.PostModule("Role", this.id, data).subscribe(
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
