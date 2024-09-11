import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../../_service/interfaces/IMenu';
import { MenuDto } from '../../_service/interfaces/MenuDto';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // Array para almacenar los módulos y sus vistas
  modules: { moduleName: string, views: { viewName: string, route: string }[] }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      try {
        const parsedData: IMenu = JSON.parse(storedData);
        if (parsedData.success && parsedData.menuDto) {
          this.modules = this.groupByModule(parsedData.menuDto);
          console.log('Menú cargado:', this.modules);
        } else {
          console.warn('El formato del menú en localStorage no es válido');
        }
      } catch (error) {
        console.error('Error al parsear el menú desde localStorage', error);
      }
    } else {
      console.warn('No hay datos de menú en localStorage');
    }
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  // Agrupar las vistas por módulo
  groupByModule(menuDto: MenuDto[]): { moduleName: string, views: { viewName: string, route: string }[] }[] {
    const grouped = menuDto.reduce((acc, view) => {
      if (!acc[view.moduleId]) {
        acc[view.moduleId] = { moduleName: view.moduleName, views: [] };
      }
      // Crear ruta en formato 'main/nombreDeLaVista'
      const route = `main/${view.viewName.toLowerCase()}`;
      console.log("rutas "+route);
      if(!this.isString(route)){
        console.error(`Ruta no válida: ${route}`);
        return acc;
      }
      acc[view.moduleId].views.push({ viewName: view.viewName, route });
      return acc;
    }, {} as { [moduleId: number]: { moduleName: string, views: { viewName: string, route: string }[] } });

    // Convertir el objeto agrupado en un array
    return Object.values(grouped);
  }

  navegation(route: string): void {
    this.router.navigate([route]);
  }

  logOut(): void {
    localStorage.removeItem('user');
  }
}
