import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './../guards/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onClick() {
    localStorage.clear();
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;

      switch (this.router.url) {
        case '/login': this.login(email, password, 'admin', 'admin'); break;
        case '/login/aluno': this.login(email, password, 'student', 'cursos'); break;
        case '/login/professor': this.login(email, password, 'teacher', 'alunos'); break;
      }
    }
  }

  async login(email: string, password: string, typeUser: string, navigateTo: string) {
    let isAuthenticated = await this.authService.AuthAny(email, password, typeUser);
      if (isAuthenticated == true) {
        localStorage.setItem('typeAccount', typeUser);
        this.router.navigate([navigateTo]);
    }
  }

  // async loginAdmin(email: string, password: string) {
  //   let isAuthenticated = await this.authService.AuthAdmin(email, password);
  //     if (isAuthenticated == true) {
  //       localStorage.setItem('typeAccount', 'admin');
  //       this.router.navigate(['alunos']);
  //   }
  // }

  // async loginAluno(email: string, password: string) {
  //   let isAuthenticated = await this.authService.AuthStudent(email, password);
  //     if (isAuthenticated == true) {
  //       localStorage.setItem('typeAccount', 'student');
  //       this.router.navigate(['']);
  //   }
  // }

  // async loginProfessor(email: string, password: string) {
  //   let isAuthenticated = await this.authService.AuthTeacher(email, password);
  //     if (isAuthenticated == true) {
  //       localStorage.setItem('typeAccount', 'teacher');
  //       this.router.navigate(['alunos']);
  //   }
  // }


}
