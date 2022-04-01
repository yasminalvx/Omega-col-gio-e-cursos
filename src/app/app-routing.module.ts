import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { RegisterStudentComponent } from './admin/register-student/register-student.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', canActivate: [LoginGuard], component: LoginComponent},
  {path: 'admin', canActivate: [AuthGuard], component: AdminComponent},
  {path: 'admin/register', canActivate: [AuthGuard], component: RegisterStudentComponent},
  {path: 'admin/edit/:id', canActivate: [AuthGuard], component: RegisterStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
