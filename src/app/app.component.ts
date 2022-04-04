import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLogin: boolean = false;

  constructor (private router: Router) {}

  ngOnInit() {
  }

  isStudent() {
    return this.router.url == '/alunos' ? 'active': '';
  }

  isTeacher() {
    return this.router.url == '/professores' ? 'active': '';
  }

  isCursos() {
    return this.router.url == '/cursos' ? 'active': '';
  }

  userAdmin() {
    return localStorage.getItem('typeAccount') == 'admin';
  }

  userTeacher() {
    return localStorage.getItem('typeAccount') == 'teacher';
  }

  onClick() {
    this.router.navigate(['login']);
  }

  onClick2() {
    this.router.navigate(['login/aluno']);
  }

  onClick3() {
    this.router.navigate(['login/professor']);
  }

  onLogout(){
    localStorage.clear();
    alert('Você foi desconectado');
  }

  changeLogin(){
    this.isLogin = !this.isLogin;
  }

}
