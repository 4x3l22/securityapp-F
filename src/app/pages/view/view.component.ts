import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { MasterService } from '../../_service/master.service';
import Swal from 'sweetalert2';
import { ViewService } from '../../_service/view.service';
import { View } from '../../_service/interfaces/view';

// declare var $: any;

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  view: View[]=[];
  dtoptions: Config={};
  dttrigger: Subject<any> = new  Subject<any>();

  constructor(
    private router: Router,
    private service: ViewService
  )
  { }
  // ngAfterViewInit(): void {
  //   this.getView();
  //   $(document).ready(()=>{
  //     $('#view').DataTable();
  //   })
  // }

  navegation(rout: string) {
    this.router.navigate([rout]);
  }

  ngOnInit() {
    this.getView();
    this.dtoptions={
      pagingType: "full_numbers",
      lengthMenu: [5,10,15,20]
    };
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

  getView(){
    this.service.getView("View").subscribe({
      next: (data: View[])=>{
        this.view = data;
        this.dttrigger.next(null);
      }
    });
  }

  deleteView(id: number){
    this.validator().then(()=>{
      this.service.Delete("View",  id).subscribe((data: any)=>{
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
