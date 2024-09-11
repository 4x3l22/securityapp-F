import { Component, OnInit } from '@angular/core';
import { IRolView } from "../../_service/interfaces/IRolView";
import { Config } from "datatables.net";
import { Subject, forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { RolviewService } from "../../_service/rolview.service";
import { ViewService } from "../../_service/view.service";
import { DataTablesModule } from "angular-datatables";
import { View } from "../../_service/interfaces/view";
import { DataRolService } from '../../_service/data-rol.service';

@Component({
  selector: 'app-rolview',
  standalone: true,
  templateUrl: './rolview.component.html',
  imports: [
    DataTablesModule
  ],
  styleUrls: ['./rolview.component.css']
})
export class RolviewComponent implements OnInit {

  id: number | null=null;

  constructor(private datarole: DataRolService){}

  ngOnInit(): void {
    this.id = this.datarole.getData('id');
    this.consola();
  }

  consola(){
    console.log('el id es: '+this.id);

  }

}
