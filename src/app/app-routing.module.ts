import { ListComponent } from './admin/list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { RegisterStudentComponent } from './admin/register-student/register-student.component';
import { RegisterTeacherComponent } from './admin/register-teacher/register-teacher.component';
import { CoursesComponent } from './courses/courses.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationStudentComponent } from './courses/registration-student/registration-student.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'cursos', component: CoursesComponent},
  {path: 'cursos/matricula/:id', component: RegistrationStudentComponent},
  {path: 'login', canActivate: [LoginGuard], component: LoginComponent},
  {path: 'login/aluno', component: LoginComponent},
  {path: 'login/professor', component: LoginComponent},
  {path: 'admin', canActivate: [AuthGuard], component: AdminComponent},
  {path: 'alunos', canActivate: [AuthGuard], component: ListComponent},
  {path: 'alunos/register', canActivate: [AuthGuard], component: RegisterStudentComponent},
  {path: 'alunos/edit/:id', canActivate: [AuthGuard], component: RegisterStudentComponent},
  {path: 'professores', canActivate: [AuthGuard], component: ListComponent},
  {path: 'professores/register', canActivate: [AuthGuard], component: RegisterTeacherComponent},
  {path: 'professores/edit/:id', canActivate: [AuthGuard], component: RegisterTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
