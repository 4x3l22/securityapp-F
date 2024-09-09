import { Routes } from '@angular/router';
import { ModuleComponent } from './pages/module/module.component';
import { HomeComponent } from './pages/home/home.component';
import { FormmoduleComponent } from './pages/module/formmodule/formmodule.component';
import { ViewComponent } from './pages/view/view.component';
import { FormviewComponent } from './pages/view/formview/formview.component';
import { RoleComponent } from './pages/Role/Role.component';
import { FormrolComponent } from './pages/Role/formrol/formrol.component';
import { FormuserComponent } from './pages/user/formuser/formuser.component';
import { UserComponent } from './pages/user/user.component';
import { PersonComponent } from './pages/person/person.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ContinentComponent } from './pages/continent/continent.component';
import { FourmcontinentComponent } from './pages/continent/fourmcontinent/fourmcontinent.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Redirección por defecto a 'main'
  { path: '', redirectTo: 'main', pathMatch: 'full' },

  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard], // Ruta protegida
    children: [
      { path: 'module', component: ModuleComponent },
      { path: 'home', component: HomeComponent },
      { path: 'formmodule', component: FormmoduleComponent },
      { path: 'view', component: ViewComponent },
      { path: 'formview', component: FormviewComponent },
      { path: 'rol', component: RoleComponent },
      { path: 'formrol', component: FormrolComponent },
      { path: 'user', component: UserComponent },
      { path: 'userform', component: FormuserComponent },
      { path: 'person', component: PersonComponent },
      { path: 'continent', component: ContinentComponent },
      { path: 'fcontinent', component: FourmcontinentComponent }
    ]
  },

  // Ruta para manejar rutas no encontradas
  { path: '**', redirectTo: '/login' }
];
