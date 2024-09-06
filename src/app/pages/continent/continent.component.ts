import { Component, OnInit } from '@angular/core';
import { ContinentService } from '../../_service/continent.service';
import { IContinent } from '../../_service/interfaces/IContinent';
import { resolve } from 'node:path';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-continent',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './continent.component.html',
  styleUrl: './continent.component.css'
})
export class ContinentComponent implements OnInit{

  continents: IContinent[] = [];

  dtoptions: Config={}
  dttrigger: Subject<any> = new  Subject<any>();

  constructor(private service: ContinentService,  private router: Router) { }


  ngOnInit(){
    this.get();
    this.dtoptions={
      pagingType: "full_numbers",
      lengthMenu: [2,5,10,15,20]
    }
  }

  navigation(ruta: string){
    this.router.navigate([ruta])
  }
  // hook
  get(){
    return this.service.getContinent('Continent').subscribe({
      next: (data: IContinent[]) => {
        this.continents = data;
        this.dttrigger.next(null);
      }
    })

  }

  validator(): Promise<void>{
    return new  Promise((resolve, reject) => {
      Swal.fire({
        title: '¿Desea eliminar el continente?',
        text: 'No se podrá recuperar el continente eliminado',
        icon: 'warning',
        confirmButtonText:  'Eliminar',
      }).then((result)=>{
        if(result.isConfirmed){
          resolve()
        }
      })
    })

  }

  deleteContinent(id: any){
    this.validator().then(()=>{
    this.service.delete(id).subscribe((data: any)=>{
        if(data.status){
          Swal.fire({
            title: 'Eliminado',
            text: 'El continente ha sido eliminado',
            icon: 'success',
          });
        }
      })
    })
  }

}
