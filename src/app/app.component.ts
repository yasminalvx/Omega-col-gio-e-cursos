import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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


}
